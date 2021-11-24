import React from 'react';
import {Link} from "react-router-dom";
import SearchBox from './SearchBox.js'
import GetSlip from './GetSlip.js'

class Citizen extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			 uid:this.props.citizen.uid,
			 vaclist:[],
			 iculist:[],
			 listLength: 0,
			 list: [],
			 opt:'',
			 bookdate:'',
			 bookhid:0
	       }
	 }

	  componentDidMount(){
		this.getbookvac();
		this.getbookicu();
	  }

         getbookvac=()=>{
           fetch('http://localhost:3001/getbookvac', {
		    method: 'post',
		    headers: {'Content-Type': 'application/json'},
		    body: JSON.stringify({
		    uid: this.props.citizen.uid
             })
          }).then(response => response.json())
         .then(list => {
		  if(list==="Not Available"){ 
		       console.log(list) 
		  }
		  else{
		      console.log(list)
		      this.setState({vaclist:list})
                  }
           })
       }
      getbookicu=()=>{
         fetch('http://localhost:3001/getbookicu', {
                  method: 'post',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                  uid: this.props.citizen.uid
           })
         }).then(response => response.json())
         .then(list => {
         if(list==="Not Available"){
	     console.log(list)
	 }
         else{
            console.log(list)
            this.setState({iculist:list})
          }
        })
      }

      renderVListData(){
            return this.state.vaclist.map((slot, index) => {
                  const { vbid, name, date  } = slot //destructuring
                  return (
			  <tr key={vbid}>
			    <td className = "pr2 br">V{vbid}</td>
			    <td className = "pr2 br">{name}</td>
			    <td className = "pl2">{date}</td>
			  </tr>
                        )
                 })
            }
     renderIListData(){
           return this.state.iculist.map((slot, index) => {
                 const { ibid, name, date  } = slot //destructuring
                 return (
			  <tr key={ibid}>
			    <td className = "pr2 br">I{ibid}</td>
			    <td className = "pr2 br">{name}</td>
			    <td className = "pl2">{date}</td>
			  </tr>
                         )
                 })
           }

    loadList= (list,opt)=>{
        this.setState({
	      listLength: list.length,
	      list: list,
	      opt: opt,
	      bookhid:0,
	      bookdate:''
       })
      console.log(this.state);
   }

   renderVSearchListData(){
        return this.state.list.map((slot, index) => {
              const {name, date, ava, hid  } = slot //destructuring
              return (
                       <tr key={date}>
			  <td className = "pr3">{date}</td>
			  <td className = "pr3">{name}</td>
			  <td className = "pr3">{ava}</td>
			  <td className = "pr3"><input type='radio' name='book' id={hid} value={date} onClick={this.onselect}/></td>
                       </tr>
                      )
              })
        }
   renderISearchListData(){
        return this.state.list.map((slot, index) => {
        const {name, ava, hid  } = slot //destructuring
             return (
                      <tr key={name}>
			  <td className = "pr3">{name}</td>
			  <td className = "pr3">{ava}</td>
			  <td className = "pr3"><input type='radio' name='book' id={hid} value={hid} onClick={this.onselect}/></td>
                      </tr>
                    )
            })
       }

   onselect=(event)=>{
       this.setState({
	      bookhid:event.target.id,
	      bookdate:event.target.value.slice(0,-15)+(parseInt(event.target.value[9])+1)
        })
     console.log(this.state)
   }

   onBookVac=()=>{
       if(this.state.bookhid === 0) {
	   alert("Select Option")
       }
      else{
             fetch('http://localhost:3001/bookvac', {
	        method: 'post',
	        headers: {'Content-Type': 'application/json'},
	        body: JSON.stringify({
                uid: this.props.citizen.uid,
                hid: this.state.bookhid,
                date: this.state.bookdate
           })
       }).then(response => response.json()).then(vbid => {
          if(Number.isInteger(vbid)){
               console.log(vbid)
               alert("Successfully Booked")
               this.setState({bookhid:0, bookdate:''})
               this.componentDidMount();
          }
          else {
	       console.log(vbid)
	  }
        })
      }
  }
  onBookICU=()=>{
      if(this.state.bookhid === 0) {
            alert("Select Option")
      }
      else{
	      fetch('http://localhost:3001/bookicu', {
		    method: 'post',
		    headers: {'Content-Type': 'application/json'},
		    body: JSON.stringify({
	            uid: this.props.citizen.uid,
	            hid: this.state.bookhid
             })
       }).then(response => response.json()).then(ibid => {
            if(Number.isInteger(ibid)){
                 console.log(ibid)
                 alert("Successfully Booked")
                 this.setState({bookhid:0, bookdate:''})
                 this.componentDidMount();
             }
             else {
		     console.log(ibid)
	     }
          })
        }
   }

   render(){
        if(this.props.citizen.islogged === false){
            return(
		     <div>
		       <div className="f4 pt4 pb3">Citizen not Logged In</div>
		       <Link className="f5 black link dim underline" to='/login'>Login here</Link>
		     </div>
                  )
        }
        else{
             return(
		     <div>
			 <div className="br4 ba b--black-10 mv4 w-100 w-80-m w-80-l mw7 shadow-5 center">
			     <h1> Citizen Dashboard</h1>
			     <div className="">
			         <h2 className="tc f4 ml4 mt4">Unique ID: <span className="underline">{this.props.citizen.uid}</span></h2>
			     </div>
			     <div className="">
			         <h2 className="tc f4 ml4 mb2 mt2">Name: {this.props.citizen.name} </h2>
			     </div>
			     <div className="">
			         <h2 className="tr w-40 f4 mr3 mb2 mt1 dib">Age: {this.props.citizen.age} </h2>
			         <h2 className="tl w-40 f4 ml3 mb2 mt1 dib">Gender: {this.props.citizen.gender} </h2>
			     </div>
			     <div className="">
			         <h2 className="tc f4 ml3 mb2 mt1 dib">Address: {this.props.citizen.address} </h2>
			     </div>
			  </div>

                          <div className="br4 ba b--black-10 mv4 w-100 w-80-m w-80-l mw7 shadow-5 center">
                            <h1 className="f3">Previous Bookings</h1>
                            <h3>Vaccination Slots</h3>
                          <div>
                            {
                              this.state.vaclist.length ===0? <div className="mb3">No Booked Vaccine Slots</div>
                              :
                              <div>
                                 <table id='slots' className="center">
                                    <tbody>
                                          <tr>
                                              <th className = "pr2 bb br">Book ID</th>
                                              <th className = "pr2 bb br">Hospital</th>
                                              <th className = "pl2 bb">Date</th>
                                          </tr>
                                          {this.renderVListData()}
                                   </tbody>
                                  </table>
                                  <input className="b mt1 mb3 br-pill ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Reschedule"/>
                               </div>
                              }
                          </div>
                          <div>
                              {
                                 this.state.iculist.length ===0? <br/>
                                 :
                                 <div>
                                      <h3>ICU Beds</h3>
                                      <table id='slots' className="center">
                                         <tbody>
                                            <tr>
                                               <th className = "pr2 bb br">Book ID</th>
                                               <th className = "pr2 bb br">Hospital</th>
                                               <th className = "pl2 bb">Date Booked</th>
                                            </tr>
                                            {this.renderIListData()}
                                        </tbody>
                                     </table>
                                </div>
                              }
                        </div>
                        <div className="mb2">
                           <input className="b mt4 mb3 br-pill ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Get Booking Slip"/>
                        </div>
                    </div>

          <SearchBox loadList={this.loadList}/>

         <div>
              {
                  this.state.opt!=='Vacc'&& this.state.opt!=='ICU'? 
		  <div>
		       {this.state.opt}
                  </div>
                 : this.state.list.length === 0 || this.state.listLength===0?
                  <div className="br3 bg-gray black container">
                      <div className="f4 mt3 mb2">No Nearby Hospitals Found</div>
                      <div className="f5 mb3">Try different pincode</div>
                 </div>
                 : this.state.opt === 'Vacc'?
                 <div>
                      <div className="br4 ba b--black-10 mv4 w-100 w-100-m w-100-l mw7 shadow-5 center">
                          <h1>Book Vaccine Slot</h1>
			      <table id='slots' className="center">
				   <tbody>
					  <tr>
					      <th className = "pr3">Date</th>
					      <th className = "pr3">Hospital</th>
					      <th className = "pr3">Available</th>
					      <th className = "pr3">Select</th>
					  </tr>
					  {this.renderVSearchListData()}
				    </tbody>
			       </table>
                               <input onClick={this.onBookVac} className="b mt2 mb3 br-pill ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Book"/>
                       </div>
                  </div>
                  : this.state.opt === 'ICU'?
                  <div>
                       <div className="br4 ba b--black-10 mv4 w-100 w-100-m w-100-l mw7 shadow-5 center">
                           <h1>Book ICU Bed</h1>
                              <table id='slots' className="center">
                                    <tbody>
                                           <tr>
                                               <th className = "pr3">Hospital</th>
                                               <th className = "pr3">Available</th>
                                           </tr>
                                           {this.renderISearchListData()}
                                     </tbody>
                               </table>
                               <input onClick={this.onBookICU} className="b mt2 mb3 br-pill ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Book"/>
                        </div>
                  </div>
                  : <br/>
               }
         </div>

			{/*<div className="br4 ba b--black-10 mv4 w-100 w-75-m w-75-l mw6 shadow-5 center">
            

                <h3>To Search or Book Vaccine slots/ICU Beds Click on the button given Below</h3>
                <Link to ="/Book"><button>Search/Book Slots/Beds</button></Link>
            </div>*/}

        </div>
		);
	}
  }
}
export default Citizen;
