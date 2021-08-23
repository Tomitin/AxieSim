import { Box, Button, FormControl, Input, InputLabel, Link } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import LoginLayout from '../../layouts/loginLayout/loginLayout';

const ForgotPassword: React.FunctionComponent = (): JSX.Element => {
    const { t } = useTranslation();
    const history = useHistory();
    
    const handleSignInClick = () => {
        history.push('/login')
    }
    const handleRegisterClick = () => {
        history.push('/register')
    }

    return (
        <LoginLayout name={t('pages.forgotPassword.title')}>
            <form>
                <Box paddingBottom='40px'>
                    <FormControl required={true} fullWidth={true}>
                        <InputLabel htmlFor='email-input'>
                            {t('pages.forgotPassword.email')}
                        </InputLabel>
                        <Input id='email-input'/>
                    </FormControl>
                </Box>
                <Box paddingBottom='16px' display='flex' justifyContent='center'>
                    <Button color='primary' variant='contained'>
                        <ArrowForward/>
                    </Button>
                </Box>
            </form>
            <Box marginTop='8px' display='flex' justifyContent='space-between'>
                <Link className='register-link' onClick={handleSignInClick}>
                    {t('pages.forgotPassword.signIn')}
                </Link>
                <Link className='forgot-password-link' onClick={handleRegisterClick}>
                    {t('pages.forgotPassword.register')}
                </Link>
            </Box>
        </LoginLayout>
    );
}

export default ForgotPassword;