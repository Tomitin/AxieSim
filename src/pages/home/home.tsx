import React from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './home.css';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

const Home: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const history = useHistory();

    const handleBreedingTreeClick = () => {
        history.push('/breeding-tree');
    };

    const handleScholarshipTrackerClick = () => {
        history.push('/scholars-tracker');
    };
    return (
        <div className="home">
            <Box position="relative" height="100vh" flexDirection="column" display="flex">
                <Box flex="1" display="flex" justifyContent="center" alignItems="center">
                    <Box maxWidth="50%">
                        <Typography align="center" variant="h2">
                            {t('pages.homepage.title')}
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex" bottom="0" width="100%" position="absolute">
                    <Button href="#home_section" endIcon={<ArrowDropDownIcon />} fullWidth={true}>
                        <Typography variant="h6">{t('pages.homepage.seeTools')}</Typography>
                    </Button>
                </Box>
            </Box>
            <Box id="home_section" width="100%" marginY="40px">
                <Box marginBottom="32px">
                    <Grid container>
                        <Grid item xs={12} lg={6}>
                            <Box display="flex" justifyContent="center">
                                <img src={process.env.PUBLIC_URL + '/green_axie.png'} alt="green axie" width="480px" />
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Box width="60%" mx="auto">
                                <Box paddingBottom="16px">
                                    <Typography align="center" color="primary" variant="h4">
                                        {t('pages.homepage.earningsSimulator.title')}
                                    </Typography>
                                </Box>
                                <Box paddingBottom="16px" paddingLeft="8px">
                                    <Typography variant="h6">
                                        {t('pages.homepage.earningsSimulator.analizeStrategies')}
                                    </Typography>
                                </Box>
                                <Box paddingBottom="16px" paddingLeft="8px">
                                    <Typography variant="h6">
                                        {t('pages.homepage.earningsSimulator.trackEarnings')}
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="center">
                                    <Button variant="contained" color="primary" onClick={handleBreedingTreeClick}>
                                        {t('pages.homepage.earningsSimulator.startHereButton')}
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Grid container>
                    <Grid item xs={12} lg={6}>
                        <Box width="60%" mx="auto">
                            <Box paddingBottom="16px">
                                <Typography align="center" color="primary" variant="h4">
                                    {t('pages.homepage.scholarshipTracker.title')}
                                </Typography>
                            </Box>
                            <Box paddingBottom="16px" paddingLeft="8px">
                                <Typography variant="h6">
                                    {t('pages.homepage.scholarshipTracker.trackScholars')}
                                </Typography>
                            </Box>
                            <Box paddingBottom="16px" paddingLeft="8px">
                                <Typography variant="h6">
                                    {t('pages.homepage.scholarshipTracker.checkTracker')}
                                </Typography>
                            </Box>
                            <Box display="flex" justifyContent="center">
                                <Button variant="contained" color="primary" onClick={handleScholarshipTrackerClick}>
                                    {t('pages.homepage.scholarshipTracker.checkButton')}
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Box display="flex" justifyContent="center">
                            <img
                                src={process.env.PUBLIC_URL + '/alien_axie.png'}
                                alt="alien axie"
                                width="340px"
                                height="240px"
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Home;
