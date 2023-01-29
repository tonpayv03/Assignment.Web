
import React, { Component } from "react";
import { compose } from 'redux';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
import logo from '../../Images/logo.svg';

class Topbar extends Component {
    displayName = Topbar.name;

    constructor(props) {
        super(props);
        this.state = {
            screenWidth: 0
        };
        window.addEventListener("resize", this.updateScreenWidth);
    }

    updateScreenWidth = () => {
        this.setState({ screenWidth: window.innerWidth });
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

    render() {

        const screenWidth = this.state.screenWidth;
        
        return (
            <React.Fragment>
                <header className={screenWidth <= 991.98 ? "gf-backend-header mobile" : "gf-backend-header"}>
                    <div className="gf-backend-header-menubutton" onClick={()=>{ $('.gf-backend-menu, .gf-backend-header-menubutton').toggleClass('active'); }}><div>
                    </div></div> 
                    <img className="gf-backend-header-logo-svg" src={logo}></img>
                    <h4 className="gf-header-logo-name">Assignment</h4>
                    <div className="gf-backend-header-title"></div>
                    <div className="gf-backend-header-panel"></div>
                </header>
            </React.Fragment>
        );
    }
}

export default compose(withRouter, connect(null, null))(Topbar)
