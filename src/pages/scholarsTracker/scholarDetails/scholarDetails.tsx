import { Box, Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { COIN } from '../../../constants/constants';
import ClipboardTextComponent from '../../../components/clipboardText/clipboardText';
import PieChartComponent from '../../../components/pieChart/pieChart';
import ScholarsTrackerLayout from '../../../layouts/scholarsTrackerLayout/scholarsTrackerLayout';
import './scholarDetails.css';

interface Data {
    date: string;
    scholarEarned: number;
    managerEarned: number;
}

const data: Data[] = [];

for (let i = 0; i < 12; i++) {
    data.push({
        date: '1/' + (i + 1) + '/2021',
        scholarEarned: 200 * ((i + 1) * 0.75),
        managerEarned: 800 * ((i + 1) * 0.75),
    });
}

const ScholarDetails: React.FunctionComponent = () => {
    const { t } = useTranslation();

    const piechartData = [
        { name: t('pages.scholarsTracker.scholarDetails.manager'), value: 44298 },
        { name: t('pages.scholarsTracker.scholarDetails.scholar'), value: 14766 },
    ];
    return (
        <div className="scholar-details">
            <ScholarsTrackerLayout title="Ruben">
                <Box className="row-container">
                    <Grid container>
                        <Grid item lg={4} xs={12}>
                            <Box boxShadow={2} className="box-container">
                                <Box className="coin-logo-container">
                                    <img
                                        className="coin-logo"
                                        src={process.env.PUBLIC_URL + '/SLP.png'}
                                        alt="smooth love potion"
                                    />
                                    <Typography align="center" variant="h5">
                                        {t('pages.scholarsTracker.scholarDetails.totalRevenue')}
                                    </Typography>
                                </Box>
                                <PieChartComponent containerHeight="250px" pieChartRadius={75} data={piechartData} />
                            </Box>
                        </Grid>
                        <Grid item lg={4} xs={12}>
                            <Box boxShadow={2} className="box-container scholar-stats-container">
                                <Box>
                                    <Typography>
                                        <strong>{t('pages.scholarsTracker.scholarDetails.arenaRank')}</strong> #108
                                    </Typography>
                                    <Typography>
                                        <strong>{t('pages.scholarsTracker.scholarDetails.slpPerDay')}</strong> 478
                                    </Typography>
                                    <Box display="flex">
                                        <Typography>
                                            <strong>{t('pages.scholarsTracker.scholarDetails.holdings')}</strong> 674
                                        </Typography>
                                        <img
                                            width="25px"
                                            src={process.env.PUBLIC_URL + '/SLP.png'}
                                            alt="smooth love potion"
                                        />
                                    </Box>
                                    <Typography>
                                        <strong>{t('pages.scholarsTracker.scholarDetails.slpClaimed')}</strong> 39,572
                                    </Typography>
                                    <Typography>
                                        <strong>{t('pages.scholarsTracker.scholarDetails.nextClaim')}</strong> 9/7/2021
                                    </Typography>
                                    <Typography>
                                        <strong>{t('pages.scholarsTracker.scholarDetails.lastClaim')}</strong> 9/6/2021
                                    </Typography>
                                    <Box className="ronin-account-container">
                                        <strong>{t('pages.scholarsTracker.scholarDetails.scholarAccount')}</strong>{' '}
                                        <Box display="inline-block">
                                            <ClipboardTextComponent textToCopy="ronin:c5f700ca10dd77b51669513cdca53a21cbac3bcd" />
                                        </Box>
                                    </Box>
                                    <Box className="ronin-account-container">
                                        <strong>{t('pages.scholarsTracker.scholarDetails.paymentAccount')}</strong>{' '}
                                        <Box display="inline-block">
                                            <ClipboardTextComponent textToCopy="ronin:c5f700ca10dd77b51669513cdca53a21cbac3bcd" />
                                        </Box>
                                    </Box>
                                </Box>
                                <Button
                                    href="https://marketplace.axieinfinity.com/profile/ronin:c5f700ca10dd77b51669513cdca53a21cbac3bcd/axie"
                                    variant="outlined"
                                    color="primary"
                                    target="_blank"
                                    fullWidth={true}
                                >
                                    {t('pages.scholarsTracker.scholarDetails.profile')}
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item lg={4} xs={12}>
                            <Box boxShadow={2} className="box-container">
                                <Box className="claim-date-container">
                                    <Typography align="center" variant="h5">
                                        {t('pages.scholarsTracker.scholarDetails.nextClaim')}
                                    </Typography>
                                    <Box className="claim-date">
                                        <Typography align="center" variant="h1" component="h6">
                                            13
                                        </Typography>
                                    </Box>
                                    <Typography align="center" variant="h5">
                                        {t('pages.scholarsTracker.scholarDetails.days')}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box className="row-container">
                    <Grid container>
                        <Grid item xs={12} lg={12}>
                            <Box boxShadow={2} className="box-container">
                                <Box>
                                    <Typography variant="h5" align="center">
                                        {t('pages.scholarsTracker.scholarDetails.revenueOverTime')}
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="center">
                                    <BarChart width={840} height={250} data={data}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                            name={t('pages.scholarsTracker.scholarsHomepage.scholarRevenue', {
                                                coin: COIN.USD_DOLLAR,
                                            })}
                                            dataKey="scholarEarned"
                                            fill="#8884d8"
                                        />
                                        <Bar
                                            name={t('pages.scholarsTracker.scholarsHomepage.managerRevenue', {
                                                coin: COIN.USD_DOLLAR,
                                            })}
                                            dataKey="managerEarned"
                                            fill="#82ca9d"
                                        />
                                    </BarChart>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Typography variant="h2" align="center">
                    {t('pages.scholarsTracker.scholarDetails.inventory')}
                </Typography>
                <Box className="row-container">
                    <Grid container>
                        <Grid item xs={12} lg={4}>
                            <Box boxShadow={2} className="box-container">
                                <Box className="inventory-item-image-container">
                                    <img
                                        src={process.env.PUBLIC_URL + '/green_axie.png'}
                                        alt="green axie"
                                        width="240px"
                                    />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Box boxShadow={2} className="box-container">
                                <Box className="inventory-item-image-container">
                                    <img
                                        src={process.env.PUBLIC_URL + '/green_axie.png'}
                                        alt="green axie"
                                        width="240px"
                                    />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Box boxShadow={2} className="box-container">
                                <Box className="inventory-item-image-container">
                                    <img
                                        src={process.env.PUBLIC_URL + '/green_axie.png'}
                                        alt="green axie"
                                        width="240px"
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </ScholarsTrackerLayout>
        </div>
    );
};

export default ScholarDetails;
