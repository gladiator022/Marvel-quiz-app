import React,{useState} from 'react'

const Modal = props => {

    const [load, setload] = useState(false)
    const {show,hide,infos}= props


    const body = infos.length===0 ?

            (<>
                <div className='modalHeader'>
                <h2>Loading... </h2>
                </div>
                <div className='loader'></div>
            </>
            ):(
                <>
                <div className='modalHeader'>
                    <h2>{infos.data.results[0].name} </h2>
                </div>
                <div className='modalBody'>
                    <div className='comicImage'>
                        <img src={infos.data.results[0].thumbnail.path+'.'+infos.data.results[0].thumbnail.extension} alt={infos.data.results[0].name} />
                        {infos.attributionText}
                    </div>
                    <div className='comicDetails'>
                        <h3>Description</h3>
                        {
                            infos.data.results[0].description? <p>{infos.data.results[0].description}</p>:
                            <p>No description available for this character....</p>
                        }
                        <h3>More infos</h3>
                        {
                            
                            infos.data.results[0].urls && infos.data.results[0].urls.map((url,index)=>{
                                return <a key={index} href={url.url} target="_blank" rel='noopener noreferrer'>
                                        {url.type} 
                                    </a>
                            })
                        }
                    </div>
                </div>
                </>
            )

    return show && ( 

            <div className='modalBackground'>
                <div className='modalContainer'>
                    {body}
                    <div className='modalFooter'>
                        <button onClick={hide}  className='modalBtn'>Close</button>
                    </div> 
                </div>
            </div>
        )
}

export default Modal
