import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
import './App.css';
import Footer from './components/footer/footer';
import Navbar from './components/navbar/navbar';
import BreedingTree from './pages/breedingTree/breedingTree';
import MarketCodeGenerator from './pages/marketCodeGenerator/marketCodeGenerator';
// import ForgotPassword from './pages/forgotPassword/forgotPassword';
// import Home from './pages/home/home';
// import Login from './pages/login/login';
// import Register from './pages/register/register';
// import ScholarsTracker from './pages/scholarsTracker/scholarsTracker';

const App: React.FunctionComponent = ({ location }: any) => {
    return (
        <div className="app">
            <Navbar></Navbar>
            <main className="content">
                <Switch>
                    <Route path="/market-code-generator">
                        <MarketCodeGenerator />
                    </Route>
                    <Route path="/">
                        <BreedingTree />
                    </Route>
                    {/* <Route path="/scholars-tracker">
                        <ScholarsTracker />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/forgot-password">
                        <ForgotPassword />
                    </Route> */}
                    {/*Important: A route with path="/" will *always* match
                    the URL because all URLs begin with a /. So that's
                    why we put this one last of all */}
                    {/* <Route path="/">
                        <Home />
                    </Route> */}
                </Switch>
            </main>
            {location.pathname !== '/' && <Footer />}
        </div>
    );
};

export default withRouter(App);
