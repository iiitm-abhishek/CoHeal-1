import React from 'react';
import {Link} from 'react-router-dom';
import AddHospital from './AddHospital';
import RemoveHospital from './RemoveHospital';
import '../App.css';
class Admin extends React.Component {              /* Admin class component */
	constructor(props){
		super(props);
		this.state ={
			aid: props.admin.aid,
			toggle: ''
		}
	}

	togglebtn=(value)=>{
		this.setState({toggle: value})
	}
	
	render(){
		if(this.props.admin.islogged === false){
			return(   /*  if admin is not logged in, show this div */
				<div>
					<div className="f4 pt4 pb3">Admin not Logged In</div>
					<Link className="f5 black link dim underline" to='/Alogin'>Login here</Link>
				</div>
			)
		}
		else{
			return(  /* if admin logged in , show this div */
				<div>
					<div className="container">
						<h1 className='page_title center'> Admin {this.state.aid} Dashboard</h1>
						<h2> Register or Remove Hospitals</h2>
						<button className="submit_btn_div mr3" onClick={() => this.togglebtn('add')}>Register Hospital</button>
						<button className="submit_btn_div ml3" onClick={() => this.togglebtn('rem')}>Remove Hospital</button>
					</div>

					{
						this.state.toggle === 'add'?  <AddHospital togglebtn={this.togglebtn}/>
						:
							this.state.toggle === 'rem'? <RemoveHospital togglebtn={this.togglebtn}/>
							:
								<br/>

					}


				</div>
			);
		}
	}
}
export default Admin;
