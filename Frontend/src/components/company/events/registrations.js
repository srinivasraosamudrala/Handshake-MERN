import React, { Component } from 'react';
import '../../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, CardContent, Dialog, DialogContent, Avatar } from '@material-ui/core';
import emptyPic from '../../../images/empty-profile-picture.png';
import { environment } from '../../../Utils/constants'
import { connect } from "react-redux";
import { getEventRegistrations } from "../../../redux/actions/index";

//Define a Login Component
class ViewApplicants extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            name: "",
            email: "",
            phone: "",
            event_id: this.props.match.params.eventId,
            redirect: false,
            stuData: [],
            view_profile: false,
            studId: "",
            toEvents: false,
            showStatus: "",
            statusUpdated: "",
            previewresume: false,
            emptyprofilepic: emptyPic
        }
        this.viewProfile = this.viewProfile.bind(this);
        this.toevents = this.toevents.bind(this);
    }


    viewProfile = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        console.log(e.target.value);
        this.setState({
            view_profile: true,
            studId: e.target.value
        })
    }

    inputChangeHandler = (e) => {
        let value = e.target.value
        this.setState({
            [e.target.name]: value
        })
        console.log(this.state)
    }

    componentDidMount() {
        this.fetchApplicants()
    }

    fetchApplicants() {
        let companyId = localStorage.getItem('companyId')
        const data = {
            id: companyId,
            event_id: this.state.event_id
        }

        console.log(data)
        this.props.getEventRegistrations(data)
        // axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        // axios.post(environment.baseUrl+'/company/listRegistrations', data)
        //     .then(response => {
        //         console.log("in frontend after response");
        //         console.log(response.data.result)
        //         if (response.data.result) {
        //             this.setState({
        //                 stuData: response.data.result,
        //             });
        //           console.log(this.state.stuData)
        //         } else if (response.data.error) {
        //             console.log("response" + response.data.error)
        //         }
        //     })
    }

    toevents = (e) => {
        this.setState({
            toEvents: true
        })
    }


    render() {
        let renderRedirect = null;
        let selectStatus = null;
        // if (this.state.redirect === true) {
        //     renderRedirect = <Redirect to='/jobs' />
        // }
        if (this.state.view_profile === true) {
            renderRedirect = <Redirect to={`/ViewProfile/${this.state.studId}`} />
        }

        if (this.state.showStatus === true) {
            selectStatus = (<div style={{ marginLeft: '20px', marginBottom: '10px' }}>
                <select name="showStatus" onChange={this.inputChangeHandler}>
                    <option value="Change Status" >Change Status</option>
                    <option value="Pending" >Pending</option>
                    <option value="Reviewed" >Reviewed</option>
                    <option value="Declined" >Declined</option>
                </select>
            </div>)
        }

        if (this.state.toEvents === true) {
            console.log('to events')
            renderRedirect = <Redirect to="/company/events" />
        }

        let stuData = this.props.stuData;
        console.log(stuData)
        return (
            <div>
                <div class="container">
                    <div class="panel1">
                        <h2 style={{ position: 'relative', top: '10px' }}>Students Registered </h2>
                        <div style={{ float: 'right', position: 'relative', top: '-22px', marginRight: '10px' }}>
                            <button onClick={this.toevents} class="btn btn-primary" style={{ backgroundColor: '#808080', borderRadius: '15px', border: '0px' }}><span class="glyphicon glyphicon-chevron-left" style={{ color: "white" }}></span>Back to events</button>
                        </div>
                    </div>
                    <div>
                        {renderRedirect}
                    </div>
                    <div>
                        {console.log(stuData.length)}
                        {stuData.length ? stuData.map((data, index) => {

                            if (data.studentDetails.length) {
                                let studentData = data.studentDetails[0]
                                console.log(studentData)
                                console.log(typeof (studentData))

                                return (
                                    <div style={{ margin: "10px 0px 10px 100px", width: "80%" }}>
                                        <Card>
                                            <CardContent>
                                                <div key={data.stud_id} style={{ padding: '10px 0px 10px 50px' }}>
                                                    <div className="row App-align">
                                                        <div className="col-md-1">
                                                            <img src={studentData ? studentData.image : this.state.emptyprofilepic} height='70' width='70' style={{ position: 'relative', top: '12px', left: '-30px' }} alt='Profile' />
                                                        </div>
                                                        <div className="col-md-8" style={{ fontSize: "23px", color: "#1569E0", marginLeft: "-10px" }}><Link onClick={() => (this.viewProfile(data.stud_id))}>{studentData ? studentData.first_name + " " + studentData.last_name : ""}</Link>
                                                            <div style={{ fontSize: "13px" }}><span class="glyphicon glyphicon-envelope" style={{ color: "#1569E0" }}></span> {studentData ? studentData.email : ""}</div>
                                                            <div style={{ fontSize: "13px" }}><span class="glyphicon glyphicon-book" style={{ color: "#1569E0" }}></span> {studentData ? studentData.college : ""}</div>
                                                            <div style={{ fontSize: "13px" }}><span class="glyphicon glyphicon-phone" style={{ color: "#1569E0" }}></span>{studentData ? studentData.mobile : "Phone number not updated"}</div></div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                )
                            }
                        }) : ""}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    console.log(state)
    return {
        stuData: state.eventregistrations,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getEventRegistrations: payload => dispatch(getEventRegistrations(payload)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewApplicants);
// export default ViewApplicants;