import React, { Component } from 'react';
import basepath from './basepath';

const logo = '/img/logo.gif';

export default class Loader extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {

        return (
            <>
                <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center" style={{ position: 'fixed', zIndex: 1000, top: 0, backgroundColor: 'rgba(255,255,255,0.96)' }}>
                    <img
                        alt=""
                        src={basepath(logo)}
                        width="70"
                        height="70"
                    />
                    {/* <h5 className="text-center font-weight-bold text-black-50 mt-3">Loading...</h5> */}
                </div>
            </>
        )
    }
}

