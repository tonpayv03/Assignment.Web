import React from "react";
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Topbar from '../Layout/Topbar';
import Sidebar from '../Layout/Sidebar';
import Loader from '../Loader/Loader';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        flexDirection: 'column'
    },
    backendContainer: {
        margin: '20px 20px'
    }
}), { name: 'React-Example' });

class LayoutMain extends React.Component {

    componentWillUnmount() {
        // return null when escapse component, it will no longer hold any data in memory
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        return (
            <React.Fragment>
                <Topbar />
                <div className="gf-backend-wrapper">
                    <Sidebar />
                    <div className="gf-backend-content">
                        <div className="gf-backend-container">
                            {this.props.children}
                        </div>
                        {/* <Layout children={this.props.children} /> */}
                    </div>
                </div>
                <Loader />
            </React.Fragment>
        );
    }
}

const Layout = ({ ...props }) => {
    const classes = useStyles();
    return (
        <div className={classes.backendContainer}>
            {props.children}
        </div>
    );
}

export default (LayoutMain);