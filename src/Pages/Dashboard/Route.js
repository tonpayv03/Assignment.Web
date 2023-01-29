import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

export default class ProfileRoute extends Component {
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path="/Dashboard/Admin" render={() => (<AdminDashboard />)} />
                    <Redirect to="/Dashboard" />
                </Switch>
            </React.Fragment>
        );
    }
}
