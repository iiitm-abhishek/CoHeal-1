import React from 'react';
import {Link} from 'react-router-dom';

class Register extends React.Component {   /* Register class component */
	constructor(props){
		super(props);
		this.state ={
			showlink:false,
			name: '',
			uid: 0,
			age: 0,
			gender: '',
			phno: 0,
			address: '',
			email: '',
			password: '',
		}
	}
	onNameChange = (event) =>{this.setState({name: event.target.value})}
	onUIDChange = (event) =>{this.setState({uid: event.target.value})}
	onAgeChange = (event) =>{this.setState({age: event.target.value})}
	onGenderChange = (event) =>{this.setState({gender: event.target.value})}
	onNumberChange = (event) =>{this.setState({phno: event.target.value})}
	onAddressChange = (event) =>{this.setState({address: event.target.value})}
	onEmailChange = (event) =>{this.setState({email: event.target.value})}
	onPasswordChange = (event) =>{this.setState({password: event.target.value})}

	onSubmitRegister = ()=>{               
		fetch('http://localhost:3001/cregister', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.name,
				uid: this.state.uid,
				age: this.state.age,
				gender: this.state.gender,
				phno: this.state.phno,
				address: this.state.address,
				email: this.state.email,
				password: this.state.password,
			})
		}).then(response => response.json())
		.then(citizen => {
			if(!(citizen[0].uid)){
				alert(citizen);
				console.log(citizen);
			}
			else{
				this.props.loadCitizen(citizen);
				this.setState({showlink:true})
			}
		})
		console.log(this.state)
	}
	render(){
		return(
			<div>
			      {
				 this.state.showlink? /* if logged in, show success message */
				      <div>
					    <h2>Registered Successfully</h2>
					    <Link to='/Citizen' className="f4 blue link dim grow">Go to Citizen Dashoard</Link>
				      </div>
				  :  /* if not logged in, show register form */
				      <div className="container">
					   <b className="page_title">Register</b>
						<div className="form">
						     <div className="form_input">
							  <label>
								  <span className="label"> Name<b style={{color: "red"}}>*</b>:</span>
								  <input type="text" name="name" id="name" onChange={this.onNameChange} />
							   </label>
						       </div>
						       <div className="form_input">
							    <label>
								    <span className="label">UID<b style={{color: "red"}}>*</b>:</span>
								    <input type="number" name="uid" id="uid" placeholder="XXXXXXXXXXXX" onChange={this.onUIDChange} />
							     </label>
							</div>
							<div className="form_input">
							     <label>
								    <span  className="label"> Age<b style={{color: "red"}}>*</b>:</span>
								    <input type="number" name="age" id="age" onChange={this.onAgeChange} />
							     </label>
							</div>
							<div className="form_input">
							     <label>
								    <span className="label"> Gender<b style={{color: "red"}}>*</b>:</span>
								    <select id="gender" name="gender" defaultValue="" onChange={this.onGenderChange}>
									<option disabled value="">Select Option</option>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
									<option value="Other">Other</option>
								     </select>
							      </label>
							 </div>
							 <div className="form_input">
							      <label>
								     <span className="label"> Address<b style={{color: "red"}}>*</b>:</span>
								     <textarea style={{ resize: 'none' }} id="address" name="address" onChange={this.onAddressChange}></textarea>
							      </label>
							 </div>
							 <div className="form_input">
							      <label>
								     <span className="label"> Phone Number: </span>
								     <input type="number" step="0" name="number" id="number" onChange={this.onNumberChange} />
							      </label>
							 </div>
							 <div className="form_input">
							      <label>
								     <span className="label"> Email: </span>
								     <input type="email" name="email-address" id="email-address" onChange={this.onEmailChange} />
							      </label>
							 </div>
							 <div className="form_input">
							      <label>
								     <span className="label"> Password<b style={{color: "red"}}>*</b>:</span>
								     <input type="password" name="password" id="password" onChange={this.onPasswordChange} />
							      </label>
							 </div>
							 <center className="f5"><b style={{color: "red"}}>*</b> <strong style={{color: "purple"}}>represents required field</strong></center>
						 </div>
						 <div className="submit_btn_div">
						      <button onClick={this.onSubmitRegister} type="submit">Register</button>
						 </div>
						 <div className="f5 pt2">
						      <b>Already Registered ?</b>
						      <Link to="/Login" onClick={() => this.props.onRouteChange('/Login')}>
						      	<p className='link grow black dim underline dib pointer'>Login</p>
						      </Link>
						</div>
				       </div>
				}
			</div>
		);
	}
}
export default Register;
