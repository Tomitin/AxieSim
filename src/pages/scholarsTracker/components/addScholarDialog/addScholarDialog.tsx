import { FormControl, Input, InputLabel, Slider, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DialogComponent from '../../../../components/dialog/dialog';

interface AddScholarDialogProps {
    isAddScholarModalOpen: boolean;
    handleAddScholarAccept: () => void;
    handleAddScholarClose: () => void;
}

const AddScholarDialog: React.FunctionComponent<AddScholarDialogProps> = (props: AddScholarDialogProps) => {
    const { t } = useTranslation();

    const [managerSliderValue, setManagerSliderValue] = React.useState(50);

    const handleAddScholarAccept = () => {
        props.handleAddScholarAccept();
    };

    const handleManagerSliderChange = (event: React.ChangeEvent<unknown>, value: number | number[]) => {
        if (!Array.isArray(value)) {
            setManagerSliderValue(value);
        }
    };

    return (
        <DialogComponent
            title={t('pages.scholarsTracker.scholarAddDialog.title')}
            isOpen={props.isAddScholarModalOpen}
            handleClose={props.handleAddScholarClose}
            handleAccept={handleAddScholarAccept}
            acceptButtontitle={t('pages.scholarsTracker.scholarAddDialog.confirm')}
            closeButtontitle={t('pages.scholarsTracker.scholarAddDialog.cancel')}
        >
            <form>
                <FormControl className="add-scholar-form-control" required={true} fullWidth={true}>
                    <InputLabel htmlFor="scholar-name">
                        {t('pages.scholarsTracker.scholarAddDialog.scholarName')}
                    </InputLabel>
                    <Input id="scholar-name" />
                </FormControl>
                <FormControl className="add-scholar-form-control" required={true} fullWidth={true}>
                    <InputLabel htmlFor="ronin-address">
                        {t('pages.scholarsTracker.scholarAddDialog.roninAdress')}
                    </InputLabel>
                    <Input id="ronin-address" />
                </FormControl>
                <FormControl className="add-scholar-form-control" fullWidth={true}>
                    <InputLabel htmlFor="payment-address">
                        {t('pages.scholarsTracker.scholarAddDialog.paymentAddress')}
                    </InputLabel>
                    <Input id="payment-address" />
                </FormControl>
                <FormControl className="add-scholar-form-control" required={true} fullWidth={true}>
                    <Typography>
                        {t('pages.scholarsTracker.scholarAddDialog.managerShare', {
                            share: managerSliderValue,
                        })}
                    </Typography>
                    <Slider
                        defaultValue={50}
                        aria-labelledby="discrete-slider-small-steps"
                        step={5}
                        marks
                        min={0}
                        max={100}
                        value={managerSliderValue}
                        onChange={handleManagerSliderChange}
                        valueLabelDisplay="auto"
                    />
                </FormControl>
            </form>
        </DialogComponent>
    );
};

export default AddScholarDialog;
