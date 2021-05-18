import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import SettingsPage from "./Settings";
import ProjectsPage from "./Projects";
import MembersPage from "./Members";
import AboutPage from "./About";
import TeamsPage from "./Teams";
import HomePage from "./Home";

const Demos = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/about/members">
                    <MembersPage />
                </Route>
                <Route path="/about/projects">
                    <ProjectsPage />
                </Route>
                <Route path="/about">
                    <AboutPage />
                </Route>
                <Route path="/another/teams">
                    <TeamsPage />
                </Route>
                <Route path="/settings">
                    <SettingsPage />
                </Route>
                <Route path="/">
                    <HomePage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Demos;
