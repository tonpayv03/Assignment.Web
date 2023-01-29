import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Index from "./index";

export default class MainRoute extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path="/" render={() => (<Index />)} />
                    <Redirect to="/" />
                </Switch>
            </React.Fragment>
        );
    }
}
