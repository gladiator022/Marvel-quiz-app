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

            let listener = firebase.auth.onAuthStateChanged(user =>{
                user ?  setuserSession(user) : props.history.push('/')
                    
            })
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
                <h2>Question Quiz</h2>
                <p className='answerOptions'>Question 1</p>
                <p className='answerOptions'>Question 1</p>
                <p className='answerOptions'>Question 1</p>
                <p className='answerOptions'>Question 1</p>
                <button className='btnSubmit'>Next</button>
            </div>
        </div>
    )

}

export default Welcome
