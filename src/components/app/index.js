import React from 'react';
import '../../App.css';
import Header from '../header';
import Landing from '../landing'
import Footer from '../footer'
import Login from '../login'
import Welcome from '../welcome'
import SignUp from '../signup'
import Error from '../errorPage'
import Forget from '../forget_password';
import {Route,Switch,BrowserRouter} from 'react-router-dom'
import {IconContext} from 'react-icons'

const App = () => {
    return (
			<BrowserRouter>
			<IconContext.Provider value={{style:{verticalAlign:'middle'}}}>
				<Header/>
				<Switch>
					<Route exact path="/" component ={Landing}/> 
					<Route path="/login" component ={Login}/> 
					<Route path="/signup" component ={SignUp}/> 
					<Route path="/welcome" component ={Welcome}/>
					<Route path="/forgetpassword" component ={Forget}/>
					<Route component ={Error}/>
				</Switch>
				<Footer/>
			</IconContext.Provider>
			</BrowserRouter>
    );
}

export default App;
