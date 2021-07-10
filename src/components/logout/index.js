import React,{useState,useContext} from 'react'
import  { Firebasecontext } from '../../firebase'
import ReactTooltip from 'react-tooltip'

const Logout = (props) => {

    const [checked, setchecked] = useState(false)
    const firebase = useContext(Firebasecontext)

    
    return (
        <div className='logoutContainer'>
            <label className='switch'>
                <input onChange={()=>{firebase.LogoutUser();props.props.history.push('/');setchecked(!checked)}} checked={checked} type='checkbox'/>
                <span className='slider round' data-tip='Log Out'></span>
            </label>
            <ReactTooltip place='left' type='warning' effect='solid' />
        </div>
    )
}

export default Logout
