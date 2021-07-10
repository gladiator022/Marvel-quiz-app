import React,{useEffect,Fragment,useState,useRef} from 'react'
import { forwardRef } from 'react'
import {GrTrophy} from 'react-icons/gr'
import Modal from '../modal'
import axios from 'axios'
import { get, set } from 'lodash'

let  QuizOver = forwardRef((props,ref) => {
    

    const {next,quizlevl,score,badAnswers} = props
    const [counter, setcounter] = useState([])
    const [modalOpen, setmodalOpen] = useState(false)
    const [infos, setinfos] = useState([])


    const API_PUBBLIC_KEY = process.env.REACT_APP_MARVEL_QUIZZZ_API_KEY
    const hash = '84f9d0637033b7a0d800d2ceb12c6b71'
    const pStyle = {
                    color:'red',
                    textAlign:'center',
                    fontWeight:'bold',
                    cursor:'pointer'
                }
    const showModal = id =>{
        setmodalOpen(true)
        let data = localStorage.getItem(id)
        if(data){
            setinfos(JSON.parse(data))
        }else{
            axios
            .get(`http://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBBLIC_KEY}&hash=${hash}`)
            .then(answer => {
                setinfos(answer.data)
                let date = localStorage.getItem('marvel_date_of_last__request')
                localStorage.setItem(id, JSON.stringify(answer.data))
                if(!date)
                {
                     localStorage.setItem('marvel_date_of_last__request',Date.now())
                }

            })
            .catch(err=>{
                console.log(err)
            })
        }
        axios
        .get(`http://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBBLIC_KEY}&hash=${hash}`)
        .then(answer => {
            setinfos(answer.data)
            localStorage.setItem(id, JSON.stringify(answer.data))
            localStorage.setItem('marvel_date_of_last__request',Date.now())
        })
        .catch(err=>{
            console.log(err)
        })

    }

    const hide = () =>setmodalOpen(false)

    useEffect(() => {
        setcounter(ref.current)
        checkDate('marvel_date_of_last__request')
    }, [counter])

    const checkDate = date =>{
        let oldDate = localStorage.getItem(date)
        let daysDiff = (Date.now() - oldDate)/(1000*3600*24)
        if (daysDiff >= 15) {
            localStorage.clear();
            localStorage.setItem(date,Date.now())
        }
    }

    const percent = score *100/10;
    
    const display = (percent >= 50 )? (  counter.map(item => {
            let style = {backgroundColor:'#c2d6c3'}
            badAnswers.map(index => {
                if (index === item.id) {
                    style = {backgroundColor:'#d4b4aa'}
                }
            })
            return <tr key={item.id} style={style}>
                    <td style={style}>{item.question}</td>
                    <td style={style}>{item.answer}</td>
                    <td style={style}>
                        <button onClick={()=>{showModal(item.heroId)}} className='btnInfo'>Info</button>
                    </td>
                </tr>
        })):(
            <tr >
                <td colSpan='3'>
                    <p style={pStyle}>No Answer </p>
                    <div className='loader'></div>
                    <p onClick={() => next(quizlevl)} style={pStyle} className='loaderText'>Restart the level</p>
                    
                </td>
            </tr>
        )
    

    
    
    const decision = (percent >= 50 && quizlevl !== 2)?(
            <Fragment>
                <div className='stepsBtnContainer'>
                    <p className='successMsg'>good... you passed this level, go to next level</p>
                    <button onClick={() => next(quizlevl+1)} className='btnResult success'> Next Level</button>  
                </div>
            </Fragment>
        ):(<Fragment>
                <div className='stepsBtnContainer'>
                    {(percent >= 50 && quizlevl === 2)?(
                        <Fragment>
                            <p className='successMsg'><GrTrophy size={'50px'} /> very good, you are Expert Go to Home page</p>
                            <button onClick={() => next(0)} className='btnResult gameOver'> Home</button>
                        </Fragment>
                    ):(
                        <Fragment>
                            <p className='faillureMsg'>Fail</p>
                            <button onClick={() => next(0)} className='btnResult gameOver'> Restard From Beginner</button>
                        </Fragment>
                    )}
                </div>
            </Fragment>
        )
        

    return (
        <Fragment>
            <Fragment>
                {decision}
                <div className='percentage'>
                    <div className='progressPercent'>Percentage : {percent}</div>
                    <div className='progressPercent'>Mark {score}/10</div>
                </div>
            </Fragment>
            
            <hr/>
            <p>answers of Questions</p>
            <div className='answerContainer'>
                <table className='answers'>
                    <thead>
                        <tr >
                            <th>Questions</th>
                            <th>Answers</th>
                            <th>Infos</th>
                        </tr>
                    </thead>
                    <tbody>
                       {display} 
                    </tbody>
                </table>
            </div>
            <Modal infos={infos} hide={hide} show={modalOpen} />
        </Fragment>
    )
})

export default QuizOver
