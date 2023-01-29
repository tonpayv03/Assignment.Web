import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Loading from './Components/Loader/Loading'

import './Assest/CSS/index.scss';
import './Assest/CSS/App.scss';
import './Assest/CSS/theme.scss';
import './Assest/CSS/navtab.scss';
import './Assest/CSS/mui-validation.scss';

//Pages 
const Main = React.lazy(() => import("./Pages/Main/Route"));
const Register = React.lazy(() => import("./Pages/Register/Route"));
const Dashboard = React.lazy(() => import("./Pages/Dashboard/Route"));


class App extends React.Component {
  displayName = App.name;

  componentWillMount() {

  }

  componentDidMount() {

  }

  render() {
    return (
      <Suspense fallback={
          <div><Loading ShowText={true} IsLoading={true} HasBackground={false} /></div>}>
          <Switch>
            <Route exact path="/" component={Main} /> 
            <Route path="/Register" component={Register} />
            <Route path="/Dashboard" component={Dashboard} />
          </Switch>                                  
      </Suspense>
    );
  }
}

export default connect(null, null)(App);

