import { User, Lock } from 'lucide-react';
import style from "./index.module.css"; 
import { useContext, useEffect, useState } from 'react';
import { dataContext }  from '../context';
const API_URL = import.meta.env.VITE_API_URL;


export function Login({onLogin}) {
  
  

  const  {
    userNameClient,
    setUserNameClient,
    setPassword,
    setUserInfo,
    userInfo,
    password
    } = useContext(dataContext)

  const [hasError, setHasError] = useState(false);


    //busqueda de login de usuario a la BD
 const onLoginSuccess = async () => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        email: userNameClient, 
        password: password 
      })
    });

    const results = await response.json();
      if (response.status === 204) {
      return;
    }

    if (response.ok) {
      localStorage.setItem("user",JSON.stringify(results.user))

      onLogin()
      console.log(results)
  
    } else {
      console.log(results.error);
      setHasError(true);
    }
    
  }catch (error) {
    console.error("Error en la conexión:", error);
    setHasError(true);
  }

};

 // formulario de ingreso a la app
  return (
    <main className={style.mainContainer}>
      <div className={style.loginBox}> 

        <h2>Iniciar sesión</h2>
        
        <div className={!hasError ? style.inputGroup : style.inputErroruser} > 
          <User size={20} className={style.icon} />
          <input type="text" placeholder="Usuario" onChange={(event) => setUserNameClient(event.target.value)} /> 
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
