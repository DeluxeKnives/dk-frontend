import React, { useState, useEffect, useCallback } from 'react';
import { CircularProgress, IconButton, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import { sha256 } from 'js-sha256';
import { utils, keyStores } from 'near-api-js';
import { useWallet } from '../../lib/NearWalletProvider';

function RedeemModal(props) {
  const router = useRouter();

  // Redeem Modal
  const [redeemModalIsOpen, setRedeemModalIsOpen] = useState(false);

  async function openRedeemModal() {
    setRedeemModalIsOpen(true);

    // TODO: query for the redemption status
  }

    return (
      <Modal
        {...props}
        shouldCloseOnOverlayClick={false}
        style={{
                overlay: {
                    backgroundColor: 'rgba(30, 30, 30, 0.75)'
                },
                content: {
                    background: '#303030',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    width: 'fit-content',
                    height: 'fit-content',
                    borderRadius: '20px',
                    border: 'none',
                    boxShadow: '0px 1px 10px 3px #ef5923, 0px 1px 1px 0px #ef5923, 0px 2px 1px -1px #ef5923',
                    maxHeight: '500px'
                }
            }}
      />
    );
}

export function RedemptionLine(props) {
  const wallet = useWallet();

  const [isRevealed, setIsRevealed] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [code, setCode] = useState(null);
  const [checkoutLink, setCheckoutLink] = useState(null);

  const c = `ion-md-eye${isRevealed ? '-off' : ''}`;

  async function queryForData(queryParty) {
      // 0. Set is requesting to true
      setIsRequesting(queryParty);

      // 1. Request for nonce & nonce id
      const { accountId } = wallet.details;
      const { id: nonceId, nonce } = await (await fetch(`${process.env.BACKEND_URL}/redemption/getNonce/${accountId}`)).json();
      console.log('NONCE', nonceId, nonce);

      // 2. Sign nonce
      const sameMsgObj = new Uint8Array(sha256.array(nonce));
      const keyStore = new keyStores.BrowserLocalStorageKeyStore();
      const keyPair = await keyStore.getKey(process.env.NEAR_NETWORK, accountId);
      const signed = keyPair.sign(sameMsgObj);

      // 3. Redemption request
      let reedemData;
      try {
          const redeemRes = await fetch(`${process.env.BACKEND_URL}/redemption/redeemMirror`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  id: nonceId,
                  nftID: props.token_id,
                  accountId,
                  password: signed
              })
          });
          reedemData = await redeemRes.json();
      } catch (e) {
          console.log('ERROR!', e);
          setIsRequesting(false);
          return false;
      }

      // 4. Set data
      setCode(reedemData.redemptionCode);
      setCheckoutLink(reedemData.checkoutLink);
      setIsRequesting(false);
      return reedemData;
  }

  async function onClickGenerate() {
    if (code == null) if (await queryForData('generate')) setIsRevealed(true);
  }

  async function onClickReveal() {
    if (code) setIsRevealed(!isRevealed);
    else if (await queryForData('reveal')) setIsRevealed(!isRevealed);
  }

  async function onClickCheckout() {
    // If the checkout link exists, then we already queried for the code
    if (checkoutLink) window.open(checkoutLink, '_blank');

    // Otherwise we have to query first first
    else {
      const res = await queryForData('checkout');
      if (res != null && res.checkoutLink != null) window.open(res.checkoutLink, '_blank');
    }
  }

  const divFlexbox = {
    display: 'flex', justifyContent: 'space-around', minWidth: '50vmin', marginBottom: '8px'
  };
  const trueRedemptionStatus = props.redemptionStatus || code != null;

  return (
    <div style={{ marginTop: '3rem' }}>
      <div style={divFlexbox}>
        <span style={{ marginTop: '16px' }}>
          NFT #
          {props.token_id}
        </span>
        <span style={{ marginTop: '16px', minWidth: '170px' }}>
          {!isRequesting && isRevealed ? code : 'XXX-XXXXXXXX-XXXX-XX'}
        </span>
        <IconButton onClick={onClickReveal} disabled={isRequesting || !trueRedemptionStatus}>
          {isRequesting == 'reveal' ? <CircularProgress size="26px" /> : <i className={c} />}
        </IconButton>
      </div>
      <div style={divFlexbox}>
        {!trueRedemptionStatus
          && (
            <Button variant="outlined" onClick={onClickGenerate}>
              {isRequesting == 'generate' ? <CircularProgress size="26px" /> : 'Generate'}
            </Button>
          )}
        <Button variant="outlined" disabled={!trueRedemptionStatus || isRequesting} onClick={onClickCheckout}>
          {isRequesting == 'checkout' ? <CircularProgress size="26px" /> : 'Checkout'}
        </Button>
      </div>
    </div>
  );
}

export default RedeemModal;
