import { useState } from "react";
import validation from "./validation";
import s from './Form.module.css'
import image from '../../assets/gif-login-sin-fondo.gif'

const Form = (props) => { 
   //Estados
    const [userData, setUserData]=useState({
        email:'',
        password:''
    })

    const [errors,setErros] = useState({
        email:'',
        password:''
    })

    //Handle Events
    const handleChange=(e)=>{
        const property=e.target.name;
        const value=e.target.value;

        setErros(validation({...userData, [property]:value}))
        setUserData({...userData, [property]:value})
    }

    const onSubmit=(e)=>{
        e.preventDefault();        
        props.login(userData)       
    }

    return ( 
        <div className={s.container}>           
            <img src={image} alt=""></img>
            <form className={s.form} onSubmit={onSubmit}>              
                <label htmlFor="email">EMAIL</label>
                <input
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={userData.email}
                    className={errors.email && s.warning}
                    placeholder="mono-717@hotmail.com"
                 />
                <p className={s.danger}>{errors.email}</p>

                <label htmlFor="password">PASSWORD</label>
                <input 
                    name="password" 
                    type="password"
                    onChange={handleChange}
                    value={userData.password}
                    className={errors.email && s.warning}
                    placeholder="c1234567"
                 />
                <p className={s.danger}>{errors.password}</p>

                <button type="submit">SUBMIT</button>

            </form>

        </div>
    );
}
 
export default Form;