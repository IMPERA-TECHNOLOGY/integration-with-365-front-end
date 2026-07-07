import { useState, useContext, useEffect } from "react";
import style from "./list.module.css";
import { dataContext } from "../context/index.jsx";
const API_URL = import.meta.env.VITE_API_URL;

export function Lista() {

    const {
        userValue,
        apiTickets,
        setApiTickets
    } = useContext(dataContext);

    let clientView;

    const [loading, setLoading] = useState(true);

    // Llamado a la base de datos
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch(`${API_URL}/tickets`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "content-type": "application/json"
                    }
                });
                if (response.ok) {
                    setLoading(false);
                }
                if (response.status === 401) {
                    console.log("Token vencido detectado");
                    setApiTickets([]);
                } else {
                    const results = await response.json();
                    setApiTickets(results);
                    console.log(results);
                }

            } catch (error) {
                console.error("error:", error);
            }
        };

        fetchTickets();
    }, []);

    if (loading) {
        return (
            <div>
                <h3>Cargando tickets...</h3>
            </div>
        );
    }

    // Vista de todos los tickets
    if (userValue === "" || userValue === undefined) {

        clientView = (
            <tbody>
                {apiTickets.toReversed().map((it) => {

                    const newDateFormat = new Date(it.created_at).toLocaleDateString();
                    const status = it.status === 1 ? "Closed" : "In progress";

                    return (
                        <tr className={style.tr2} key={it.id}>
                            <td>{it.ticket_number}</td>
                            <td>{it.subject}</td>
                            <td>{newDateFormat}</td>
                            <td>{it.contact_name}</td>
                            <td>{it.company_name}</td>
                            <td>{status}</td>
                        </tr>
                    );
                })}
            </tbody>
        );

    }
    // Ticket no encontrado
    else if (userValue === null) {

        clientView = (
            <tbody>
                <tr>
                    <td colSpan="6" style={{ color: "red", textAlign: "center", padding: "50px" }}>
                        <h3>Ticket no existe</h3>
                    </td>
                </tr>
            </tbody>
        );

    }
    // Vista del ticket filtrado
    else {

        clientView = (
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
        );
    }

    return (
        <table className={style.table}>
            <thead>
                <tr className={style.tr}>
                    <th>ID tickets</th>
                    <th>Description</th>
                    <th>Fecha Creacion</th>
                    <th>Reported</th>
                    <th>Group</th>
                    <th>Estado</th>
                </tr>
            </thead>

            {clientView}

        </table>
    );
}

export default Lista;