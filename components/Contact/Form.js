import React, { useState } from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useTranslation } from 'next-i18next';
import { useText } from '~/theme/common';
import useStyles from './contact-style';

function Form() {
  const classes = useStyles();
  const text = useText();
  const { t } = useTranslation('common');
  const [values, setValues] = useState({
    email: '',
    message: ''
  });

  const [openNotif, setNotif] = useState(false);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = () => {
    // TODO: sign up for mailing list
    setNotif(true);
  };

  const handleClose = () => {
    setNotif(false);
  };

  return (
    <div className={classes.formWrap}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        key="top right"
        open={openNotif}
        autoHideDuration={4000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Message Sent</span>}
      />
      <Paper className={classes.formBox}>
        <Grid container spacing={6}>
          <Grid item lg={5} xs={12}>
            <Typography className={clsx(classes.title, text.title)} variant="h3">
              Be in the&nbsp;
              <span>Know</span>
            </Typography>
          </Grid>
          <Grid item lg={7} xs={12}>
            <div className={classes.form}>
              <ValidatorForm
                onSubmit={handleSubmit}
                onError={errors => console.log(errors)}
              >
                <TextValidator
                  className={classes.input}
                  label={t('footer.form_email')}
                  onChange={handleChange('email')}
                  name="Email"
                  value={values.email}
                  validators={['required', 'isEmail']}
                  errorMessages={['this field is required', 'email is not valid']}
                />
                <div className={classes.btnArea}>
                  <Button variant="contained" type="submit" color="primary" size="large">
                    {t('footer.form_send')}
                  </Button>
                </div>
              </ValidatorForm>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Form;
