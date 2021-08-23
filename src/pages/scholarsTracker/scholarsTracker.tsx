import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ScholarDetails from './scholarDetails/scholarDetails';
import ScholarsHomepage from './scholarsHomepage/scholarsHomepage';
import ScholarsList from './scholarsList/scholarsList';
import ScholarsPayments from './scholarsPayments/scholarsPayments';

const ScholarsTracker: React.FunctionComponent = () => {
    // The `path` lets us build <Route> paths that are
    // relative to the parent route, while the `url` lets
    // us build relative links.
    const { path, url } = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route path={path + '/scholars-list/:id/details'}>
                    <ScholarDetails />
                </Route>
                <Route path={path + '/scholars-list'}>
                    <ScholarsList />
                </Route>
                <Route path={path + '/payments'}>
                    <ScholarsPayments />
                </Route>
                <Route path={path}>
                    <ScholarsHomepage />
                </Route>
            </Switch>
        </div>
    );
};

export default ScholarsTracker;
