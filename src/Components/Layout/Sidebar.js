import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Sidebar extends Component {
    displayName = Sidebar.name
    constructor(props) {
        super(props);
        this.state = {
            screenWidth: 0,
            reportPage: false
        };
    }

    updateScreenWidth = () => {
        this.setState({ screenWidth: window.innerWidth });
    };

    async componentDidMount() {
        // this.updateScreenWidth();
    }

    componentWillUnmount() {
        // return null when escapse component, it will no longer hold any data in memory
        this.setState = (state, callback) => {
            return;
        };
    }

    GetCleanCurrentSubPathURL = () => {
        var url = window.location.pathname
        if (url.charAt(url.length - 1) == "/") {
            url = url.substring(0, url.length - 1);
        }
        return url;
    }

    render() {

        return (
            <React.Fragment>
                <div className="gf-backend-menu"
                    style={this.state.screenWidth > 991.98
                        ? { position: 'absolute', height: '100px', overflowY: 'scroll' }
                        : null}>
                    <ul>
                        <li>
                            <ul className="collapse show" id='mainMenu'>
                                <li style={{ paddingLeft: "0px" }} className={this.GetCleanCurrentSubPathURL()?.toLowerCase() == '' ? "active" : ""}>
                                    <Link to={'/'}>หน้าหลัก</Link>
                                </li>

                            </ul>
                        </li>
                        <li>
                            <a data-bs-toggle="collapse" href="#maybankMenu" role="button" aria-expanded="false" aria-controls="maybankMenu">Maybank</a>
                            <ul className="collapse show" id='maybankMenu'>
                                <li className={this.GetCleanCurrentSubPathURL()?.toLowerCase() == "/Register/User".toLowerCase() ? "active" : ""}>
                                    <Link to="/Register/User">User</Link>
                                </li>
                                <li className={this.GetCleanCurrentSubPathURL()?.toLowerCase() == "/Dashboard/Admin".toLowerCase() ? "active" : ""}>
                                    <Link to="/Dashboard/Admin">Admin Dashboard</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </React.Fragment >
        );
    }
}


export default withRouter(connect(null, null)(Sidebar));