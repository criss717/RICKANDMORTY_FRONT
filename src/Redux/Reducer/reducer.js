import { REMOVE_FAV, ADD_FAV, FILTER, ORDER, GET_FAV, CLEAN_DETAIL, GET_DETAIL } from "../Actions/types";
const initialState = {
    myFavorites:[],
    allCharacters:[],
    characterDetail:{}
}

export default function rootReducer(state=initialState,action){
    switch (action.type) {
        case GET_FAV:
            return{
                ...state,
                myFavorites:action.payload,
                allCharacters:action.payload
            }
        case ADD_FAV:
            return {
                ...state, myFavorites: action.payload, 
                allCharacters: action.payload 
            }    
        case REMOVE_FAV:
            return {                
                ...state,
                myFavorites:action.payload
            } 
        case FILTER:            
            const copiaFilter=state.allCharacters.filter((e)=>e.gender===action.payload)
            if(action.payload==='All'){//lógica para mostar todos los pj
                return {
                    ...state,
                    myFavorites:[...state.allCharacters]
                }
            }else {                
                return {
                    ...state,
                    myFavorites:copiaFilter
                }
            }
        case ORDER:
            const copiaOrder=[...state.myFavorites]
            if(action.payload==='A') copiaOrder.sort((a,b)=>a.id-b.id)
            if(action.payload==='D') copiaOrder.sort((a,b)=>b.id-a.id)

            return{
                ...state,               
                myFavorites:copiaOrder
            }
        case GET_DETAIL:
            return{
                ...state,
                characterDetail:action.payload
            }
        case CLEAN_DETAIL:
            return{
                ...state,
                characterDetail:{}
            }   
        
        default:
            return {
                ...state
            }          
    }
}