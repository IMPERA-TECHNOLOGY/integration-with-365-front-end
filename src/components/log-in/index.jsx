import { User, Lock } from 'lucide-react';
import style from "./index.module.css"; 
import { useContext, useState } from 'react';
import { dataContext }  from '../context';

export function Login({onLogin}) {

  const  {
    userNameClient,
    setUsernameClient,
    setPassword,
    password
  } = useContext(dataContext)


  const [userInfo, setUserInfo] = useState(
        {
            user: "jean",
            password: "jean"
        }
    );
  const [hasError, setHasError] = useState(false);


  const onLoginSuccess = () => {
    if(userNameClient === userInfo.user && password === userInfo.password ) {
      onLogin();
    }else {
      console.log("usuario o contraseña incorrecto")
      setHasError(true)

    }
  };
  



  return (
    <main className={style.mainContainer}>
      <div className={style.loginBox}> 

        <h2>Iniciar sesión</h2>
        
        <div className={!hasError ? style.inputGroup : style.inputErroruser} > 
          <User size={20} className={style.icon} />
          <input type="text" placeholder="Usuario" onChange={(event) => setUsernameClient(event.target.value)} /> 
        </div>

        <div className={!hasError ? style.inputGroup : style.inputErroruser} >
          <Lock size={20} className={style.icon} />
          <input type="password" placeholder="Contraseña" onChange={(event) => setPassword(event.target.value)} /> 
        </div>
        
        {hasError && (
          <span className={style.errorMessage}>
            Usuario o contraseña incorrecta. Inténtalo de nuevo.
          </span>
        )}

        <button type="button" onClick={onLoginSuccess}>
          Iniciar Sesión
        </button>

        <p className={style.registerText}>
          ¿Es tu primera vez? <a href="/register">Regístrate aquí</a>
        </p>


      </div>
    </main>
  );
}

export default Login;
