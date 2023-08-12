import { useState} from 'react';
import s from './SearchBar.module.css'

export default function SearchBar(props) {

   const [id,setId]=useState("");
   const handleChange=(e)=> {
      setId(e.target.value)
   }
   
   const searchLimpio=()=>{
      props.onSearch(id);
      setId("")
   }

   return (
      <div className={s.div1}>
         <input value={id}
            onChange={handleChange}
            placeholder='Digite el ID'
            type='number'
            min={'1'} 
            max={'826'}
            required=''
            autoFocus
         />
         <button className={s.buttonSearch} onClick={searchLimpio}>Agregar</button>
      </div>
   );
}
