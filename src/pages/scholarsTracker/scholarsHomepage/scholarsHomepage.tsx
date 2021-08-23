import { Box, Divider, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { COIN } from '../../../constants/constants';
import PieChartComponent from '../../../components/pieChart/pieChart';
import ScholarsTrackerLayout from '../../../layouts/scholarsTrackerLayout/scholarsTrackerLayout';
import './scholarsHomepage.css';

interface Data {
    date: string;
    scholarEarned: number;
    managerEarned: number;
}

const data: Data[] = [];

for (let i = 0; i < 12; i++) {
    data.push({
        date: '1/' + (i + 1) + '/2021',
        scholarEarned: 9000 * ((i + 1) * 0.75),
        managerEarned: 13500 * ((i + 1) * 0.75),
    });
}

const ScholarsHomepage: React.FunctionComponent = () => {
    const { t } = useTranslation();

    const piechartData = [
        { name: t('pages.scholarsTracker.scholarsHomepage.manager'), value: 735000 },
        { name: t('pages.scholarsTracker.scholarsHomepage.scholar'), value: 485215 },
    ];
    return (
        <ScholarsTrackerLayout title={t('pages.scholarsTracker.scholarsHomepage.title')}>
            <Box className="row-container">
                <Grid container>
                    <Grid item xs={12} lg={4}>
                        <Box boxShadow={2} className="box-container">
                            <Typography align="center" variant="h5">
                                {t('pages.scholarsTracker.scholarsHomepage.totalRevenue')}
                            </Typography>
                            <Divider />
                            <PieChartComponent containerHeight="250px" pieChartRadius={75} data={piechartData} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Box boxShadow={2} className="box-container">
                            <Box className="revenue-box-container">
                                <Typography align="center" variant="h5">
                                    {t('pages.scholarsTracker.scholarsHomepage.revenueMade')}
                                </Typography>
                                <Divider />
                                <Box className="revenue-content-container">
                                    <Box className="total-revenue-container">
                                        <Box className="total-revenue">
                                            <Typography align="center" variant="h2" component="h6">
                                                $3,530
                                            </Typography>
                                        </Box>
                                        <Typography variant="h5" align="center">
                                            {t('pages.scholarsTracker.scholarsHomepage.revenueThisMonth')}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Box className="box-container" boxShadow={2}>
                            <Box className="scholars-box-container">
                                <Typography variant="h5" align="center">
                                    {t('pages.scholarsTracker.scholarsHomepage.activeScholars')}
                                </Typography>
                                <Divider />
                                <Box className="scholars-content-container">
                                    <Box className="active-scholars-container">
                                        <Typography align="center" variant="h2" component="h6">
                                            21
                                        </Typography>
                                    </Box>
                                    <Typography className="scholars-activity-label" variant="h5" align="center">
                                        {t('pages.scholarsTracker.scholarsHomepage.newScholars', { scholars: '5' })}
                                    </Typography>
                                </Box>
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
                                    {t('pages.scholarsTracker.scholarsHomepage.revenueOverTime')}
                                </Typography>
                            </Box>
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
                    </Grid>
                </Grid>
            </Box>
            <Box className="row-container">
                <Grid container>
                    <Grid item xs={12} lg={12}>
                        <Box boxShadow={2} className="box-container">
                            <Box>
                                <Typography variant="h5" align="center">
                                    Scholars Payments(16)
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </ScholarsTrackerLayout>
    );
};

export default ScholarsHomepage;
