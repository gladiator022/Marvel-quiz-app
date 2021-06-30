import React,{Fragment} from 'react'

const Progress = props => {
    const {Idquest}=props
    return (
        <Fragment>
            <div className='percentage'>
                <div className='progressPercent'> Question {Idquest +1}/10</div>
                <div className='progressPercent'> Progression {(Idquest +1)* 10} %</div>
            </div>
            <div className='progressBar'>
                <div className='progressBarChange' style={{width:`${(Idquest +1)*10}%`}}>

                </div>
            </div>
        </Fragment>
        
    )
}

export default Progress
