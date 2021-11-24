import React from 'react';
import {Link} from 'react-router-dom';
class Reschedule extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			newdate: 0,
	                hospital:''
		}
	}
	onNewdateChange = (event) =>{this.setState({newdate: event.target.value})}
	onHospitalChange = (event) =>{this.setState({hospital: event.target.value})}

	onSubmitALogin = ()=>{
		fetch('', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				aid: this.state.newdate,
				password: this.state.hospital,
			})
		}).then(response => response.json())
		.then(admin => {
			if(!(admin.aid)){
				alert(admin);
				console.log(admin);
			}
			else{
				this.props.loadAdmin(admin);
			}
		})
		console.log(this.state);
	}
	render(){
		return(
			<div className="container">
				<b className="page_title">Reschedule </b>
				<div className="form">
				  <div className="form_input">
						<label>
							<span className="label">New Date :<b style={{color: "red"}}>*</b></span> 
							<input type="text" name="newdate" id="needate" placeholder="dd/mm/yyyy" onChange={this.onNewdateChange}/>
						</label>
					</div>
					<div className="form_input">
						<label>
							<span className="label">Hospital<b style={{color: "red"}}>*</b></span>
							<input type="text" name="hospital" id="hospital" onChange={this.onHospitalChange}/>
						</label>
					</div>
				</div>
				<div className="submit_btn_div">
					<Link to='/Citizen'><button onClick={this.onSubmitALogin} type="submit">Update</button></Link>
				</div>
			</div>
		);
	}
}
export default Reschedule;
