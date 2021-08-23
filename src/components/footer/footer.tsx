import { Box, Link, List, ListItem, Typography } from "@material-ui/core";
import React from "react";
import { useTranslation } from 'react-i18next';

const Footer: React.FunctionComponent = () => {
    const { t } = useTranslation();

    return (
        <footer>
            <Box height='100%' width='100%' bgcolor='black' color='white'>
                <Box padding='32px' display='flex'>
                    <Box flex='1'>
                        <Box display='flex' alignItems='center' justifyContent='center'>
                            <Box width='75%'>
                                <Typography variant='h6'>
                                    {t('components.footer.helperMessage')}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box flex='1'>
                        <List>
                            <ListItem>
                                <Link target="_blank" rel="noopener" href='https://axie.zone/'>
                                    {t('components.footer.axieZone')}
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link target="_blank" rel="noopener" href='https://axieinfinity.com/'>
                                    {t('components.footer.axieInfinity')}
                                </Link>
                            </ListItem>
                        </List>
                    </Box>
                    <Box flex='1'>
                        <List>
                            <ListItem>
                                <Link target="_blank" rel="noopener" href='https://axie.zone/'>
                                    {t('components.footer.contactUs')}
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link target="_blank" rel="noopener" href='https://axieinfinity.com/'>
                                    {t('components.footer.privacyAndLegal')}
                                </Link>
                            </ListItem>
                        </List>
                    </Box>
                </Box>
                <Typography variant='h5' align='center'>
                    {t('components.footer.copyright')}
                </Typography>

            </Box>
            
        </footer>
    );
}

export default Footer