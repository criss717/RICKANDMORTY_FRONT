import React,{useEffect, useState} from 'react'
import Cards from './components/Cards.jsx';
import Nav from './components/Nav.jsx'
import './App.css'
import axios  from 'axios';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import About from './components/About.jsx';
import Detail from './components/Detail.jsx';
import Error404 from './components/Error404.jsx';
import Form from './components/Form/Form.jsx';
import Favorites from './components/Favorites/Favorites.jsx';
import { connect } from 'react-redux';
import { removeFav } from './Redux/Actions/actions.js';
import audioLogin from './assets/audio/login.mp3'
import useSound from 'use-sound';

function App(props) {
   
   const [playAudio]=useSound(audioLogin)
   const [characters,setCharacters]= useState([])
   const [acces, setAccess]=useState(false)
   
   const location=useLocation() // para ocultar navbar cuando este en el path='/'
   const navigate=useNavigate() // para re dirigir a una ruta, a /home cuando hacemos login correcto
   
   const onSearch= async (id)=>{  //para nuestro botón e input de entrada id
      if(!id) alert('Campo requerido')
      else if(characters.findIndex((elem)=>elem.id===Number(id))===-1){          
         try {
            const {data}= await axios.get(`/rickandmorty/character/${id}`)
            setCharacters((oldChars) => [...oldChars, data]);                  
         } catch (error) {                       
            window.alert(error.response.data)
         } 
      }else{
         alert(`El personaje con id:${id} ya fue elegido`)
      }      
   }

   const onClose=(id)=>{ //para nuestro botón X (cerrar card)
      setCharacters(characters.filter((elem)=>elem.id!==Number(id)))
      props.removeFav(id)
   }

   const onCloseFav = (id)=>{ //para nuestro botón X (cerrar card de favoritos)
      props.removeFav(id)   }
     
   const onRandom=(randomID)=>{  //para el botón de pj random
      const idRandom=randomID();               
         if(characters.findIndex((elem)=>elem.id===Number(idRandom))===-1){
            fetch(`https://rickandmortyapi.com/api/character/${idRandom}`)
            .then(res=>res.json())
            .then(data=> {             
                setCharacters((oldChars) => [...oldChars, data]);             
            })
         }else{
            alert(`El personaje con id:${idRandom} ya fue elegido`)
         }        
      }   
 
   async function login(userData) { //simula seguridad
      const { email, password } = userData;     
      try {
         const {data} = await axios(`/rickandmorty/login?email=${email}&password=${password}`)
         const {access} = data;
         setAccess(data);
         if(access){
            playAudio(); // reproducimos sonido de portal
            navigate('/home') //para redirigirnos a /Home 
         }             
      } catch ({response}) {         
         alert(response.data.message) // traemos el mensaje q enviamos en el archivo del server login.js
      }      
   }
   const logOut=()=>{
      playAudio()  // reproducimos sonido de portal
      setAccess(false)
   }

   useEffect(()=>{    
      if(!acces) navigate('/')
   },[acces,navigate])

   return (
      <div >
         {!location.pathname.includes("detail") && location.pathname!==('/') &&
          <Nav onSearch={onSearch} onRandom={onRandom} logOut={logOut}/>}
         <Routes>
            <Route path='/home' element={<Cards onClose={onClose} characters={characters}/>}/>
            
            <Route path='/about' element={<About/>}/>            
            
            <Route path='/detail/:id' element={<Detail/>}/>

            <Route path='/' element={<Form login={login}/>}/>

            <Route path='/favorites' element={<Favorites onClose={onCloseFav}/>}/>

            <Route path='*' element={<Error404/>}/>
         </Routes>        
      </div>
   );
}

function mapDispatchToProps(dispatch){
   return {     
      removeFav:(id)=>{
         dispatch(removeFav(id))
      }
   }
}

export default connect(null,mapDispatchToProps)(App);
