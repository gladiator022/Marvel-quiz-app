import React,{useEffect,useState} from 'react'
import Levels from '../levels'
import Progress from '../progression'
import { QuizMarvel } from '../quiz_m'


const levelIni = ["debutant","confirme","expert"];


const Quiz = props => {

    const [levels, setlevels] = useState(levelIni)
    const [quizlevl, setquizlev] = useState(0)
    const [maxquestion, setmaxquestion] = useState(10)
    const [storedquestion, setstoredquestion] = useState([])

    const fetchData = quizz =>{
        const load = QuizMarvel[0].quizz[quizz]
        if(load.length >= maxquestion){
            const newArray = load.map(({answer, ...keeRest})=>keeRest)
            setstoredquestion(newArray)
        }
    }
    
    useEffect(() => {
        fetchData(levels[quizlevl])
    }, [levels])

    return (
        <div>
            <Levels p={props.userdata.pseudo} />
            <Progress/>
        </div>
    )
}

export default Quiz
