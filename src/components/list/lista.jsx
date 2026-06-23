import { Component, useState } from "react";
import style from "./list.module.css"
import { useContext, useEffect } from "react";
import { dataContext } from "../context/index.jsx";
import { SquareChevronLeft } from 'lucide-react';
import { SquareChevronRight } from 'lucide-react';


export function Lista () {

    const  {
        ticket, 
        userValue, 
        apiTickets,
        setApiTickets
    } = useContext(dataContext);

    const [actualPag, setactualPag] = useState(1)
    let clientView; 

    const startPagShown = (actualPag - 1) * 5;
    const endPagShown = startPagShown + 5; 

    const elementActualPag = ticket.slice(startPagShown, endPagShown)
    const totalPages = Math.ceil(apiTickets.length / 5); 

    const date = apiTickets.created_at
    const newDateFormaT = new Date(date)

    //Aqui es el llamado a la base de datos.
        
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch("http://localhost:4000/tickets");
                const resultado = await response.json()

                setApiTickets(resultado);
            }catch (error) {
                console.error("error:", error)
            }
        }
        fetchTickets()
    },[])


console.log(apiTickets)

        // Vista de todos los tickets 

    if ( userValue === "" || userValue === undefined) {

  clientView = (    
    <tbody>
        {ticket.toReversed().map((it, index) => {
            const newDateFormat = new Date(it.created_at).toLocaleDateString()
            return (
                <tr className={style.tr2} key={index}>
                    <td>{it.id}</td>
                    <td>{it.Description}</td>                  
                    <td>{it.dateCreated}</td>
                    <td>{it.reported}</td>
                    <td>{it.Group}</td>
                    <td>{it.status}</td>
                </tr> 
            );
        })}             
    </tbody>
);

        // NO ticket econtrado por el usuario

    }else if (userValue === null) {

  
        clientView = (
        <tbody>
            <tr>
                <td colSpan="5" style={{ color: "red", textAlign: "center", padding: "20px" }}> 
                <h3> Ticket no existe </h3>
                </td>
            </tr>
        </tbody>
        );    
         
        // Vista del ticket filtrado por el usuario 

    }else {
    clientView = (
        <>
            <tbody>
                {userValue.length > 0 ? (
                    userValue.map((it) => (
                        <tr key={it.id} className={style.tr2}>
                            <td>{it.id}</td>
                            <td>{it.Description}</td>
                            <td>{it.dateCreated}</td>
                            <td>{it.reported}</td>
                            <td>{it.Group}</td>
                            <td>{it.status}</td>
                        </tr> 
                    ))
                ) : (
                    <tr className={style.tr2}>
                        <td>{userValue.id}</td>
                        <td>{userValue.Description}</td>
                        <td>{userValue.dateCreated}</td>
                        <td>{userValue.reported}</td>
                        <td>{userValue.Group}</td>
                        <td>{userValue.status}</td>
                    </tr>
                )}                      
            </tbody>
        </>
    );
}

     //resultado de la busqueda por numero de ticket // 

    return (     
        <table className= {style.table}>
            <thead>
                <tr className= {style.tr}> 
                    <th>ID tickets</th>
                    <th>Description</th>
                    <th>Fecha Creacion</th>
                    <th>Reported</th>
                    <th>Group</th>
                    <th>Estado</th>
                </tr>
            </thead> 

            {/* Listado de tickets*/}

            {clientView}



        </table>
    );
}


export default Lista;

