import { Box, Divider, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import React, { ReactNode, useEffect } from 'react';
import { useHistory } from 'react-router';
import './scholarsTrackerLayout.css';

interface ScholarsTrackerLayoutProps {
    title: string;
    children: ReactNode;
}

const ScholarsTrackerLayout: React.FunctionComponent<ScholarsTrackerLayoutProps> = (
    props: ScholarsTrackerLayoutProps,
) => {
    const history = useHistory();

    // Scroll to top when the page is rendered
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleHomePageClick = () => {
        history.push('/scholars-tracker');
    };

    const handleScholarsListClick = () => {
        history.push('/scholars-tracker/scholars-list');
    };

    const handleScholarsPaymentsClick = () => {
        history.push('/scholars-tracker/payments');
    };

    const isPathSelected = (path: string) => {
        return history.location.pathname === path;
    };

    return (
        <div className="scholar-layout">
            <Box display="flex">
                <Box>
                    <List component="aside" className="menu" aria-label="Menu">
                        <ListItem selected={isPathSelected('/scholars-tracker')} button divider>
                            <ListItemText onClick={handleHomePageClick} primary="Home page" />
                        </ListItem>
                        <ListItem selected={isPathSelected('/scholars-tracker/scholars-list')} button>
                            <ListItemText onClick={handleScholarsListClick} primary="Scholars List" />
                        </ListItem>
                        <Divider light />
                        <ListItem selected={isPathSelected('/scholars-tracker/payments')} button>
                            <ListItemText onClick={handleScholarsPaymentsClick} primary="Payments" />
                        </ListItem>
                    </List>
                </Box>
                <Box>
                    <Box width="100%" display="flex" justifyContent="center" marginBottom="24px">
                        <Typography variant="h4" component="h1">
                            {props.title}
                        </Typography>
                    </Box>
                    <Box>{props.children}</Box>
                </Box>
            </Box>
        </div>
    );
};

export default ScholarsTrackerLayout;
