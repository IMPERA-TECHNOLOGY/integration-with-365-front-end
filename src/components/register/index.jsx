import { useEffect, useState, useContext } from 'react';
import { Eye, EyeOff } from 'lucide-react'; 
import style from "./register.module.css";
import { useNavigate } from 'react-router-dom';
import { dataContext } from '../context';
const API_URL = import.meta.env.VITE_API_URL;


export function Register() {
  const navigate = useNavigate();

  const {
    setRegisterUser,
    registerUser
  } = useContext(dataContext);

  //Marcar las casillas como vacia
  const [emptyFiles, setEmptyFiles] = useState(true)

    //funcion para mover hacia el login page.
  const handleToLogin = () => {
    navigate("/login");
    console.log(registerUser)
    };
  

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //Variable para guardar usuario desde registro
  const handleUserChange = (event) => {

    setRegisterUser({
      ...registerUser, 
      [event.target.name]: event.target.value
    });
  };

  // Creacion de usuario en la BD
  const registerFetch = async (event) => { 
    try {
      event.preventDefault();

      const emptyFiles = Object.values(registerUser).some(it => it.trim() === "")

      if(emptyFiles) {
        console.log("Fields Empty")
        setEmptyFiles(false)
        console.log(Object.values(registerUser))
        return;

      }else if(registerUser.password.length < 8 || registerUser.password !== registerUser.passwordConfirm) {
        setEmptyFiles(false)
        console.log("Password does not match or password with less than 8 Characteres")
        return;

      }
      const request = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "content-type": "Application/json" },
        body: JSON.stringify({
          name: registerUser.completeName,
          email: registerUser.email,
          password: registerUser.password,
          rol: registerUser.rol
        })
      });
    
      const response = await request.json();
      console.log("Respuesta del servidor:", response);
      console.log(request.body);
      setEmptyFiles(true)

      if (request.ok) {
        navigate("/login");
      }

    } catch (error) {
      console.error(error, "error guardando datos");
    }
  };

  return (
    <main className={style.mainContainer}>
      <div className={style.pageHeader}>
        <h1>Registrar usuario</h1>
        <p>Crea una nueva cuenta de usuario</p>
      </div>

      <form className={style.registerBox}>
        <h2 className={style.boxTitle}>Información del usuario</h2>

        {/* Campo: Nombre completo */}
        <div className={emptyFiles ? style.inputGroup : style.inputGroupRed}>
          <label>Nombre completo</label>
          <input type="text" placeholder="Ej. Juan Pérez" name="completeName" onChange={handleUserChange}/>
        </div>

        {/* Campo: Correo electrónico */}
        <div className={emptyFiles ? style.inputGroup : style.inputGroupRed}>
          <label>Correo electrónico</label>
          <input type="email" placeholder="Ej. juan.perez@empresa.com" name="email" onChange={handleUserChange}/>
        </div>

        {/* Fila doble: Usuario y Rol */}
        <div className={style.row}>
          <div className={style.inputGroup}>
            <label>Rol</label>
            <select defaultValue="" name="rol" onChange={handleUserChange}>
              <option value="" disabled>Selecciona un rol</option>
              <option value="standard user">Usuario Estándar</option>
            </select>
          </div>
        </div>

        {/* Campo: Contraseña con icono de ojo */}
        <div className={emptyFiles ? style.inputGroup : style.inputGroupRed}>
          <label>Contraseña</label>
          <div className={style.passwordWrapper}>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Mínimo 8 caracteres" 
              name="password"
              onChange={handleUserChange}
            />
            <button 
              type="button" 
              className={style.eyeButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Campo: Confirmar Contraseña */}
        <div className={emptyFiles ? style.inputGroup : style.inputGroupRed}>
          <label>Confirmar contraseña</label>
          <div className={style.passwordWrapper}>
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="Repite tu contraseña"
              name="passwordConfirm"
              onChange={handleUserChange}
            />
            <button 
              type="button" 
              className={style.eyeButton}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Botones de acción en la esquina inferior derecha */}
        <div className={style.buttonGroup}>
          <button type="button" className={style.cancelButton} onClick={handleToLogin}>
            Cancelar
          </button>
          <button type="submit" className={style.submitButton} onClick={(e) => registerFetch(e)}>
            Registrar usuario
          </button>
        </div>
      </form>
    </main>
  );
}

export default Register;
