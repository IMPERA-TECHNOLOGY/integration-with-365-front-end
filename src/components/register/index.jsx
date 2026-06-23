import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Opcional para los iconos de la contraseña
import style from "./register.module.css";

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main className={style.mainContainer}>
      <div className={style.pageHeader}>
        <h1>Registrar usuario</h1>
        <p>Crea una nueva cuenta de usuario</p>
      </div>

      <form className={style.registerBox}>
        <h2 className={style.boxTitle}>Información del usuario</h2>

        {/* Campo: Nombre completo */}
        <div className={style.inputGroup}>
          <label>Nombre completo</label>
          <input type="text" placeholder="Ej. Juan Pérez" />
        </div>

        {/* Campo: Correo electrónico */}
        <div className={style.inputGroup}>
          <label>Correo electrónico</label>
          <input type="email" placeholder="Ej. juan.perez@empresa.com" />
        </div>

        {/* Fila doble: Usuario y Rol */}
        <div className={style.row}>
          <div className={style.inputGroup}>
            <label>Nombre de usuario</label>
            <input type="text" placeholder="Ej. juanperez" />
          </div>
          
          <div className={style.inputGroup}>
            <label>Rol</label>
            <select defaultValue="">
              <option value="" disabled>Selecciona un rol</option>
              <option value="user">Usuario Estándar</option>
            </select>
          </div>
        </div>

        {/* Campo: Contraseña con icono de ojo */}
        <div className={style.inputGroup}>
          <label>Contraseña</label>
          <div className={style.passwordWrapper}>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Mínimo 8 caracteres" 
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
        <div className={style.inputGroup}>
          <label>Confirmar contraseña</label>
          <div className={style.passwordWrapper}>
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="Repite tu contraseña" 
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
          <button type="button" className={style.cancelButton}>
            Cancelar
          </button>
          <button type="submit" className={style.submitButton}>
            Registrar usuario
          </button>
        </div>
      </form>
    </main>
  );
}

export default Register;
