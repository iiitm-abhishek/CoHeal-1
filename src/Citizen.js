import React from 'react';
import {Link} from 'react-router-dom';

class Citizen extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			hid: 0,
			password: ''
		}
	}


    
	

	render(){
		
		return(
			<div className="br4 ba b--black-10 mv4 w-100 w-75-m w-75-l mw6 shadow-5 center">
            <h1> Citizen Dashboard</h1>
            <h2> Booking Details </h2>
            <table className ="center">
                <thead>
                    <tr>
                        <th className = "mr3 pr3">SNo</th>
                        <th className = "mr3 ">Slot/Bed </th>
                        <th className = "mr3 ">Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className = "mr3 pr3"></td>
                        <td className = "mr3 pr3"></td>
                        <td className = "mr3 pr3"></td>
                        <td className = "mr3 pr3"><Link to="/Reschedule"><button>Reschedule</button> </Link></td>
                    </tr>
                    <tr>
                        <td className = "mr3 p3"></td>
                        <td className = "mr3 pr3"></td>
                        <td className = "mr3 pr3"></td>
                        <td className = "mr3 pr3"><Link to="/Reschedule"><button>Reschedule</button> </Link></td>
                    </tr>
                    <tr>
                        <td className = "mr3 pr3"></td>
                        <td className = "mr3 pr3"></td>
                        <td className = "mr3 pr3"></td>
                        <td className = "mr3 pr3"><Link to="/Reschedule"><button>Reschedule</button> </Link></td>
                    </tr>
                </tbody>
                </table>

                <h3>To Search or Book Vaccine slots/ICU Beds Click on the button given Below</h3>
                <Link to ="/Book"><button>Search/Book Slots/Beds</button></Link>
            </div>
		);
	}
}
export default Citizen;
