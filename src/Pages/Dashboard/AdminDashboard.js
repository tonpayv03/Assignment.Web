//#region Main Zone
import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
//#endregion

//#region utils zone
import { Register } from '../../APIArmy/Register/RegisterUser'
import { UserType } from '../../Enumeration/Enums'
//#endregion

//#region ui zone
import LayoutMain from "../../Components/Layout/LayoutMain";
import MaterialTable from "material-table";
import { Paper, IconButton, InputAdornment } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import { Button, Card, Col, Fade, Form, FormCheck, ProgressBar, Row } from 'react-bootstrap';
import { Tabbed } from '../../Components/Tabbed/Tabbed'
import PersonUserDashboard from './Components/PersonUserDashboard'
import CompanyUserDashboard from './Components/CompanyUserDashboard'
//#endregion

class AdminDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            screenWidth: 0,
            isPersonType: true
        };
        window.addEventListener("resize", this.updateScreenWidth);
    }

    updateScreenWidth = () => {
        this.setState({ screenWidth: window.innerWidth });
    };

    async componentWillMount() {
        //console.log('componentWillMount')
    }

    async componentDidMount() {
        this.updateScreenWidth();
    }

    componentWillUnmount() {
        // return null when escapse component, it will no longer hold any data in memory
        this.setState = (state, callback) => {
            return;
        };
    }

    historygoBack = () => {
        this.props.history.goBack()
    }

    onChangeTab = (event) => {
        event.preventDefault();

        let id = parseInt(event.currentTarget.id);
        console.log('onChangeTab:', id)
        this.setState({ isPersonType: id === UserType.Person });
    };

    render() {
        console.log('render')
        const { history } = this.props

        return (
            <React.Fragment>
                <LayoutMain>
                    <React.Fragment>
                        <div className="col-lg-12 pl-1 pr-1">
                            <div className="row">
                                <div className="col-lg-12 pl-0 pr-0">
                                    <div className="gf-backend-container">
                                        <div className="hr-pagination-bar">
                                            <Link to={'/'} >
                                                <i className="fas fa-chevron-left"></i>
                                                <h5 className="d-inline-block">Back</h5>
                                            </Link>
                                        </div>


                                        <Card className="gf-backend-box">
                                            <Card.Body>
                                                <h2>Admin Dashboard</h2>

                                                <hr className="mb-4 mt-4"></hr>

                                                <ul className="nav nav-tabs gf-nav-tabs">
                                                    <Tabbed isActive={this.state.isPersonType} onClick={this.onChangeTab} id={UserType.Person} text='Person' />
                                                    <Tabbed isActive={!this.state.isPersonType} onClick={this.onChangeTab} id={UserType.Company} text='Company' />
                                                </ul>
                                                <div className="tab-content">
                                                    <div id="all" className="tab-pane fade active show">
                                                        <div className="mt-4 mb-3 mx-2">
                                                            {
                                                                this.state.isPersonType
                                                                    ? <PersonUserDashboard />
                                                                    : <CompanyUserDashboard />
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                </LayoutMain>
            </React.Fragment >
        );
    }
}

export default withRouter(connect(null, null)(AdminDashboard));