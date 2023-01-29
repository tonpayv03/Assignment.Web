import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';

export class Loader extends React.Component {
   

    render() {        

        return (
            <div id="divLoading" style={{ display: this.props.Loader.IsLoading ? 'block' : 'none' }}>
            {/* <div id="divLoading" style={{ display:'block' }}> */}
                
                    <React.Fragment>
                        <div className="loading-background" style={{ display: this.props.Loader.HaveBackground ? 'block' : 'none' }}></div>
                        <div className="loading-center">
                            <div className="loader">
                            </div>
                            <div className="loading-text" style={{ display: this.props.Loader.ShowText ? "block" : "none", color: this.props.Loader.HaveBackground ? "var(--theme-font-color1)" : "var(--theme-font-color43)" }}>
                                กำลังโหลด
                            </div>
                        </div>
                    </React.Fragment>
                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    Loader: state.Loader
});


export default withRouter(connect(mapStateToProps, null)(Loader));
