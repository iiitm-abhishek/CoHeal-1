import React from 'react';
import {Link} from 'react-router-dom';

class AddHospital extends React.Component {    /* AddHospital class component */
	constructor(props){
		super(props);
		this.state ={
			hid: 0,
			name:'',
			address:'',
			pin: 0,
			phno:0,
			password:''
		}
	}
	onHIDChange = (event) =>{this.setState({hid: event.target.value})}
	onNameChange = (event) =>{this.setState({name: event.target.value})}
	onAddressChange = (event) =>{this.setState({address: event.target.value})}
	onPinCodeChange = (event) =>{this.setState({pin: event.target.value})}
	onContactChange = (event) =>{this.setState({phno: event.target.value})}
	onPasswordChange = (event) =>{this.setState({password: event.target.value})}

    
	onSubmitHRegister = (event)=>{
		fetch('http://localhost:3001/hregister', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				hid: this.state.hid,
				pincode: this.state.pin,
				name: this.state.name,
				address: this.state.address,
				phno: this.state.phno,
				password: this.state.password
			})
		}).then(response => response.json())
		.then(hospital => {
			if(!(hospital[0].hid)){
				alert(hospital);                
				console.log(hospital);
			}
			else{
				alert("Registered Successfully");       /* registration success message */
				this.props.togglebtn('')
				console.log(hospital);
			}
		})
		console.log(this.state)
	}

	render(){
		
		return(
			<div className="container">
				<b className="page_title">Register Hospital</b>
				<div className="form">
				  <div className="form_input">
						<label>
							<span className="label">Hospital ID:<b style={{color: "red"}}>*</b></span> 
							<input type="number" name="hid" id="hid" placeholder="XXXXXXXX" onChange={this.onHIDChange}/>
						</label>
					</div>
					<div className="form_input">
						<label>
							<span className="label">Hospital Name:<b style={{color: "red"}}>*</b></span> 
							<input type="text" name="name" id="name" onChange={this.onNameChange}/>
						</label>
					</div>
					<div className="form_input">
						<label>
							<span className="label">Address:<b style={{color: "red"}}>*</b></span> 
							<textarea style={{ resize: 'none' }} id="address" name="address" onChange={this.onAddressChange}></textarea>
						</label>
					</div>
					<div className="form_input">
						<label>
							<span className="label">PinCode:<b style={{color: "red"}}>*</b></span>
							<input type="pin" name="pin" id="XXXXXX" onChange={this.onPinCodeChange}/>
						</label>
					</div>
					<div className="form_input">
						<label>
							<span className="label">Contact No. - :<b style={{color: "red"}}>*</b></span> 
							<input type="number" name="phno" id="phno" onChange={this.onContactChange}/>
						</label>
					</div>
					<div className="form_input">
						<label>
							<span className="label"> Password:<b style={{color: "red"}}>*</b></span>
							<input type="password" name="password" id="password" onChange={this.onPasswordChange} />
						</label>
					</div>
				</div>
				<div className="submit_btn_div">
					<button type="submit" className="bt mr5" onClick={this.onSubmitHRegister}>Add Hospital</button>
					<button type="submit" className="bt ml5" onClick={this.props.togglebtn}>Cancel</button>
				</div>
			</div>

		);
	}
}
export default AddHospital;
