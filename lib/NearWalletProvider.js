import { WalletConnection, connect, keyStores } from 'near-api-js';
import { useRouter } from 'next/router';
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

export const TESTNET_CONFIG = {
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    explorerUrl: 'https://explorer.testnet.near.org',
    headers: {
        'Content-Type': 'application/json',
    },
};

export const MAINNET_CONFIG = {
    networkId: 'mainnet',
    nodeUrl: 'https://rpc.mainnet.near.org',
    walletUrl: 'https://wallet.mainnet.near.org',
    helperUrl: 'https://helper.mainnet.near.org',
    explorerUrl: 'https://explorer.mainnet.near.org',
    headers: {
        'Content-Type': 'application/json',
    },
};

export const WalletContext = createContext({
    wallet: undefined,
    details: {
        accountId: '',
        balance: '',
        contractName: '',
    },
    isConnected: false,
    loading: true,
    signIn: () => Promise.resolve(),
    signOut: () => Promise.resolve(),
});

export function NearWalletProvider({ network = 'testnet', contractAddress, children }) {
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const [walletInfo, setWallet] = useState();
    const [connected, setConnected] = useState(false);

    const [details, setDetails] = useState({
        accountId: '',
        balance: '',
        contractName: contractAddress || '',
    });

    const init = useCallback(async () => {
        const near = await connect(
            network === 'mainnet'
                ? {
                    ...MAINNET_CONFIG,
                    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
                }
                : {
                    ...TESTNET_CONFIG,
                    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
                },
        );

        const wallet = new WalletConnection(
            near,
            `${process.env.NEXT_PUBLIC_USER_ID}-${network}`,
        );

        setWallet(wallet);

        const isConnected = wallet.isSignedIn();

        setConnected(isConnected);

        if (isConnected) {
            const account = wallet.account();

            const accountBalance = await account.getAccountBalance();

            setDetails({
                accountId: account.accountId,
                balance: accountBalance.available,
                contractName: contractAddress || '',
            });
        }

        setLoading(false);
    }, [contractAddress, network]);

    const signIn = useCallback(async () => {
        if (!walletInfo) {
            return;
        }

        walletInfo.requestSignIn({ contractId: contractAddress });
    }, [contractAddress, walletInfo]);

    const signOut = useCallback(async () => {
        if (!walletInfo) {
            return;
        }

        walletInfo.signOut();

        await router.replace('/', undefined, { shallow: true });

        window.location.reload();
    }, [router, walletInfo]);

    useEffect(() => {
        init();
    }, [init]);

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
        <WalletContext.Provider
            value={walletContextData}
        >
            {children}
        </WalletContext.Provider>
    );
}

export const useWallet = () => useContext(WalletContext);


export function nearNumToHuman(listed) {
    return (parseInt(
      (BigInt(listed ?? 0) / BigInt(100000000000000000000000))
        .toString()
    ) / 10
    )
      .toString();
  }