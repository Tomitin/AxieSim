import { Box, Typography } from '@material-ui/core';
import React, { ReactNode } from 'react';
import './loginLayout.css';

interface LoginProps {
    name: string;
    children: ReactNode;
}

const LoginLayout: React.FunctionComponent<LoginProps> = (props: LoginProps): JSX.Element => {

    return (
        <div className='login-layout'>
            <Box padding='16px' boxShadow={5} minHeight='400px' width='320px'>
                <Box display='flex' justifyContent='center' marginBottom='16px'>
                    <Typography variant='h4' component='h1'>{props.name}</Typography>
                </Box>
                <Box width='80%' margin='auto'>
                    {props.children}
                </Box>
            </Box>
        </div>
    );
}

export default LoginLayout;