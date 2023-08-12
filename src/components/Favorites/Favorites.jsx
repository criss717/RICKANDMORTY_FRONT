import { connect, useDispatch } from "react-redux";
import Card from "../Card";
import s from './Favorites.module.css'
import { filterCards, getFav, orderCards } from "../../Redux/Actions/actions";
import { useEffect } from "react";

const Favorites = (props) => {
    //hooks
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getFav())
    },[dispatch])

    //handle events
    const handleOrder = (e)=>{
        dispatch(orderCards(e.target.value))
    }
    const handleFilter = (e)=>{
        dispatch(filterCards(e.target.value))
    }
    return (
        <div className={s.container}>
            <div>
                <select name="filter" onChange={handleFilter}>
                    <option value=''>Select Gender</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Genderless'>Genderless</option>
                    <option value='unknown'>Unknown</option>
                    <option value='All'>All</option>
                </select>
                <select name="order" onChange={handleOrder}>
                    <option value='All'>Select Order</option>
                    <option value='A'>Ascendente</option>
                    <option value='D'>Descendente</option>
                </select>
            </div>
            {/* //mapeamos de la lista de favoritos */}
            <div className={s.containerCards}>
                {
                    props.myFavorites.map((elem)=>
                     elem.name &&  <Card
                            {...elem}
                            onClose={props.onClose}
                            key={elem.id}
                        />
                    )
                }
            </div>
        </div>

     );
}

function mapStateToProps(state){
   return{
      myFavorites:state.myFavorites,
      allCharacters:state.allCharacters
   }
}

export default connect(mapStateToProps,null)(Favorites);