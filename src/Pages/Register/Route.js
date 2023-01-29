import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import RegisterUser from "./RegisterUser";

export default class ProfileRoute extends Component {
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path="/Register/User" render={() => (<RegisterUser />)} />
                    <Redirect to="/Register" />
                </Switch>
            </React.Fragment>
        );
    }
}
