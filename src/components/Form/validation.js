export default function validation(userData) {
    const regexEmail=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const regexPassword=/^(?=\w*\d)\S{6,10}$/;
    const errors={};

    if(!userData.email) errors.email='Campo requerido' //validación del Email
    else {
        if(!regexEmail.test(userData.email)) errors.email='Email inavalido'
        if(userData.email.length>35) errors.email='Máximo 35 caracteres'
    }   
    if(!regexPassword.test(userData.password)) { //validación contraseña
        errors.password=`Contraseña invalida:*6-8 caracteres
        *Min 1 digito
        ` 
    }
    return errors;
    
}