import React from 'react';
import HomePage from './Components/Homepage';
import Login from './Components/Login';
import HLogin from './Components/HLogin';
import ALogin from './Components/ALogin';
import Register from './Components/Register'
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import logo from './logo192.png';
import './App.css';

class App extends React.Component {
  constructor(){
    super();
    this.state={
      currentRoute: window.location.pathname
    }
  }
  onRouteChange = (route) =>{
    this.setState({currentRoute: route});
  }

  render(){
    return(
      <div>
        <Router>
          <div>
            <nav className='dt w-100 border-box pa2 ph5-ns'>
              <Link to="/" onClick={() => this.onRouteChange('/')}><img className='dtc v-mid link pa2 pointer grow w-50' style={{ height: 50, width: 50 }} alt='logo 'src={logo}/> </Link>
              <div className='dtc v-mid w-75 tr'>
                {
                  this.state.currentRoute !== '/'? <Link to="/" onClick={() => this.onRouteChange('/')}> <p className='link grow dim black underline f4-ns dib f7 mr1 mr3-ns pointer'>Home</p></Link>
                  : <span/>
                }{
                  this.state.currentRoute !== '/Login'? <Link to="/Login" onClick={() => this.onRouteChange('/Login')}> <p className='link grow dim black underline f4-ns dib f7 mr1 mr3-ns pointer'>Login</p></Link>
                  : <span/>
                }{
                  this.state.currentRoute !== '/Register'? <Link to="/Register" onClick={() => this.onRouteChange('/Register')}> <p className='link grow dim black underline f4-ns dib f7 mr1 mr3-ns pointer'>Register</p></Link>
                  : <span/>
                }{
                  this.state.currentRoute !== '/HLogin'? <Link to="/HLogin" onClick={() => this.onRouteChange('/HLogin')}> <p className='link grow dim black underline f4-ns dib f7 mr1 mr3-ns pointer'>Hospital Login</p></Link>
                  : <span/>
                }{
                  this.state.currentRoute !== '/ALogin'? <Link to="/ALogin" onClick={() => this.onRouteChange('/ALogin')}> <p className='link grow dim black underline f7 f4-ns dib pointer'>Admin Login</p></Link>
                  : <span/>
                }
              </div>
              
            </nav>
            <div>
              <Routes>
                <Route exact path="/" element = {<HomePage/>}></Route>
                <Route exact path="/Login" element = {<Login/>}></Route>
                <Route path="/Register" element = {<Register />}></Route>
                <Route path="/HLogin" element = {<HLogin/>}></Route>
                <Route path="/ALogin" element = {<ALogin/>}></Route>
              </Routes>
            </div>

          </div>
        </Router>
      </div>
     
    );
  }
}
/*<button onClick={handleClick}>Search Vaccine/ICU bed</button>*/
export default App;