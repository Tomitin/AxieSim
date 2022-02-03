import React, { useEffect } from 'react';
import { IconButton, Typography } from '@material-ui/core';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RefreshIcon from '@mui/icons-material/Refresh';
import './marketNotifications.css';
import NotificationCardComponent from './components/notificationCard/notificationCard';
import NotificationModalComponent from './components/notificationModal/notificationModal';
import { AxieData, AxieType } from '../../models/axie';
import { personalApi } from '../../core/axios.instance';

const MarketNotifications: React.FunctionComponent = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [pendingNotifications, setPendingNotifications] = React.useState([]);
    const [isNotificationModalOpen, setIsNotificationModalOpen] = React.useState<boolean>(false);
    const [axieData, setAxieData] = React.useState<AxieData>({
        id: 0,
        axieClass: 'bird',
        genes: [
            [[], [], []],
            [[], [], []],
            [[], [], []],
            [[], [], []],
            [[], [], []],
            [[], [], []],
        ],
    });
    const [activeNotifications, setActiveNotifications] = React.useState([]);
    const [isActiveNotificationSelected, setIsActiveNotificationSelected] = React.useState(false);

    useEffect(() => {
        isNotificationModalOpen;
        loadPendingNotifications();
        loadActiveNotifications();
    }, []);

    const loadActiveNotifications = () => {
        setIsLoading(true);
        personalApi
            .get('/active-notifications')
            .then((response) => {
                setActiveNotifications(response.data.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setActiveNotifications([]);
                setIsLoading(false);
            });
    };

    const deleteActiveNotification = (id: string) => {
        setIsLoading(true);
        personalApi
            .delete('/active-notifications/' + id)
            .then((response) => {
                loadActiveNotifications();
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
            });
    };

    const deletePendingNotification = (id: string | number) => {
        setIsLoading(true);
        personalApi
            .delete('/pending-notifications/' + id)
            .then((response) => {
                loadPendingNotifications();
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
            });
    };

    const onCreateNotificationClick = (
        id: string | number,
        genes: any,
        breedCount: number[],
        pureness: number,
        maxPrice: number,
        axieClass: AxieType,
        speed: number[],
    ) => {
        setIsLoading(true);
        personalApi
            .post('/active-notifications', {
                pureness: pureness ? pureness : 0,
                classes: Array.isArray(axieClass) ? axieClass : [axieClass],
                speed,
                breedCount,
                axieGenes: genes,
                maxPrice: maxPrice ? maxPrice : 0,
            })
            .then(() => {
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
            });
        deletePendingNotification(id);
    };

    const onEditNotificationClick = (
        id: number | string,
        genes: any,
        breedCount: number[],
        pureness: number,
        maxPrice: number,
        axieClass: AxieType,
        speed: number[],
    ) => {
        setIsLoading(true);
        personalApi
            .put('/active-notifications/' + id, {
                pureness: pureness ? pureness : 0,
                classes: Array.isArray(axieClass) ? axieClass : [axieClass],
                speed,
                breedCount,
                axieGenes: genes,
                maxPrice: maxPrice ? maxPrice : 0,
            })
            .then(() => {
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
            });
    };

    const loadPendingNotifications = () => {
        setIsLoading(true);
        personalApi
            .get('/pending-notifications')
            .then((response) => {
                setPendingNotifications(response.data.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setPendingNotifications([]);
                setIsLoading(false);
            });
    };

    const handleReloadPendingNotifications = () => {
        loadPendingNotifications();
        loadActiveNotifications();
    };

    const handleNotificationModalClick = (axie: any) => {
        setIsActiveNotificationSelected(false);
        setAxieData({
            id: axie.id,
            genes: [
                [[], [], []],
                [[], [], []],
                [[axie.mouth], [], []],
                [[axie.horn], [], []],
                [[axie.back], [], []],
                [[axie.tail], [], []],
            ],
            axieClass: axie.class,
        });
        setIsNotificationModalOpen(true);
    };

    const handleActiveNotificationClick = (notification: any) => {
        setIsActiveNotificationSelected(true);
        setAxieData({
            id: notification.notificationId,
            genes: notification.axieGenes,
            axieClass: notification.classes,
            breedCount: notification.breedCount,
            maxAxiePrice: notification.maxPrice,
            pureness: notification.pureness,
            speed: notification.speed,
        });
        setIsNotificationModalOpen(true);
    };

    const getFormattedDate = (timestamp: number) => {
        const date = new Date(timestamp);

        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    };

    return (
        <div className="market-notifications">
            {!isLoading && (
                <div>
                    <div className="pending-notifications-container">
                        <div className="pending-notifications-title">
                            <div>
                                <Typography variant="h5">
                                    Pending notifications({pendingNotifications.length})
                                </Typography>
                            </div>
                            <div>
                                Reload
                                <IconButton onClick={handleReloadPendingNotifications}>
                                    <RefreshIcon />
                                </IconButton>
                            </div>
                        </div>
                        <div className="pending-notifications-list">
                            {pendingNotifications.map((pendingNotification: any) => {
                                return (
                                    <div key={pendingNotification.id} className="notification-card-container">
                                        <NotificationCardComponent
                                            axieClass={pendingNotification.class}
                                            icon={<ShoppingCartIcon />}
                                            onDeleteClick={() => deletePendingNotification(pendingNotification.id)}
                                            buttonTitle="Create notification"
                                            onButtonClick={() => handleNotificationModalClick(pendingNotification)}
                                            href={`https://marketplace.axieinfinity.com/axie/?class=${pendingNotification.class}&part=${pendingNotification.mouth}&part=${pendingNotification.horn}&part=${pendingNotification.back}&part=${pendingNotification.tail}`}
                                        >
                                            <div className="card-content">
                                                <div className="card-content-item">
                                                    AVG: {Number(pendingNotification.axiesCostAverage).toFixed(3)}
                                                </div>
                                                <div className="card-content-item">
                                                    {pendingNotification.isUprisingMarket ? 'Breedable' : 'Tradeable'}
                                                </div>
                                                <div className="card-content-item">{pendingNotification.mouth}</div>
                                                <div className="card-content-item">{pendingNotification.horn}</div>
                                                <div className="card-content-item">{pendingNotification.back}</div>
                                                <div className="card-content-item">{pendingNotification.tail}</div>
                                            </div>
                                        </NotificationCardComponent>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="active-notifications-container">
                        <div className="active-notitifactions-title-container">
                            <Typography variant="h5">Active notifications({activeNotifications.length})</Typography>
                        </div>
                        <div className="active-notifications-list">
                            {activeNotifications.length > 0 &&
                                activeNotifications.map((notification: any) => {
                                    return (
                                        <div key={notification.notificationId} className="notification-card-container">
                                            <NotificationCardComponent
                                                axieClass={notification.classes[0]}
                                                icon={<ShoppingCartIcon />}
                                                href={`https://marketplace.axieinfinity.com/axie/?class=${notification.classes[0]}&part=${notification.axieGenes[2][0]}&part=${notification.axieGenes[3][0]}&part=${notification.axieGenes[4][0]}&part=${notification.axieGenes[5][0]}`}
                                                buttonTitle="See details"
                                                onDeleteClick={() =>
                                                    deleteActiveNotification(notification.notificationId)
                                                }
                                                onButtonClick={() => handleActiveNotificationClick(notification)}
                                            >
                                                <div className="card-content">
                                                    <div className="card-content-item">
                                                        UPDT: {getFormattedDate(notification.lastTimeFloorSet)}
                                                    </div>
                                                    <div className="card-content-item">
                                                        BC: {notification.breedCount[0]} to {notification.breedCount[1]}
                                                    </div>
                                                    <div className="card-content-item">
                                                        {notification.axieGenes[2][0]}
                                                    </div>
                                                    <div className="card-content-item">
                                                        {notification.axieGenes[3][0]}
                                                    </div>
                                                    <div className="card-content-item">
                                                        {notification.axieGenes[4][0]}
                                                    </div>
                                                    <div className="card-content-item">
                                                        {notification.axieGenes[5][0]}
                                                    </div>
                                                </div>
                                            </NotificationCardComponent>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            )}
            <NotificationModalComponent
                axie={axieData}
                title={isActiveNotificationSelected ? 'Edit notification' : 'Create notification'}
                isOpen={isNotificationModalOpen}
                onCloseClick={() => setIsNotificationModalOpen(false)}
                buttonTitle={isActiveNotificationSelected ? 'Edit notification' : 'Create notification'}
                onConfirmButtonClick={
                    isActiveNotificationSelected ? onEditNotificationClick : onCreateNotificationClick
                }
            >
                <div></div>
            </NotificationModalComponent>
        </div>
    );
};

export default MarketNotifications;
