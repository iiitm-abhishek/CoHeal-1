import React from 'react';

class RemoveHospital extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			hid: 0,
			confirm:false,
			hospital:{
				hid: '',
				name: '',
				address: '',
				pincode: '',
			}
		}
	}
	onHIDChange = (event) =>{this.setState({hid: event.target.value})}

	onSubmitHRemove = (event)=>{
		fetch('http://localhost:3001/hconfirm', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				hid: this.state.hid
			})
		}).then(response => response.json())
		.then(hospital => {
			if(!(hospital.hid)){
				alert(hospital);
				console.log(hospital);
			}
			else{
				this.setState({
					hospital:{
						hid: hospital.hid,
						name: hospital.name,
						address: hospital.address,
						pincode: hospital.pincode
					},
					confirm:true
				});
			}
		})
		console.log(this.state)
	}
	onSubmitHDelete = (event)=>{
		fetch('http://localhost:3001/hdelete', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				hid: this.state.hospital.hid
			})
		}).then(response => response.json())
		.then(hospital => {
			if(!(hospital==="Deleted")){
				alert(hospital);
				this.props.togglebtn('')
				console.log(hospital);
			}
			else{
				alert("Deleted Successfully");
				this.props.togglebtn('')
				console.log(hospital);
			}
		})
		console.log(this.state)
	}

	render(){
		
		return(
			<div>
			{
			    this.state.confirm ?
				 <div>
				      <div className="container">
				          <b className="page_title">Confirm Delete</b>
				           <div className="form">
						<div className="form_input">
						     <span className="label">Hospital name: <b style={{color: "blue"}}>{this.state.hospital.name}</b></span><br/>
						     <span className="label">Address: <b style={{color: "blue"}}>{this.state.hospital.address}</b></span><br/>
						     <span className="label">Pincode: <b style={{color: "blue"}}>{this.state.hospital.pincode}</b></span> <br/>
					        </div>
					    </div>
					    <div className="submit_btn_div">
						  <button type="submit" className="bt mr5 danger" onClick={this.onSubmitHDelete}>Delete</button>
						  <button type="submit" className="bt ml5" onClick={this.props.togglebtn}>Cancel</button>
				            </div>
					</div>
				  </div>
				:
				  <div className="container">
				      <b className="page_title">Remove Hospital</b>
				      <div className="form">
				          <div className="form_input">
					       <label>
						      <span className="label">Hospital ID:<b style={{color: "red"}}>*</b></span> 
						      <input type="number" name="hid" id="hid" placeholder="XXXXXXXX" onChange={this.onHIDChange}/>
					       </label>
				          </div>
				      </div>
				      <div className="submit_btn_div">
					     <button type="submit" className="bt mr5" onClick={this.onSubmitHRemove}>Remove Hospital</button>
					     <button type="submit" className="bt ml5" onClick={this.props.togglebtn}>Cancel</button>
				       </div>
				 </div>
			}
		     </div>
		);
	}
}
export default RemoveHospital;
