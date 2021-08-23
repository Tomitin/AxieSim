import { Box, Button, FormControl, Input, InputLabel, Link } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import LoginLayout from '../../layouts/loginLayout/loginLayout';

const Register: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const history = useHistory();

    const handleForgotPasswordClick = () => {
        history.push('/forgot-password')
    }

    const handleSignInClick = () => {
        history.push('/login')
    }

    return (
        <LoginLayout name={t('pages.register.title')}>
            <form>
                <Box paddingBottom='16px'>
                    <FormControl required={true} fullWidth={true}>
                        <InputLabel htmlFor='email-input'>
                            {t('pages.register.email')}
                        </InputLabel>
                        <Input id='email-input'/>
                    </FormControl>
                </Box>
                <Box paddingBottom='16px'>
                    <FormControl required={true} fullWidth={true}>
                        <InputLabel htmlFor='password-input'>
                            {t('pages.register.password')}
                        </InputLabel>
                        <Input id='password-input'/>
                    </FormControl>
                </Box>
                <Box paddingBottom='40px'>
                    <FormControl required={true} fullWidth={true}>
                        <InputLabel htmlFor='password-input'>
                            {t('pages.register.confirmPassword')}
                        </InputLabel>
                        <Input id='password-input'/>
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
                    {t('pages.register.signIn')}
                </Link>
                <Link className='forgot-password-link' onClick={handleForgotPasswordClick}>
                    {t('pages.register.forgotPassword')}
                </Link>
            </Box>
        </LoginLayout>
    );
}

export default Register;