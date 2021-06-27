import React from 'react';
import '../../App.css';
import Header from '../header';
import Landing from '../landing'
import Footer from '../footer'
import Login from '../login'
import Welcome from '../welcome'
import SignUp from '../signup'
import Error from '../errorPage'
import {Route,Switch,BrowserRouter} from 'react-router-dom'

const App = () => {
    return (
			<BrowserRouter>
				<Header/>
				<Switch>
					<Route exact path="/" component ={Landing}/> 
					<Route path="/login" component ={Login}/> 
					<Route path="/signup" component ={SignUp}/> 
					<Route path="/welcome" component ={Welcome}/>
					<Route component ={Error}/>
				</Switch>
				<Footer/>
			</BrowserRouter>
    );
}

export default App;
