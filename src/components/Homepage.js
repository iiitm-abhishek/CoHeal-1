import React ,{Component} from 'react';
import Banner from './Banner';
import SearchBox from './SearchBox';
//import SearchList from './SearchList';


class HomePage extends Component {   /* Homepage class Components */
     constructor(){
            super()
            this.state ={
                 listLength: 0,
                 list: [],
                 opt:''
           }
   }

   loadList= (list,opt)=>{
         this.setState({
             listLength: list.length,
             list: list,
             opt: opt
        })
      console.log(this.state);
  }

   renderVListData(){   /* render the vaccine data */
      return this.state.list.map((slot, index) => {
      const {name, date, ava  } = slot //destructuring
           return (
                    <tr key={date}>
                       <td className = "pr3">{date}</td>
                       <td className = "pr3">{name}</td>
                       <td className = "pr3">{ava}</td>
                    </tr>
                   )
             })
   }
   renderIListData(){   /* render the ICU data */
      return this.state.list.map((slot, index) => {
      const {name, ava  } = slot //destructuring
            return (
                     <tr key={name}>
                         <td className = "pr3">{name}</td>
                         <td className = "pr3">{ava}</td>
                     </tr>
                   )
            })
   }
  

   render(){
           return (
                  <div>
                        <Banner/>
                        <SearchBox loadList={this.loadList}/>
                    
                    <div>
                         {
                           this.state.opt!=='Vacc'&& this.state.opt!=='ICU'? 
                               <div>{
                                     this.state.opt
                                    }
                               </div>
                           : this.state.list.length === 0 || this.state.listLength===0?
                                  <div className="br3 bg-gray black container">
                                      <div className="f4 mt3 mb2">No Nearby Hospitals Found</div>
                                      <div className="f5 mb3">Try different pincode</div>
                                  </div>
                           : this.state.opt === 'Vacc'?
                                 <div>
                                     <div className="br4 ba b--black-10 mv4 w-100 w-100-m w-100-l mw7 shadow-5 center">
                                         <h1>Available Vaccine Slots</h1>
                                         <table id='slots' className="center">
                                               <tbody>
                                                      <tr>
                                                          <th className = "pr3">Date</th>
                                                          <th className = "pr3">Hospital</th>
                                                          <th className = "pr3">Available</th>
                                                      </tr>
                                                      {/*<tr>{this.renderListHeader()}</tr>*/}
                                                      {this.renderVListData()}
                                                </tbody>
                                          </table>
                                      </div>
                                 </div>
                           : this.state.opt === 'ICU'?
                                 <div>
                                     <div className="br4 ba b--black-10 mv4 w-100 w-100-m w-100-l mw7 shadow-5 center">
                                         <h1>Available ICU Beds</h1>
                                         <table id='slots' className="center">
                                               <tbody>
                                                       <tr>
                                                           <th className = "pr3">Hospital</th>
                                                           <th className = "pr3">Available</th>
                                                       </tr>
                                                       {/*<tr>{this.renderListHeader()}</tr>*/}
                                                       {this.renderIListData()}
                                                </tbody>
                                          </table>
                                       </div>
                                   </div>
                             : <br/>
                           }
                     </div>
                 </div>
              );
      } 
}
export default HomePage;
