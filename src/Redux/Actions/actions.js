import { REMOVE_FAV, ADD_FAV, ORDER, FILTER,GET_FAV, GET_DETAIL, CLEAN_DETAIL } from "./types";
import axios from 'axios'

export const getFav = ()=>{   
   return async (dispatch) => {
      try {
         const {data} = await axios('/rickandmorty/fav')
         return dispatch({
            type: GET_FAV,
            payload:data
         })
      }catch (error) {
         alert(error.message)        
      }
   }  
}   
export const addFav =  (character) => {   
    return async (dispatch) => {
      try {
         const {data} = await axios.post('/rickandmorty/fav', character)
         return dispatch({
            type: ADD_FAV,
            payload: data,
         });
      }  
      catch (error) {
         alert(error.message)
      }
    };
}

 export const removeFav = (id) => {    
    return async (dispatch) => {
      try {
         const {data} = await axios.delete('/rickandmorty/fav/' + id)
         return dispatch({
            type: REMOVE_FAV,
            payload: data,
         });      
      } 
      catch (error) {
         alert(error.message)
      }
    };
 };

export function filterCards(gender){
    return {
        type:FILTER,
        payload: gender
    }
}

export function orderCards(orden){
    return {
        type:ORDER,
        payload: orden
    }
}

export function getDetail(id){
   return  (dispatch)=>{
      axios(`/rickandmorty/character/${id}`)
         .then(({data})=>{
            return dispatch({
               type:GET_DETAIL,
               payload:data
            })
         })
   }
}

export function cleanDetail(){ // para limpiar el componente global de detalle, cuando damos hacia  atrás
   return {
      type:CLEAN_DETAIL      
   }
}
