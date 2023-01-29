import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './Reducers';
import logger from 'redux-logger'
import history from "./Helper/history";
import { MuiThemeProvider } from '@material-ui/core/styles';
import './Assest/CSS/index.scss';
import './Assest/CSS/App.scss';
import themeStyle from "./Helper/Style";
import App from './App';
import reportWebVitals from './reportWebVitals';



export const store = createStore(rootReducer, applyMiddleware(logger));

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
      <Router history={history}>
        <MuiThemeProvider theme={themeStyle}>
          <App />
        </MuiThemeProvider>
      </Router>
  </Provider>,
rootElement)

reportWebVitals();
