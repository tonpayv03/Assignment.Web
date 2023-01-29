import React from "react";
import { withRouter } from "react-router-dom";

import LayoutMain from "../../Components/Layout/LayoutMain";
import logo from '../../Images/logo.svg';

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            screenWidth: 0
        };
        window.addEventListener("resize", this.updateScreenWidth);
    }

    updateScreenWidth = () => {
        this.setState({ screenWidth: window.innerWidth });
    };

    async componentWillMount() {
        console.log('componentWillMount')
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
        console.log('render')
        const { history } = this.props

        return (
            <React.Fragment>
                <LayoutMain>
                <div className="App">
                    <header className="App-header">
                        <div className='position-absolute top-50 start-50 translate-middle'>
                            <img src={logo} className="App-logo" alt="logo" />
                        </div>
                    </header>
                </div>
                </LayoutMain>
            </React.Fragment >
        );
    }
}

export default withRouter(Index);