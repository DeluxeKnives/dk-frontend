/*
  NEAR Wallet Provider
  https://github.com/Mintbase/examples/blob/main/simple-marketplace/services/providers/WalletProvider.tsx
*/

import { Network, Wallet } from 'mintbase';
import {
    createContext,
    useEffect,
    useState,
    useContext,
    useCallback,
    useMemo,
} from 'react';
import { useRouter } from 'next/router';

export const WalletContext = createContext();

export function NearWalletProvider({
    network = Network.testnet,
    chain,
    apiKey,
    children,
}) {
    const [walletInfo, setWallet] = useState();

    const [details, setDetails] = useState({
        accountId: '',
        balance: '',
        allowance: '',
        contractName: '',
    });

    const router = useRouter();

    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(true);

    const initWallet = useCallback(async () => {
        const accountId = router.query.account_id;
        const nearKeystore = `near-api-js:keystore:${accountId}:${network}`;

        if (
            accountId
            && localStorage.getItem(nearKeystore)
            && localStorage.getItem(process.env.NEXT_PUBLIC_DEVELOPER_KEY)
        ) {
            localStorage.removeItem(process.env.NEXT_PUBLIC_DEVELOPER_KEY);
            localStorage.removeItem(nearKeystore);
        }

        const { data: walletData, error } = await new Wallet().init({
            networkName: network ?? Network.testnet,
            chain,
            apiKey,
        });

        if (error) {
            console.error(error);
            return;
        }

        const { wallet, isConnected } = walletData;

        setWallet(wallet);

        if (isConnected) {
            try {
                const { data: detailsData } = await wallet.details();
                setDetails(detailsData);
                setConnected(true);
            } catch (err) {
                console.error(err);
            }
        }
        setLoading(false);
    }, [apiKey, chain, network, router.query.account_id]);

    const signIn = useCallback(async () => {
        console.log("SIGN IN");
        if (!walletInfo) {
            return;
        }
        await walletInfo.connect({ requestSignIn: true });
    }, [walletInfo]);

    const signOut = useCallback(async () => {
        console.log("SIGN OUT");
        if (!walletInfo) {
            return;
        }
        walletInfo.disconnect();

        await router.replace('/', undefined, { shallow: true });

        window.location.reload();
    }, [router, walletInfo]);

    useEffect(() => {
        initWallet();
    }, [initWallet, network]);

    const walletContextData = useMemo(() => {
        const obj = {
            wallet: walletInfo,
            details,
            isConnected: connected,
            signIn,
            signOut,
            loading,
        };

        return obj;
    }, [connected, details, loading, signIn, signOut, walletInfo]);

    return (
        <WalletContext.Provider value={walletContextData}>
            {children}
        </WalletContext.Provider>
    );
}

export const useWallet = () => useContext(WalletContext);