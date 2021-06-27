import React from 'react'
import err from '../../images/batman.png'


const centerH2 = {
    textAlign:'center',
    marginTop:'60px'
}
const centerimg = {
    display: 'block',
    marginTop:'40px auto'
}

const Error = () => {
    return (
        <div className='quiz-bg'>
            <div className='container'>
                <h2 style={centerH2}>Oups, page not found</h2>
                <img style={centerimg} src={err} alt='' />
            </div>
        </div>
    )
}

export default Error
