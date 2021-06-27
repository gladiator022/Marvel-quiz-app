import React,{useState,useContext} from 'react'
import  { Firebasecontext } from '../../firebase'
import { Link } from 'react-router-dom'

const data = {
    email:'',
    password:''
}

const Login = (props) => {


    
    const contextfire = useContext(Firebasecontext)
    const [error, seterror] = useState('')
    
    const [LoginData, setLoginData] = useState(data)

    const {email,password} = LoginData;

    
    const handlerSubmit = e => {
        e.preventDefault();
        contextfire.LoginUser(email,password)
             .then( user => {
                setLoginData({...data})
                props.history.push('/welcome')
            })
            .catch( error => {
                seterror(error)
                setLoginData({...data})
            }) 
        }
    

    const handleEmail = e =>{
        setLoginData({...LoginData, [e.target.id]: e.target.value})
    }
    const handlePassword = e =>{
        setLoginData({...LoginData, [e.target.id]: e.target.value})
    }

    const verify = (email === ""  || password === "") ?(
        <button disabled>Login</button>
    ):(
        <button >Login</button>
    ) 

    const errormsg = error !== '' && <span>{error.message} </span>
    


    return (
        
        <div className='signUpLoginBox'>
            <div className='slContainer'>
                <div className='formBoxLeftSignup'>    
                </div>
                <div className='formBoxRight'>
                    <div className='formContent'>
                        <form onSubmit={handlerSubmit}>
                            {errormsg}
                            <h2>Login</h2>
                            <div className='inputBox'>
                                <input value={email} onChange={handleEmail} type='email' id='email' autoComplete='off' required></input>
                                <label htmlFor='email'>Email</label>
                            </div>
                            <div className='inputBox'>
                                <input value={password} onChange={handlePassword} type='Password' id='password ' autoComplete='off' required></input>
                                <label htmlFor='Password'>Password</label>
                            </div>
                            {verify}
                        </form>
                        <div className="linkContainer">
                            <Link to="/login" className="simpleLink">New on Marvel? Sign Up Now</Link>
                        </div>
                    </div>

                </div>
            </div>
            
        </div>
    )

 }
export default Login
