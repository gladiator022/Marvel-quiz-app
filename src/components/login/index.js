import React,{useState,useContext,useEffect,Fragment} from 'react'
import  { Firebasecontext } from '../../firebase'
import { Link } from 'react-router-dom'

const data = {
    email:'',
    password:''
}

const Login = (props) => {


    
    const contextfire = useContext(Firebasecontext)
    const [error, seterror] = useState('')
    const [userSession, setuserSession] = useState('')
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

    const verify = (email === ""  || password === "") ?(
        <button disabled>Login</button>
    ):(
        <button >Login</button>
    ) 

    const errormsg = error !== '' && <span>{error.message} </span>
    
    useEffect(() => {
        let listener = contextfire.auth.onAuthStateChanged(user =>{
                if(user) { 
                    props.history.push('/welcome')
                }else setuserSession(null)
            } )
            return () => {
                listener()
            }
    }, [userSession])

    return  userSession !== null? (
        <Fragment>
            <div className='loader'></div>
            <p className='loaderText'>loading.......</p>
        </Fragment>
    ):(
        <div className='signUpLoginBox'>
            <div className='slContainer'>
                <div className='formBoxLeftLogin'>    
                </div>
                <div className='formBoxRight'>
                    <div className='formContent'>
                        <form onSubmit={handlerSubmit}>
                            {errormsg}
                            <h2>Login</h2>
                            <div className='inputBox'>
                                <input value={email} onChange={(e)=>{setLoginData({...LoginData,email:e.target.value})}} type='email' id='email' autoComplete='off' required></input>
                                <label htmlFor='email'>Email</label>
                            </div>
                            <div className='inputBox'>
                                <input value={password} onChange={(e)=>{setLoginData({...LoginData,password:e.target.value})}} type='Password' id='password ' autoComplete='off' required></input>
                                <label htmlFor='Password'>Password</label>
                            </div>
                            {verify}
                        </form>
                        <div className="linkContainer">
                            <Link to="/signup" className="simpleLink">New on Marvel? Sign Up Now</Link>
                        </div>
                    </div>

                </div>
            </div>
            
        </div>
    )
        

 }
export default Login
