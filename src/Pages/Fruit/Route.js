import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Fruit from "./Fruit";
import AddFruit from "./AddFruit";

export default class ProfileRoute extends Component {
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path="/Fruit" render={() => (<Fruit />)} />
                    <Route exact path="/Fruit/Add" render={() => (<AddFruit />)} />
                    <Redirect to="/Fruit" />
                </Switch>
            </React.Fragment>
        );
    }
}
