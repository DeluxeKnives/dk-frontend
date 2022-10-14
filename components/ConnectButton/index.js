import { useWallet } from '../../lib/NearWalletProvider';
import { Button } from '@material-ui/core';
import useStyles from './connectButton-style';
import clsx from 'clsx';

function ConnectButton(props) {
    const classes = useStyles();
    const {
        isConnected, details, signIn, signOut,
    } = useWallet();

    const buttonLabel = isConnected
        ? `Sign Out`
        : ' Connect NEAR Wallet';

    // disabled
    const buttonAction = isConnected ? signOut : signIn;

    return (
        <div className={clsx(classes.container, props.top ? classes.top : '')} style={{ zIndex: 1 }}>
            <Button variant='outlined' onClick={buttonAction} className={classes.button}>
                {buttonLabel}
            </Button>
        </div>
    );
}

export default ConnectButton;