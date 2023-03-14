import Head from 'next/head';

export default function index() {
    return <>

        <Head>
            <title>Dashboard | DoctorOnCall</title>
            <meta name="description" content="" />

        </Head>

        <div>
            <div className="breadcome-area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="breadcome-list shadow-sm">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="breadcomb-wp">
                                            {/* <div className="breadcomb-icon">
                                                        <i className="icon jiran-home"></i>
                                                    </div> */}
                                            <a className="text-dark">
                                                <i className="icon jiran-home icon-wrap"></i>
                                                <span className="mini-click-non">Dashboard</span>
                                            </a>
                                        </div>
                                    </div>
                                    {/* <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                <div className="breadcomb-report">
                                                    <button data-toggle="tooltip" data-placement="left" title="Download Report"
                                                        className="btn"><i className="icon jiran-download"></i></button>
                                                </div>
                                            </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="section-admin container-fluid">
                <div className="row admin text-center">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                <div className="admin-content analysis-progrebar-ctn shadow-sm res-mg-t-15">
                                    <h4 className="text-start"><b>Orders</b></h4>
                                    <div className="row vertical-center-box vertical-center-box-tablet">
                                        <div className="col-3 mar-bot-15 text-start">
                                            <label className="badge bg-green">30% <i className="fa fa-level-up"
                                                aria-hidden="true"></i></label>
                                        </div>
                                        <div className="col-9 cus-gh-hd-pro text-end">
                                            <h2>10,000</h2>
                                        </div>
                                    </div>
                                    <div className="progress progress-mini">
                                        <div style={{ width: '78%' }} className="progress-bar bg-green"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-12" style={{ marginBottom: 1 }}>
                                <div className="admin-content analysis-progrebar-ctn shadow-sm res-mg-t-30">
                                    <h4 className="text-start"><b>Tax Deduction</b></h4>
                                    <div className="row vertical-center-box vertical-center-box-tablet">
                                        <div className="text-start col-3 mar-bot-15">
                                            <label className="badge bg-red">15% <i className="fa fa-level-down"
                                                aria-hidden="true"></i></label>
                                        </div>
                                        <div className="col-9 cus-gh-hd-pro">
                                            <h2 className="text-end no-margin">5,000</h2>
                                        </div>
                                    </div>
                                    <div className="progress progress-mini">
                                        <div style={{ width: '38%' }} className="progress-bar progress-bar-danger bg-red"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                <div className="admin-content analysis-progrebar-ctn shadow-sm res-mg-t-30">
                                    <h4 className="text-start"><b>Revenue</b></h4>
                                    <div className="row vertical-center-box vertical-center-box-tablet">
                                        <div className="text-start col-3 mar-bot-15">
                                            <label className="badge bg-blue">50% <i className="fa fa-level-up"
                                                aria-hidden="true"></i></label>
                                        </div>
                                        <div className="col-9 cus-gh-hd-pro">
                                            <h2 className="text-end no-margin">$70,000</h2>
                                        </div>
                                    </div>
                                    <div className="progress progress-mini">
                                        <div style={{ width: '60%' }} className="progress-bar bg-blue"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                <div className="admin-content analysis-progrebar-ctn shadow-sm res-mg-t-30">
                                    <h4 className="text-start"><b>Yearly Sales</b></h4>
                                    <div className="row vertical-center-box vertical-center-box-tablet">
                                        <div className="text-start col-3 mar-bot-15">
                                            <label className="badge bg-purple">80% <i className="fa fa-level-up"
                                                aria-hidden="true"></i></label>
                                        </div>
                                        <div className="col-9 cus-gh-hd-pro">
                                            <h2 className="text-end no-margin">$100,000</h2>
                                        </div>
                                    </div>
                                    <div className="progress progress-mini">
                                        <div style={{ width: '60%' }} className="progress-bar bg-purple"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-sales-area mg-tb-30">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-9 col-md-9 col-sm-9 col-12">
                            <div className="product-sales-chart shadow-sm">
                                <div className="portlet-title">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="caption pro-sl-hd">
                                                <span className="caption-subject text-uppercase"><b>Product Sales</b></span>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="actions graph-rp">
                                                <div className="btn-group" data-toggle="buttons">
                                                    <label className="btn btn-grey active">
                                                        <input type="radio" name="options" className="btn-check" id="option1"
                                                        />Today</label>
                                                    <label className="btn btn-grey">
                                                        <input type="radio" name="options" className="btn-check"
                                                            id="option2" />Week</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="sparklinehome" className="sparkline-container">Loading..</div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                            <div className="white-box analytics-info-cs shadow-sm mg-b-30 res-mg-t-30">
                                <h3 className="box-title">Total Visit</h3>
                                <ul className="list-inline two-part-sp">
                                    <li>
                                        <div id="sparklinedash"></div>
                                    </li>
                                    <li className="text-end sp-cn-r"><i className="fa fa-level-up" aria-hidden="true"></i> <span
                                        className="counter sales-sts-ctn">8659</span></li>
                                </ul>
                            </div>
                            <div className="white-box analytics-info-cs shadow-sm mg-b-30">
                                <h3 className="box-title">Total Page Views</h3>
                                <ul className="list-inline two-part-sp">
                                    <li>
                                        <div id="sparklinedash2"></div>
                                    </li>
                                    <li className="text-end"><i className="fa fa-level-up" aria-hidden="true"></i> <span
                                        className="counter sales-sts-ctn">7469</span></li>
                                </ul>
                            </div>
                            <div className="white-box analytics-info-cs shadow-sm mg-b-30">
                                <h3 className="box-title">Unique Visitor</h3>
                                <ul className="list-inline two-part-sp">
                                    <li>
                                        <div id="sparklinedash3"></div>
                                    </li>
                                    <li className="text-end"><i className="fa fa-level-up" aria-hidden="true"></i> <span
                                        className="counter sales-sts-ctn">6011</span></li>
                                </ul>
                            </div>
                            <div className="white-box analytics-info-cs shadow-sm">
                                <h3 className="box-title">Bounce Rate</h3>
                                <ul className="list-inline two-part-sp">
                                    <li>
                                        <div id="sparklinedash4"></div>
                                    </li>
                                    <li className="text-end"><i className="fa fa-level-down" aria-hidden="true"></i> <span
                                        className="sales-sts-ctn">18%</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="traffic-analysis-area mb-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                            <div className="white-box tranffic-als-inner shadow-sm">
                                <h3 className="box-title"><small className="pull-right m-t-10 last-month-sc cl-one"><i
                                    className="fa fa-sort-asc"></i> 18% last month</small> Site Traffic</h3>
                                <div className="stats-row">
                                    <div className="stat-item">
                                        <h6>Overall Growth</h6>
                                        <b>80.40%</b>
                                    </div>
                                    <div className="stat-item">
                                        <h6>Montly</h6>
                                        <b>15.40%</b>
                                    </div>
                                    <div className="stat-item">
                                        <h6>Day</h6>
                                        <b>5.50%</b>
                                    </div>
                                </div>
                                <div id="sparkline8"></div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                            <div className="white-box tranffic-als-inner shadow-sm res-mg-t-30">
                                <h3 className="box-title"><small className="pull-right m-t-10 last-month-sc cl-two"><i
                                    className="fa fa-sort-desc"></i> 18% last month</small>Site Traffic</h3>
                                <div className="stats-row">
                                    <div className="stat-item">
                                        <h6>Overall Growth</h6>
                                        <b>80.40%</b>
                                    </div>
                                    <div className="stat-item">
                                        <h6>Montly</h6>
                                        <b>15.40%</b>
                                    </div>
                                    <div className="stat-item">
                                        <h6>Day</h6>
                                        <b>5.50%</b>
                                    </div>
                                </div>
                                <div id="sparkline9"></div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                            <div className="white-box tranffic-als-inner shadow-sm res-mg-t-30">
                                <h3 className="box-title"><small className="pull-right m-t-10 last-month-sc cl-three"><i
                                    className="fa fa-sort-asc"></i> 18% last month</small>Site Traffic</h3>
                                <div className="stats-row">
                                    <div className="stat-item">
                                        <h6>Overall Growth</h6>
                                        <b>80.40%</b>
                                    </div>
                                    <div className="stat-item">
                                        <h6>Montly</h6>
                                        <b>15.40%</b>
                                    </div>
                                    <div className="stat-item">
                                        <h6>Day</h6>
                                        <b>5.50%</b>
                                    </div>
                                </div>
                                <div id="sparkline10"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <div className="calender-area mg-tb-30">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="calender-inner">
                                <div id='calendar'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    </>
}