import { Button } from '@material-ui/core';
import clsx from 'clsx';
import { useWallet } from '../../lib/NearWalletProvider';
import useStyles from './connectButton-style';

function ConnectButton(props) {
    const classes = useStyles();

    return (
      <div className={clsx(classes.container, props.top ? classes.top : '')} style={{ zIndex: 1 }}>
        <UnstyledConnectButton variant="outlined" className={classes.button} />
      </div>
    );
}

export default ConnectButton;

export function UnstyledConnectButton(props) {
    const {
        isConnected, details, signIn, signOut
    } = useWallet();

    const buttonLabel = isConnected
        ? 'Sign Out'
        : ' Connect NEAR Wallet';

    const buttonAction = isConnected ? signOut : signIn;

    return (
      <Button {...props} variant="outlined" style={{ margin: '0.5rem' }} onClick={buttonAction}>
        {buttonLabel}
      </Button>
    );
}
