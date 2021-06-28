import React,{useState,useContext} from 'react'
import  { Firebasecontext } from '../../firebase'
import { Link } from 'react-router-dom'


const Forget = (props) => {


    
    const contextfire = useContext(Firebasecontext)

    const [error, seterror] = useState('')
    const [success, setsuccess] = useState('')
    
    const [email, setemail] = useState('')
    const handlerSubmit = e => {
        e.preventDefault();
        contextfire.auth.sendPasswordResetEmail(email)
             .then( user => {
                seterror('')
                setsuccess(`go to your email ${email} to change your password`)
                setemail('')
                setTimeout(() => {
                    props.history.push('/login')
                }, 3000);
            })
            .catch( error => {
                seterror(error)
                setsuccess('')
            }) 
        }

    const verify = email === ""
        
    const successStyle = {
        backgroung: "green",
        color:"white",
        border: "1px solid green"
    }

    const errormsg = error !== '' && <span>{error.message} </span>
    
    const displaySuccess = success && <span style={successStyle}>{success} </span>

    return (
        
        <div className='signUpLoginBox'>
            <div className='slContainer'>
                <div className='formBoxLeftForget'>    
                </div>
                <div className='formBoxRight'>
                    <div className='formContent'>
                        <form onSubmit={handlerSubmit}>
                            {errormsg}
                            {displaySuccess}
                            <h2>Forget Password? </h2>
                            <div className='inputBox'>
                                <input value={email} onChange={(e)=>{setemail(e.target.value)}} type='email' id='email' autoComplete='off' required></input>
                                <label htmlFor='email'>Email</label>
                            </div>
                            <button disabled = {verify}>Change</button>
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
export default Forget
