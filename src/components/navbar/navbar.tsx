import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const Navbar: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const history = useHistory();

    const handleHomeClick = () => {
        history.push('/');
    };

    // const handleToolsClick = () => {
    //     history.push('/earnings-simulator');
    // };

    // const handleTrackersClick = () => {
    //     history.push('/scholars-tracker');
    // };

    // const handleLoginClick = () => {
    //     history.push('/login');
    // };

    return (
        <div>
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    <Button color="inherit" onClick={handleHomeClick}>
                        <Typography variant="h5">{t('components.navbar.companyName')}</Typography>
                    </Button>
                    {/* <Box ml='auto'>
                        <Button color="inherit" onClick={handleToolsClick}>
                                {t('components.navbar.tools')}
                        </Button>
                        <Button color="inherit" onClick={handleTrackersClick}>
                            {t('components.navbar.trackers')}
                        </Button>
                        <Button color="inherit" onClick={handleLoginClick}>
                                {t('components.navbar.login')}
                        </Button>
                    </Box> */}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;
