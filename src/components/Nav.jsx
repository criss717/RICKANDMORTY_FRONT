import React from 'react'
import SearchBar from './SearchBar.jsx';
import s from './Nav.module.css'
import { Link, useLocation } from 'react-router-dom';

const Nav = (props) => {
    //hooks
    const location = useLocation()  //lo usare para renderizado condicional
    
    function randomID(){ //para calcular un id aleatorio, que sirve para el boton Random
        return Math.floor(1+(Math.random()*825))
    }
    return (
        <div className={s.container}>
            <div className={s.div1}>
                <Link to='/home'>
                    <button>Home</button>            
                </Link>
                <Link to='/favorites'>
                    <button>Favorites</button>            
                </Link>
                <Link to='/about'>
                    <button>About</button>            
                </Link>
            </div>       
                            
            <div className={s.div2}>
                {
                    location.pathname!=='/favorites' && 
                    location.pathname!=='/about' &&
                    <>
                    <SearchBar onSearch={props.onSearch}/>
                    <div className={s.div3}>
                        <button onClick={()=>props.onRandom(randomID)}>Pj Random</button>
                    </div> 
                    <div className={s.div4}>
                        <button onClick={props.logOut}>↪Log Out</button>
                    </div>
                    </>
                }
            </div>               
        </div> 
     );
}
export default Nav;