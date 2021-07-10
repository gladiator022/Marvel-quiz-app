import React,{useState,useContext,useEffect,Fragment} from 'react'
import  { Firebasecontext } from '../../firebase'
import { Link } from 'react-router-dom'

const data = {
    pseudo:'',
    email:'',
    password1:'',
    password2:''

}

const SignUp = (props) => {


    
    const contextfire = useContext(Firebasecontext)
    const [error, seterror] = useState('')
    const [userSession, setuserSession] = useState('')
    const [LoginData, setLoginData] = useState(data)

    const {pseudo,email,password1,password2} = LoginData;

    
    const handlerSubmit = e => {
        e.preventDefault();
        contextfire.SignUser(email,password1)
            .then(authUser =>{
                return contextfire.user(authUser.user.uid).set({
                    pseudo,
                    email
                })
            })
             .then( user => {
                setLoginData({...data})
                props.history.push('/welcome')
            })
            .catch( error => {
                seterror(error)
                setLoginData({...data})
            }) 
        }

    const handleChange = e =>{
        setLoginData({...LoginData, [e.target.id]: e.target.value})
    }
    
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

    const verify = ((pseudo === "" || email === ""  || password1 === ""|| password2 === "") || (password1!== password2) )?(
        <button disabled>Sign Up</button>
    ):(
        <button >Sign Up</button>
    ) 

    const errormsg = error !== '' && <span>{error.message} </span>
    


    return  userSession !== null? (
        <Fragment>
            <div className='loader'></div>
            <p className='loaderText'>loading.......</p>
        </Fragment>
    ):(
        <div className='signUpLoginBox'>
            <div className='slContainer'>
                <div className='formBoxLeftSignup'>    
                </div>
                <div className='formBoxRight'>
                    <div className='formContent'>
                        <form onSubmit={handlerSubmit}>
                            {errormsg}
                            <h2>Sign Up</h2>
                            <div className='inputBox'>
                                <input value={pseudo} onChange={handleChange} type='text' id='pseudo' autoComplete='off' required></input>
                                <label htmlFor='pseudo'>Pseudo</label>
                            </div>
                            <div className='inputBox'>
                                <input value={email} onChange={handleChange} type='email' id='email' autoComplete='off' required></input>
                                <label htmlFor='email'>Email</label>
                            </div>
                            <div className='inputBox'>
                                <input value={password1} onChange={handleChange} type='Password' id='password1' autoComplete='off' required></input>
                                <label htmlFor='Password'>Password</label>
                            </div>
                            <div className='inputBox'>
                                <input value={password2} onChange={handleChange} type='Password' id='password2' autoComplete='off' required></input>
                                <label htmlFor='confirmPassword'>Confirm password</label>
                            </div>
                            {verify}
                        </form>
                        <div className="linkContainer">
                            <Link to="/login" className="simpleLink">Already a member? Login here</Link>
                        </div>
                    </div>

                </div>
            </div>
            
        </div>
    )
        
        

 }
export default SignUp
