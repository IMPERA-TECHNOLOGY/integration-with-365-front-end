import style from "./class.module.css"
import { User } from 'lucide-react';

export function Config () {
    let user = "Jean Castro";
    let email = "jean.castro@impera.global";
    
    return (
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
                        <input type="text" placeholder={user}/>
                    </div>

                        {/* Email */}
                    <div className={style.campo}>
                        <label>Correo electrónico</label>
                        <input type="email" placeholder={email}/>
                    </div>

                    {/* Idioma */}
                    <div className={style.campo}>
                        <label>Idioma</label>
                        <select> 
                            <option>Español</option>
                            <option>Ingles</option>
                        </select>
                    </div>

                    {/* Botón para guardar cambios */}
                    <button type="button">Guardar cambios</button>

                </section>
            </article>

        </div>
    )
}

export default Config;



