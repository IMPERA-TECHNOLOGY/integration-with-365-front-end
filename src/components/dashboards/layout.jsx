import style from "./layout.module.css"
import { DoughnutChart } from "./doughnut.jsx"
import { BarHorizontal } from "./barHorizontal.jsx"
import { Folder, Clock4, CircleCheck, Loader } from 'lucide-react';
import { dataContext } from "../context/index.jsx";
import { useContext } from "react";




export function LayoutCards () {

        const {
        ticket,
        apiTickets
    } = useContext(dataContext)

    const statusValue = {
        "closed" : 0,
        "inprogress" : 0,
        "active" : 0
}
    const totalTickets = apiTickets.lenght

    apiTickets.forEach( it => {
        if ( it.status === 1 ) statusValue.closed++;
        else if(it.status === 2) statusValue.inprogress++;
        else if(it.status === 3) statusValue.active++;
    })



    const infoCards = [
        {
            "Titulo": "Total de Tickets",
            "Cantidad": totalTickets,
            "Footer": "Todos los Tickets",
            "Icono": (
                <div style={{ 
                backgroundColor: '#9ca8ee', 
                width: '50px',          
                height: '50px',         
                borderRadius: '25%',    
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
            }}>
                <Folder color="#1e50e4" />
            </div>
            )
        },
        {
            "Titulo": "Pendientes",
            "Cantidad": statusValue.active,
            "Footer": "Por resolver",
            "Icono": (
                <div style={{ 
                backgroundColor: '#f1f3ab', 
                width: '50px',         
                height: '50px',        
                borderRadius: '25%',    
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
            }}>
                <Loader color="#89951e" />
                </div>
            )
            
        },
        {
            "Titulo": "En proceso",
            "Cantidad": statusValue.inprogress,
            "Footer": "En Atencion",
            "Icono": (
                <div style={{ 
                backgroundColor: '#ebee9c', 
                width: '50px',         
                height: '50px',        
                borderRadius: '25%',    
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
            }}>
                <Clock4 color="#8c9c21" size={20} />
                </div>
            )
        },
        {
            "Titulo": "Resueltos",
            "Cantidad": statusValue.closed,
            "Footer": "Completados",
            "Icono": (
                <div style={{ 
                backgroundColor: '#aaf0ba', 
                width: '50px',         
                height: '50px',        
                borderRadius: '25%',    
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
            }}>
                <CircleCheck color="#32e25e" />
                </div>
            )
        }
    ];



    return (
        
        <div className={style["dashboard-wrapper"]}>

            <div className={style["cards-container"]}>
                {infoCards.map((it, index) => (
                    <article key={index} className={style.cards}>

                        <div className={style["card-textos"]}>
                            <span>{it.Titulo}</span>
                            <h2>{it.Cantidad}</h2>
                            <p>{it.Footer}</p>
                        </div>


                        <div className={style["card-icono-contenedor"]}>
                            {it.Icono}
                         </div>

                    </article>
                ))}
            </div>

            
            <div className={style["dashboards-container"]}>
                
                {/*Grafico barra lineal*/}
                <section className={style["dashboard-box"]}>
                    <h3>Tickets por grupos</h3>
                    <div className={style["chart-placeholder"]}>
                        
                        <DoughnutChart/>
                    </div>
                </section>

                {/* Grafico de barra horizontal */}
                <section className={style["dashboard-box"]}>
                    <h3>Tickets por mes</h3>
                    <div className={style["chart-placeholder"]}>
                       
                        <BarHorizontal/>
                    </div>
                </section>

            </div>

        </div>
    )
};

export default LayoutCards;
