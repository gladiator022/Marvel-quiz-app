import React,{useState,useContext,useEffect} from 'react'
import  { Firebasecontext } from '../../firebase'
import { Fragment } from 'react'
import Logout from '../logout'
import Quiz from '../quiz'


const data = {
    pseudo:'',
    email:''
}

const Welcome = props => {

    const [userSession, setuserSession] = useState(null)
    const [userdata, setuserdata] = useState(data)

    const firebase = useContext(Firebasecontext)

         useEffect(() => {
            console.log((`1st welcome: ${userdata.pseudo}`))
            let listener = firebase.auth.onAuthStateChanged(user =>
                user ?  setuserSession(user) : props.history.push('/') )

            if(userSession !== null){
                firebase.user(userSession.uid)
                .get()
                .then(doc=>{
                    if (doc && doc.exists) {
                        const mydata = doc.data()
                        setuserdata({pseudo:mydata.pseudo,email:mydata.email})
                    }
                })
            }
            return () => {
                listener()
            }
    }, [userSession]) 


    return  userSession === null? (
        <Fragment>
            <div className='loader'></div>
            <p className='loaderText'>loading.......</p>
        </Fragment>
    ):(
        <div className='quiz-bg'>
            <div className='container'>
                <Logout  props={props} />
                <Quiz userdata={userdata}/>
            </div>
        </div>
    )

}

export default Welcome
