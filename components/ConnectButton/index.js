import { useWallet } from '../../lib/NearWalletProvider';
import { Button } from '@material-ui/core';
import useStyles from './connectButton-style';
import clsx from 'clsx';

function ConnectButton(props) {
    const classes = useStyles();

    return (
        <div className={clsx(classes.container, props.top ? classes.top : '')} style={{ zIndex: 1 }}>
            <UnstyledConnectButton variant='outlined' className={classes.button} />
        </div>
    );
}

export default ConnectButton;

export function UnstyledConnectButton(props) {

    const {
        isConnected, details, signIn, signOut
    } = useWallet();

    const buttonLabel = isConnected
        ? `Sign Out`
        : ' Connect NEAR Wallet';

    const buttonAction = isConnected ? signOut : signIn;

    return (
        <Button {...props} onClick={buttonAction}>
            {buttonLabel}
        </Button>
    );
}