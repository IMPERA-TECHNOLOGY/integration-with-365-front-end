import style from "./class.module.css"
import { User } from 'lucide-react';
import { useContext,useEffect, useState } from "react";
import { dataContext } from "../context";
import { useNavigate } from "react-router-dom";

export function Config () {

    const navigate = useNavigate(); 


    const userId = JSON.parse(localStorage.getItem("id"))

      const [show, setShow] = useState(true);

    const {
        userInfo,
        setUserInfo,
        onchangeEmail,
        changeEmail,
        setChangeEmail
    } = useContext(dataContext)

    useEffect(() => {
        const info = localStorage.getItem("user");
        if (info) {
            setUserInfo(JSON.parse(info)); 
        }
    }, [setUserInfo]);


    const replaceEmail = async () => {
        const response = await fetch("http://localhost:4000/changeUser", {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: changeEmail,
                id: userId
            })
            
        })

        const currentUser = localStorage.getItem("user");
        if(response.ok) {

            const currentUser = localStorage.getItem("user");

        if(currentUser) {
            const userObj = JSON.parse(currentUser);
            userObj.email = changeEmail
            localStorage.setItem("user", JSON.stringify(userObj));
            setShow(false);
        }
        

            
        }else {
            console.error("Error en la respuesta del servidor");
        }


    } 

    return (
        
         show ? (
        <div className={style.container}>

            <article className={style.container1}>
                
                {/*Contenedor para el icono y título */}
                <div className={style.headerTarjeta}> 
                    <User color="#080808" size={20} />
                    <h2>Perfil de usuario</h2>
                </div>

                {/* Sección del formulario */}
                <section className={style.formulario}>
                    
                    {/* Name*/}
                    <div className={style.campo}>
                        <label>Nombre</label>
                        <input type="text" />
                    </div>

                        {/* Email */}
                    <div className={style.campo}>
                        <label>Correo electrónico</label>
                        <input type="email" onChange={ (event) => setChangeEmail(event.target.value)}/>
                    </div>

                    {/* Idioma */}
                    <div className={style?.campo}>
                        <label>Idioma</label>
                        <select> 
                            <option>Español</option>
                            <option>Ingles</option>
                        </select>
                    </div>

                    {/* Botón para guardar cambios */}
                    <button type="button" onClick={replaceEmail}>Guardar cambios</button>

                </section>
            </article>

        </div>
          ) : (
    <div style={{ padding: "10px", background: "lightgreen" }}>
      ¡Operación realizada con éxito!
    </div>
  )
    )
}

export default Config;



