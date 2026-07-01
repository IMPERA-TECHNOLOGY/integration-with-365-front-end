import { Component, useState } from "react";
import style from "./list.module.css"
import { useContext, useEffect } from "react";
import { dataContext } from "../context/index.jsx";
import { SquareChevronLeft } from 'lucide-react';
import { SquareChevronRight } from 'lucide-react';


export function Lista () {

    const  { 
        userValue,
        apiTickets,
        setApiTickets
    } = useContext(dataContext);


    let clientView; 

    const date = apiTickets.created_at
    const newDateFormaT = new Date(date)

    //llamado a la base de datos.
        
    useEffect(() => {
        const fetchTickets = async () => {
            const token = localStorage.getItem("token")
            try {
                const response = await fetch("http://localhost:4000/tickets", {
                    method:"GET",
                    headers: {"content-type": "application/json",
                    "authorization": `Bearer ${token}`
                    }
                });

                if (response.status === 401) {
                console.log("Token vencido detectado");
                localStorage.removeItem("token"); 
                setApiTickets([]);
                }

                const results = await response.json()
                setApiTickets(results)
                console.log(results)

                
            }catch (error) {
                console.error("error:", error)
            }
        }
        fetchTickets()
    },[])



        // Vista de todos los tickets 

    if ( userValue === "" || userValue === undefined) {

  clientView = (    
    <tbody>
        {apiTickets.toReversed().map((it, index) => {

            const newDateFormat = new Date(it.created_at).toLocaleDateString()
            const status = it.status === 1 ? "Closed" : "In progress";

            return (
                <tr className={style.tr2} key={it.id}>
                    <td>{it.ticket_number}</td>
                    <td>{it.subject}</td>                  
                    <td>{newDateFormat}</td>
                    <td>{it.contact_name}</td>
                    <td>{it.company_name}</td>
                    <td >{status}</td>
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
                <td colSpan="5" style={{ color: "red", textAlign: "center", padding: "50px" }}> 
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
                    <tr key={userValue.ticket_number} className={style.tr2}>
                        <td>{userValue.ticket_number}</td>
                        <td>{userValue.subject}</td>
                        <td>{userValue.created_at}</td>
                        <td>{userValue.contact_name}</td>
                        <td>{userValue.company_name}</td>
                        <td>{userValue.status}</td>
                    </tr>                
            </tbody>
        </>
    )
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

