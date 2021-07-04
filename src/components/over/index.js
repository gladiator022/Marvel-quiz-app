import React,{useEffect,Fragment,useState,useRef} from 'react'
import { forwardRef } from 'react'

let  QuizOver = forwardRef((props,ref) => {
    

    const {next,quizlevl,score} = props
    const [counter, setcounter] = useState([])
    const [btnEnable, setbtnEnable] = useState(false)
    const [lev, setlev] = useState(quizlevl)

    const pStyle = {
                    color:'red',
                    textAlign:'center',
                    fontWeight:'bold',
                    cursor:'pointer'
                }
     
        
    useEffect(() => {
        setcounter(ref.current)
    }, [counter])

    const percent = score *100/10;
    
    const display = (percent >= 50 )? (  counter.map(item => {
            return <tr key={item.id}>
                    <td>{item.question}</td>
                    <td>{item.answer}</td>
                    <td>
                        <button className='btnInfo'>Info</button>
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
                            <p className='successMsg'>very good, you are Expert Go to Home page</p>
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
        </Fragment>
    )
})

export default QuizOver
