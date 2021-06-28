import React, { useEffect, useRef, useState,Fragment} from 'react'
import {Link} from 'react-router-dom'

const Landing = () => {

    const volverin = useRef(null)
    const [btn,setbtn] = useState(false)

    
    
    useEffect(()=>{
        volverin.current.classList.add('startingImg')
        setTimeout(() => {
            volverin.current.classList.remove('startingImg')
            setbtn(true)
        }, 1000);
    },[])

    const DisplayLScratch = ()=>{volverin.current.classList.add('leftImg')}
    const DisplayRScratch = ()=>{volverin.current.classList.add('rightImg')}
    
    const HideScratch = ()=>{
        volverin.current.classList.contains('leftImg') ? 
            (volverin.current.classList.remove('leftImg')) :
            (volverin.current.classList.remove('rightImg'))
        }
        
   const displaybtn = btn && (
        <Fragment>
            <div className='leftBox'>
                <Link to='signup' onMouseLeave={HideScratch} onMouseOver={DisplayLScratch} className='btn-welcome'>Sign Up</Link>
            </div>
            <div className='rightBox'>
                <Link to='/login' onMouseLeave={HideScratch} onMouseOver={DisplayRScratch} className='btn-welcome'>Login</Link>
            </div>
        </Fragment>
   )
    return (
        <main ref={volverin} className='welcomePage'>
            {displaybtn}
        </main>
    )
}

export default Landing
