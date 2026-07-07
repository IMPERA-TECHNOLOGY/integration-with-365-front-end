import style from "./class.module.css"
import { User } from 'lucide-react';
import { useContext,useEffect, useState } from "react";
import { dataContext } from "../context";
const API_URL = import.meta.env.VITE_API_URL;


export function Config () {

    const userId = JSON.parse(localStorage.getItem("id"))

      const [show, setShow] = useState(true);

    const {
        setUserInfo,
        changeEmail,
        setChangeEmail,
        setChangeName,
        changeName
    } = useContext(dataContext)


    useEffect(() => {
        const info = localStorage.getItem("user");
        if (info) {
            
            setChangeEmail(JSON.parse(info).email)
            setChangeName(JSON.parse(info).name)
        }
    },[]);


    const replaceEmail = async () => {
        const response = await fetch(`${API_URL}/register`, {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({
                email: changeEmail,
                name: changeName,
                id: userId
            })
        })

        if(response.ok) {

            const currentUser = localStorage.getItem("user");

        if(currentUser) {
            const userObj = JSON.parse(currentUser);
            userObj.email = changeEmail
            userObj.name = changeName
            localStorage.setItem("user", JSON.stringify(userObj));

            setShow(false)

            setTimeout(() => {
                setShow(true)
            }, 3000);
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
                        <input type="text" onChange={ (event) => setChangeName(event.target.value)} value ={changeName} />
                    </div>

                        {/* Email */}
                    <div className={style.campo}>
                        <label>Correo electrónico</label>
                        <input type="email" onChange={ (event) => setChangeEmail(event.target.value)} value={changeEmail}/>
                    </div>

                    {/* Idioma */}
                    <div className={style?.campo}>
                        <label>Idioma</label>
                        <select> 
                            <option>Español</option>
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



