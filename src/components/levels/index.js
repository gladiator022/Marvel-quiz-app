import React,{useEffect,useState} from 'react'
import Stepper from 'react-stepper-horizontal'

const Levels = props => {

    const {quizlevl,level}=props
    const [levels, setlevels] = useState([])

    useEffect(() => {
        const lev = level.map(item => ({title:item.toUpperCase()}))
        setlevels(lev)
    }, [level])
    return (
        <div className="levelsContainer" style={{background:'transparent'}}>
            <Stepper 
                steps={levels} 
                activeStep={ quizlevl }
                circleTop={0} 
                activeTitleColor={'#EB1D27'}
                activeColor={'#EB1D27'}
                size={35}
                completeOpacity={'0.3'}
                completeTitleOpacity={'0.3'}	
                barStyle={''}
                titlefontWeight={'bold'}
            />
        </div>
    )
}

export default Levels
