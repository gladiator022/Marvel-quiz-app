import React,{useEffect,useState} from 'react'
import Stepper from 'react-stepper-horizontal'

const Levels = props => {

    const {quizlevl,level}=props
    const [levels, setlevels] = useState([])

    useEffect(() => {
        const lev = level.map(item => ({title:item}))
        setlevels(lev)
    }, [level])
    console.log(levels)
    return (
        <div className="levelsContainer">
            <Stepper steps={ 
                     levels
                } activeStep={ quizlevl } />
        </div>
    )
}

export default Levels
