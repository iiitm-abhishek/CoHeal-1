import React from 'react';
import {Link} from 'react-router-dom'
import '../App.css';
class Hospital extends React.Component {
	constructor(props){
		super(props);
		this.state ={
		      vaclist:[],
		      icuava:0,
		      updlist:[],
		      newdate:'',
		      newava:0,
		      newicu:0
		}
		console.log(this.props)    /*console.log() is used for debugging purpose */
		console.log(this.state);
	}

	componentDidMount(){
		this.getvacava();
		this.geticuava();
	}

	getvacava=()=>{                                /* function to get the avilable vaccines */
		fetch('http://localhost:3001/getvacava', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				hid: this.props.hospital.hid
			})
		}).then(response => response.json())
		.then(list => {
			if(list==="Not Available"){ console.log(list) }
			else{
				this.setState({
					vaclist:list,
					updlist:list
				})
			}
		})
	}
	geticuava=()=>{                                    /* function to get the avilable ICU's */
		fetch('http://localhost:3001/geticuava', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				hid: this.props.hospital.hid
			})
		}).then(response => response.json())
		.then(list => {
			if(list==="Not Available"){
			    console.log(list) 
			}
			else{
				this.setState({
					icuava:list[0].ava
				})
			}
		})
	}

	renderVListData(){             /* this function will render the vaccine data avilable */
             return this.state.vaclist.map((slot, index) => {
             const { date, ava  } = slot //destructuring
                  return (
                          <tr key={date}>
                             <td className = "pr2 br">{date}</td>    
                             <td className = "pl2">{ava}</td>
                          </tr>
                         )
                 })
       }

       renderVFormData(){            
              return this.state.updlist.map((slot, index) => {
              const { date, ava  } = slot //destructuring
                   return (
      	                   <div key={date} className="flex items-center mt3">
      		               <label className="tr w-50 db fw6 lh-copy f6" htmlFor="ava">{date}</label>
      		               <input  className="pa2 br-pill input-reset ba bg-transparent hover-bg-black hover-white w-50 ml3"  type="number"  name="slot" defaultValue={ava} id={date} onChange={this.onSlotChange}/>
      	                    </div>
                          )
                 })
      }

      onSlotChange=(event)=>{   /* function to change the slots */
  	 this.setState({
  		newdate:event.target.id.slice(0,-15)+(parseInt(event.target.id[9])+1),
  		newava:event.target.value
  	 });
  	 console.log(this.state.newdate, this.state.newava);
  	 this.onAddNew();
  	 this.componentDidMount();
    }
    onDateChange=(event)=>{this.setState({newdate:event.target.value})}
    onAvaChange=(event)=>{this.setState({newava:event.target.value})}
    onUpdate=()=>{this.componentDidMount();}
    onBedChange=(event)=>{this.setState({newicu:event.target.value})}

    onAddNew=()=>{
  	 fetch('http://localhost:3001/updatevacava', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				hid: this.props.hospital.hid,
				date: this.state.newdate,
				ava: this.state.newava
			})
		}).then(response => response.json())
		.then(list => {
			console.log(list)
			this.componentDidMount();
		})
   }

   onUpdICU=()=>{                       
   	 fetch('http://localhost:3001/updateicuava', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				hid: this.props.hospital.hid,
				ava: this.state.newicu
			})
		}).then(response => response.json())
		.then(list => {
			console.log(list)
			this.componentDidMount();
		})
   }
	
	
   render(){
	     if(this.props.hospital.islogged === false){
		 return(    /* if not logged in, show the message*/
		         <div>
			       <div className="f4 pt4 pb3">Hospital not Logged In</div>
			       <Link className="f5 black link dim underline" to='/Hlogin'>Login here</Link>
			 </div>
			)
		}
		else{
		      return( /* if logged in, show all details avilable */
			      <div>
				   <div className="br4 ba b--black-10 mv4 w-100 w-80-m w-80-l mw7 shadow-5 center">
				           <h1> Hospital Dashboard</h1>
					   <h2 className="f3 mb2 mt4"> {this.props.hospital.name} </h2>
					   <h3 className="f5 mt0 mb4"> {this.props.hospital.address},  {this.props.hospital.pincode}</h3>
					   <div>
						{
						   this.state.vaclist.length ===0? <div>No Available Vaccine Slots</div>
						   :
						   <table id='slots' className="center">
							 <tbody>
					        		 <tr>
								      <th className = "pr2 bb br">Date</th>
								      <th className = "pl2 bb">Available Vaccine Slots</th>
								  </tr>
								  {this.renderVListData()}
							  </tbody>
						   </table>
						}
					    </div>
					    <h4 className = "centre mt4">Available Icu Beds  -  {this.state.icuava}</h4>
				     </div>
				     <div>
					  <article className="center br4 ba b--black-10 mv4 w-100 w-75-m w-75-l mw6 shadow-5 " >
					      <main className="pa4 black-80">
						<div className="measure left">
						    <fieldset id="sign_up" className="ba b--transparent ph0 mh0 ">
						       <legend className="f2 fw6 ph0 mh0">Update Vaccine slots</legend>
	                                                  {this.renderVFormData()}
	                                                  <div className="flex items-center mt3">
				      		               <inputclassName="tr br-pill input-reset ba bg-transparent hover-bg-black hover-white w-50" type="date" defaultValue={this.state.newdate} onChange={this.onDateCha/>
				      		               <input className="pa2 br-pill input-reset ba bg-transparent hover-bg-black hover-white w-20 ml2" type="number" name="slot"  id="slot"defaultValue="0"onChange={this.onAvaChange}/>
				      		               <input  onClick={this.onAddNew} className="b ml3 br-pill ph3 w-20 pv2 input-reset ba bg-transparent pointer f6 dib"  type="submit"  value="Add New"/>
				      	                 </div>
						     </fieldset>
						     <div className="">
							   <input  onClick={this.onUpdate} className="b ml2 br-pill ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Update"/>
						     </div>
						  </div>
					       </main>
				           </article>

				           <article className="center br4 ba b--black-10 mv4 w-100 w-75-m w-75-l mw6 shadow-5 " >
					       <main className="pa4 black-80">
						  <div className="measure left">
						      <fieldset id="sign_up" className="ba b--transparent ph0 mh0 ">
							 <legend className="f2 fw6 ph0 mh0">Update ICU Beds</legend>
							     <div className="flex items-center mt3">
								 <label className="tr w-25 db fw6 lh-copy f6" htmlFor="hname">Available Beds</label>
								     <input className="pa2 br-pill input-reset ba bg-transparent hover-bg-black hover-white w-75 ml3" type="number" name="beds"  id="beds"defaultValue={this.state.icuava}onChange={this.onBedChange}/>
							     </div>
							</fieldset>
							<div className="">
							      <input  onClick={this.onUpdICU} className="b br-pill ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Update"/>
							</div>
						  </div>
					       </main>
				          </article>
				     </div>
			      </div>
			);
		}
	}
}
export default Hospital;
