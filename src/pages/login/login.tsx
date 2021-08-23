import { 
    Box, 
    Button, 
    Checkbox, 
    FormControl, 
    FormControlLabel, 
    FormGroup, 
    Input, 
    InputLabel, 
    Link 
} from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import LoginLayout from '../../layouts/loginLayout/loginLayout';
import './login.css';

const Login: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const [state, setState] = React.useState({
        rememberMeCheckbox: false,
    });

    const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleForgotPasswordClick = () => {
        history.push('/forgot-password')
    }

    const handleRegisterClick = () => {
        history.push('/register')
    }

    return (
        <LoginLayout name={t('pages.login.title')}>
            <form>
                <Box paddingBottom='16px'>
                    <FormControl required={true} fullWidth={true}>
                        <InputLabel htmlFor='email-input'>
                            {t('pages.login.email')}
                        </InputLabel>
                        <Input id='email-input'/>
                    </FormControl>
                </Box>
                <Box paddingBottom='16px'>
                    <FormControl required={true} fullWidth={true}>
                        <InputLabel htmlFor='password-input'>
                            {t('pages.login.password')}
                        </InputLabel>
                        <Input id='password-input'/>
                    </FormControl>
                </Box>
                <Box paddingBottom='40px'>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    checked={state.rememberMeCheckbox} 
                                    onChange={handleRememberMeChange} 
                                    name="rememberMeCheckbox" 
                                />
                            }
                            label={t('pages.login.rememberMe')}
                        />
                    </FormGroup>
                </Box>
                <Box paddingBottom='16px' display='flex' justifyContent='center'>
                    <Button color='primary' variant='contained'>
                        <ArrowForward/>
                    </Button>
                </Box>
            </form>
            <Box marginTop='8px' display='flex' justifyContent='space-between'>
                <Link className='register-link' onClick={handleRegisterClick}>
                    {t('pages.login.register')}
                </Link>
                <Link className='forgot-password-link' onClick={handleForgotPasswordClick}>
                    {t('pages.login.forgotPassword')}
                </Link>
            </Box>
        </LoginLayout>
    );
}

export default Login;