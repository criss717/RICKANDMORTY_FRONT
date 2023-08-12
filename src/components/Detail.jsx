import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import s from './Detail.module.css'
import { useDispatch, useSelector } from "react-redux";
import { cleanDetail, getDetail } from "../Redux/Actions/actions";

const Detail = (props) => {
    //Estados    
    const character=useSelector((state=>state.characterDetail))
    const [moreInfo, setMoreInfo] = useState(false)
    const [episodeRandom, setEpisodeRandom] = useState({})
    const [randomIn, setRandomIn] = useState(0)

    //hooks
    const {id:idDetail} = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch()  
   
    useEffect(()=>{
        dispatch(getDetail(idDetail)) //montain
        return ()=>{
            dispatch(cleanDetail()) // willdind unmontain
        } 
    },[idDetail])
    
    // modificación estado episodeRandom       
    useEffect(() => {        
        if(!randomIn && character.episode) setRandomIn(Math.floor((Math.random() * character.episode.length)))
        if (character.episode) {                   
            fetch(character.episode[Number(randomIn)] ) //obtenemos url del episodio escogido al azar
            .then((res) => res.json())
            .then(data => {
                if (data) setEpisodeRandom(data)
            })
        }
       
    }, [character,randomIn])

    // handle events
    const handleBack = () => {
        navigate('/home')
    }

    const handleMoreInfo = () => {
        !moreInfo ? setMoreInfo(true) : setMoreInfo(false)
    }

    const handleLessInfo = () => {
        !moreInfo ? setMoreInfo(true) : setMoreInfo(false)
        setRandomIn('')       
    }

    const handleAnother = () => {       
        setRandomIn('')
    }
    if (character.name) {
        return (
            <>
                <div className={s.container}>
                    <h1>Name: <br /> {character.name}
                        <div onClick={handleBack} className={s.arrowLeft}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        {
                            !moreInfo &&
                            <div onClick={handleMoreInfo} className={s.arrowDown}>
                                Random Episode
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        }
                    </h1>
                    <h2>Status: {character.status}</h2>
                    <h2>Species: {character.species}</h2>
                    <h2>Gender: {character.gender}</h2>
                    <h2>Origin: {character.origin.name}</h2>
                    <img src={character.image} alt={character.name} />

                </div>
                {
                    moreInfo &&
                    <div className={s.container2}>
                        <h1>Episode Title: <br /> {episodeRandom.name}
                            {
                                moreInfo &&
                                <div onClick={handleLessInfo} className={s.arrowUp}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            }
                            <button onClick={handleAnother} className={s.btnRandom}>Ep. Random</button>
                        </h1>
                        <h2># Episode: {episodeRandom.id}</h2>
                        <h2>Air Date: {episodeRandom.air_date}</h2>
                        <h2>Code: {episodeRandom.episode}</h2>
                    </div>
                }
            </>
        );
    }
}

export default Detail;