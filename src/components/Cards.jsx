import Card from './Card';
import styled from 'styled-components'

const DivStyled= styled.div`
   display: flex;
   flex-direction: row;
   text-align: center;
   width: 100%;
   height: 100%;   
   margin:10px;
   flex-wrap: wrap;
   max-width: 2100px;
     
`
export default function Cards(props) {
   return (
   <DivStyled>
      {  
         props.characters.map(elem => 
         <Card id={elem.id}
            key={elem.id} 
            name={elem.name} 
            status={elem.status} 
            species={elem.species} 
            gender={elem.gender} 
            origin={elem.origin.name}
            image={elem.image}
            onClose={props.onClose}
         />)
      }
   </DivStyled>
   )
}
