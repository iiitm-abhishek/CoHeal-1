import React from 'react';
import {Link} from "react-router-dom";

class Login extends React.Component {  /*Login class components */
	constructor(props){
		super(props);
		this.state ={
			showlink:false,
			uid: 0,
			password: '',
		}
	}
	onUIDChange = (event) =>{this.setState({uid: event.target.value})}
	onPasswordChange = (event) =>{this.setState({password: event.target.value})}

	onSubmitLogin = ()=>{
		fetch('http://localhost:3001/login', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				uid: this.state.uid,
				password: this.state.password,
			})
		}).then(response => response.json())
		.then(citizen => {
			if(!(citizen.uid)){
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
					  <h2>Logged in Successfully</h2>
					  <Link to='/Citizen' className="f4 blue link dim grow">Go to Citizen Dashoard</Link>
				    </div>
				 : /* if not logged in, show login form */
				    <div className="container">
					<b className="page_title">Login </b>
				           <div className="form">
			                        <div className="form_input">
						    <label>
							    <span className="label">UID<b style={{color: "red"}}>*</b>:</span> 
					                    <input type="number" name="uid" id="uid" placeholder="XXXXXXXXXXXX" onChange={this.onUIDChange}/>
						    </label>
						 </div>
						 <div className="form_input">
						      <label>
							     <span className="label">Password<b style={{color: "red"}}>*</b>:</span>
							     <input type="password" name="password" id="password" onChange={this.onPasswordChange}/>
						      </label>
						  </div>
					     </div>
					     <div className="submit_btn_div">
					     	 <button onClick={this.onSubmitLogin} type="submit">Login</button>
					     </div>
					     <div className="f5 pt2">
						  <b> New User?</b>
						  <Link to="/Register" onClick={() => this.props.onRouteChange('/Register')}> <p className='link black dim underline dib pointer'>Register Here</p></Link>
					      </div>
				    </div>
				 }
			  </div>	
		    );
	  }
}

export default Login;
