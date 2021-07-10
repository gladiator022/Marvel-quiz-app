import React,{useEffect,useState,useCallback} from 'react';
import { IoChevronForwardCircle } from 'react-icons/io5';
import  {toast}  from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Levels from '../levels'
import Progress from '../progression'
import { quizz } from '../quiz_m'
import QuizOver from '../over'


toast.configure()
const levelIni = ["Beginner","Confirm","Expert"];

const answersRef = React.createRef(null)

const Quiz = props => {

    const [quizlevl, setquizlev] = useState(0)
    const [levels] = useState(levelIni)
    const [question, setquestion] = useState(null)
    const [Idquestion, setIdquestion] = useState(0)
    const [options, setoptions] = useState([])
    const [choosen, setchoosen] = useState(false)
    const [Data, setData] = useState(null)           
    const [youranswer, setyouranswer] = useState(null)           
    const [score, setscore] = useState(0)  
    const [over, setover] = useState(false)  
    const [btnMsg, setbtnMsg] = useState('Next')  
    const [badAnswers, setbadAnswers] = useState([])  

    

    const {pseudo} = props.userdata
    
    

    const dataRef = React.createRef(null)

    const fetchData =  (level) =>{
        const load = quizz[level]
        const newArray = load.map( ( {answer, ...keRest} ) => keRest )
        setData(prevState => newArray)
    }


    
    const showWelcomeMsg = pseudo =>{

        if (pseudo !== '') {
            toast.warn(`welcome ${pseudo}`, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                });
        } 
    }

    const showSucessMsg = () =>{
        toast.success(`Correct +1 `, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            collapseDuration: 500,
            enter: 'zoomIn', 
            exit: 'zoomOut',
        });

    }

    const showErrorMsg = () =>{

        toast.error(`Wrong 0 `, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        }); 
    }
 

    const Nextquestion = () =>{

        answersRef.current = quizz[levels[quizlevl]][Idquestion].answer
        let goodAnswer = answersRef.current

        if (Idquestion === 9) {
            if (goodAnswer === youranswer ) {
                setscore(score=>score+1);
                showSucessMsg();
            }else {
                showErrorMsg();
                setbadAnswers(ans => {return [...ans,...[Idquestion]]})
            }

            setover(true)
            
        }
        else{

            Idquestion === 8 && setbtnMsg('Finish')
            if (goodAnswer === youranswer ) {
                setscore(score=>score+1);
                showSucessMsg(score)
            } else {
                showErrorMsg();
                setbadAnswers(ans => {return [...ans,...[Idquestion]]})
            }
            setIdquestion(Idquestion + 1)
        } 
        setchoosen(false)
        
    }
    const goToNext = useCallback(
        (lev) => {
            setscore(0)
            setIdquestion(0)
            setover(false)
            setquizlev(lev);
            setbadAnswers([])
        },[]) 
    

    const handleChoice = (option) =>{
        setyouranswer((prev)=> option ) 
        setchoosen(true)
    }

   

    useEffect( () => {
        fetchData(levels[quizlevl])
    },[quizlevl,levels])


    useEffect(()=>showWelcomeMsg(pseudo),[pseudo])

    useEffect(() => {
        if (!!Data) {
            setoptions(Data[Idquestion].options)
            setquestion(Data[Idquestion].question)
        }
    }, [Data,Idquestion])
     
    dataRef.current  =  quizz[levels[quizlevl]]
   
    const dispOptions = options.map((option,index) =>{

        return <p key={index} onClick={()=> handleChoice(option)} 
                    className={`answerOptions ${option === youranswer ? (`selected`):(null)}` }>
                     <IoChevronForwardCircle size={'20px'} style={{marginRight:'15px'}} />{option}
                </p>
    })

    return (
        over? (
            <QuizOver badAnswers={badAnswers} next={(lev)=> goToNext(lev)} quizlevl={quizlevl} ref={dataRef} score={score} />
        ):(
            <div>
                <Levels quizlevl={quizlevl} level ={levels} />
                <Progress Idquest={Idquestion} />
                <h2> {question} </h2>
                { dispOptions}
                {over}
                <button onClick={Nextquestion} disabled={!choosen} className={`btnSubmit`}> {btnMsg} </button>
            </div>
        )
    )

     
}

export default Quiz
