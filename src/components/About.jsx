import imageAbout from '../assets/about.png'
import s from './About.module.css'

const About = () => {
    return ( 
        <div className={s.container}>
            <img src={imageAbout} alt=''></img>
            <div className={s.info}>
                <h1>Hi, I'm Cristian Guzman,</h1>
                <h2>This is my first React and Redux project.
                    In this app you can choose between all the characters from the 'RICK AND MORTY' series, you can see their detailed information and add your favorites.
                    Growing fullstack developer
                </h2>
                <hr></hr>               
                <h2>Colombia-Pereira 2023</h2>
            </div>
        </div>
     );
}
 
export default About;