import React from 'react';
import _ from 'lodash';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './commandPick.css';
import { nextStep, submitCommandName } from '../../../core/redux/marketCodeGenerator/actions';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';

const CommandPick: React.FunctionComponent = () => {
    const dispatch = useDispatch();

    const onNextStepClick = (commandName: string) => {
        dispatch(submitCommandName({ commandName }));
        dispatch(nextStep());
    };

    return (
        <div className="command-selection-container">
            <Grid container className="grid-container">
                <Grid item sm={12} md={6}>
                    <div className="command-section-container">
                        <div className="command-container">
                            <div className="command-help-container">
                                <Typography align="center">
                                    Set up a notification that will DM you to Discord all the <strong>new</strong> axies
                                    that fit your criteria including D,R1 and R2 genes. Set it once and the bot will
                                    keep notifying until indicated otherwise.
                                </Typography>
                            </div>
                            <Button onClick={() => onNextStepClick('!notifyme')} variant="contained">
                                Notification
                            </Button>
                        </div>
                    </div>
                </Grid>
                <Grid item sm={12} md={6}>
                    <div className="command-section-container">
                        <div className="command-container">
                            <div className="command-help-container">
                                <Typography align="center">
                                    Search up to 4 pages of the marketplace at the same time. Filter all the{' '}
                                    <strong>existing</strong> axies in the marketplace by D, R1 and R2 genes and other
                                    filters. All matching axies will be sent to your Discord inbox.
                                </Typography>
                            </div>
                            <Button onClick={() => onNextStepClick('!searchmarket')} variant="contained">
                                Market search
                            </Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default CommandPick;
