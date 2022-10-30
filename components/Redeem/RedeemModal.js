import React, { useState, useEffect, useCallback } from 'react';
import { CircularProgress, IconButton, Button } from '@material-ui/core';
import { useRouter } from 'next/router'
import Modal from 'react-modal';
import { useWallet } from '../../lib/NearWalletProvider';
import { sha256 } from "js-sha256";
import { utils, keyStores } from "near-api-js";

function RedeemModal(props) {
    const router = useRouter();

    // Redeem Modal
    const [redeemModalIsOpen, setRedeemModalIsOpen] = useState(false);

    async function openRedeemModal() {
        setRedeemModalIsOpen(true);

        // TODO: query for the redemption status
    }

    return (
        <Modal {...props} style={{
            overlay: {
                backgroundColor: "rgba(30, 30, 30, 0.75)"
            },
            content: {
                background: "#303030",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "auto",
                marginBottom: "auto",
                width: "fit-content",
                height: "fit-content"
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

    const c = `ion-md-eye${isRevealed ? "-off" : ""}`;

    async function onClickReveal() {
        // If it isn't revealed, you'll have to set it to be revealed.
        if(!isRevealed) {
            if(code == null) {
                setIsRequesting(true);

                // 1. Request for nonce & nonce id
                const accountId = wallet.details.accountId;
                const { id: nonceId, nonce } = await (await fetch(`${process.env.BACKEND_URL}/redemption/getNonce/${accountId}`)).json();
                console.log("NONCE", nonceId, nonce);

                // 2. Sign nonce
                const sameMsgObj = new Uint8Array(sha256.array(nonce));
                const keyStore = new keyStores.BrowserLocalStorageKeyStore();
                const keyPair = await keyStore.getKey(process.env.NEAR_NETWORK, accountId);
                const signed = keyPair.sign(sameMsgObj);
            
                // 3. Redemption request
                let reedemData;
                try {
                    const redeemRes = await fetch(`${process.env.BACKEND_URL}/redemption/redeemMirror`, {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          id: nonceId,
                          nftID: props.token_id,
                          accountId,
                          password: signed
                        })
                      });
                    reedemData = await redeemRes.json();
                }
                catch (e) {
                    console.log("ERROR!", e);
                    setIsRequesting(false);
                    setIsRevealed(false);
                    return;
                }

                // 4. Set data
                setCode(reedemData.redemptionCode);
                setCheckoutLink(reedemData.checkoutLink);
                setIsRequesting(false);
                setIsRevealed(true);
            }
        }

        setIsRevealed(!isRevealed);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', minWidth: '500px' }}>
            <span style={{ marginTop: "16px" }}>{props.token_id}</span>
            <span style={{ marginTop: "16px", minWidth: '110px' }}>
                {props.redemptionStatus || code != null ? 'Code Generated' : 'Not Redeemed'}
            </span>
            <IconButton onClick={onClickReveal} disabled={isRequesting}>
                {isRequesting ? <CircularProgress size='26px' /> : <i className={c} />}
            </IconButton>
            <span style={{ marginTop: "16px", minWidth: '170px' }}>
                {!isRequesting && isRevealed ? code : "XXX-XXXXXXXX-XXXX-XX"}
            </span>
            <Button component="a" href={checkoutLink} disabled={checkoutLink == null || checkoutLink == ""} target="_blank">
                Checkout
            </Button>
        </div>
    );
}

export default RedeemModal;
