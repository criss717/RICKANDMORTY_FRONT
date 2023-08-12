import { Link, useLocation } from 'react-router-dom';
import s from './Card.module.css'
import { addFav, removeFav } from '../Redux/Actions/actions';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';


function Card(props) {
   const {pathname}=useLocation();
   const [isFav, setIsFav]=useState(false)

   useEffect(() => {
      props.myFavorites.forEach((fav) => {
         if (fav.id === props.id) {
            setIsFav(true);
         }
      });
   }, [props.id,props.myFavorites]);
   
   const handleFavorite = ()=> {
      if(!isFav){
         setIsFav(true);
         props.addFav(props)
      }else {
         setIsFav(false);
         props.removeFav(props.id)
      }
   }
   
   return (      
      <div className={s.card}>
         <div className={s.div1}>
            <Link to={`/detail/${props.id}`}>
               <img src={props.image} alt='' />
            </Link>
            {
               pathname!=='/favorites' &&
               <button className={s.buttonX}
                   onClick={()=>props.onClose(props.id)}
               >X</button>
            }
            <button className={isFav?s.btnFavTrue:s.btnFavFalse}
                onClick={handleFavorite}
            >♥</button>
            <span className={s.spanId}>{props.id}</span>
            <Link to={`/detail/${props.id}`}>
               <h2>{props.name}</h2>
            </Link>
         </div>
         <div className={s.txt}>
            <h2>{props.status}</h2>
            <h2>{props.species}</h2>
            <h2>{props.gender}</h2>
            <h2 className={s.origin}>{props.origin}</h2>

         </div>
      </div>
   );
}

function mapStateToProps(state){
   return{
      myFavorites:state.myFavorites
   }
}

function mapDispatchToProps(dispatch){
   return {
      addFav:(personaje)=>{
         dispatch(addFav(personaje))
      },
      removeFav:(id)=>{
         dispatch(removeFav(id))
      }
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(Card)
