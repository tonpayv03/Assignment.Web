import React, { Component } from 'react';

class Loading extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div id="divLoading" style={{ display: this.props.IsLoading ? 'block' : 'none' }}>

                <React.Fragment>
                    <div className="loading-background" style={{ display: this.props.HasBackground ? 'block' : 'none' }}></div>
                    <div className="loading-center">
                        <div className="loader">
                        </div>
                        <div className="loading-text" style={{ display: this.props.ShowText ? "block" : "none", color: this.props.HasBackground ? "var(--theme-font-color1)" : "var(--theme-font-color43)" }}>
                            กำลังโหลด
                        </div>
                    </div>
                </React.Fragment>

            </div>
        );
    }
}


export default (Loading);