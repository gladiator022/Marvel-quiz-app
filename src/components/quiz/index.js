import React,{useEffect,useState,useLayoutEffect,useRef} from 'react'
import Levels from '../levels'
import Progress from '../progression'
import { QuizMarvel } from '../quiz_m'


const levelIni = ["Beginer","Confirm","Expert"];


const Quiz = props => {

    const [quizlevl, setquizlev] = useState(0)
    const [levels, setlevels] = useState(levelIni)
    const [question, setquestion] = useState(null)
    const [Idquestion, setIdquestion] = useState(0)
    const [options, setoptions] = useState([])
    const [choosen, setchoosen] = useState(false)
    const [Data, setData] = useState(null)      
    //const [answers, setanswers] = useState(null)      
    const [youranswer, setyouranswer] = useState(null)      
    const [score, setscore] = useState(0)  
    const answersRef = useRef(null)    


    const fetchData =  (level) =>{
        const load = QuizMarvel[0].quizz[level]
        //setanswers(load.map( ( answer ) => answer.answer ))
        answersRef.current = load.map( ( answer ) => answer.answer )
        const newArray = load.map( ( {answer, ...keRest} ) => keRest )
        setData(newArray)
    }

    useLayoutEffect( () => {
        fetchData(levels[quizlevl])
    },[quizlevl,levels])

    useEffect(() => {
        if (!!Data) {
            setoptions(Data[Idquestion].options)
            setquestion(Data[Idquestion].question)
        }
    }, [Data,Idquestion])

    const Nextquestion = () =>{
        if (Idquestion<9) {
            setchoosen(false)
            setIdquestion(Idquestion + 1)
        } else {
            if(score>=5){
                if (quizlevl<2) {
                    setquizlev(quizlevl +1);
                    setIdquestion(0);setscore(0)
                }
                else console.log('end')
                
            } 
            else{
                (console.log('end'))
            }
            console.log(`end of the level.  Score = ${score} /10`)
        }
    }
    const handleChoice = (option) =>{

        setyouranswer((prev)=> {
            if (prev !== option && answersRef.current[Idquestion] === option) {
                setscore((score)=>score+1)
                console.log('true')
            }
            else{
                console.log(score)
            }
            return option
        })

        setchoosen(true)
        
    }
    const dispOptions = options.map((option,index) =>{

        return <p key={index} onClick={()=> handleChoice(option)} 
                    className={`answerOptions ${option === youranswer ? (`selected`):(null)}` }>
                    {option} 
                </p>
    })
    return (
        <div>
            <Levels level ={levels[quizlevl]} />
            <Progress Idquest={Idquestion} />
            <h2> {question} </h2>
            { dispOptions}
            <button onClick={Nextquestion} disabled={!choosen} className={`btnSubmit`}>Next</button>
        </div>
    )
}

export default Quiz
