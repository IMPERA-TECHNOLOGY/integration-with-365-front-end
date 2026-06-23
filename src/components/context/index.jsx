import { createContext, useState } from "react";

export const dataContext = createContext();

export const ContextData = ({ children }) => {
    const [userValue, setUserValue] = useState("");

    const [noFoundTicket, setNoFoundTicket] = useState();


    //Password del usuario
const [password, setPassword] = useState()

    // username del usuario
  const [userNameClient, setUsernameClient] =useState()

    //Array con todos los tickets desde la BD
    const [apiTickets, setApiTickets] = useState([])


    //cambio de contenido principal
    const [options, setOptions] = useState("Dashboard")

    //tickets temporales
    const [ticket, setTicket] = useState([
        {
            id: "0",
            Description: "Create user for whole team in sell",
            dateCreated: "12-2-2026",
            reported: "Jean",
            group: "ANSA"
        },
        {
            id: "1",
            Description: "Create user for whole team in sell",
            dateCreated: "12-2-2026",
            reported: "Jean",
            Group: "BmCargo"
        },
        {
            id: "2",
            Description: "Create user for whole team in sell",
            dateCreated: "12-2-2026",
            reported: "Jean",
            Group: "ANSA"
        },
        {
            id: "3",
            Description: "Create user for whole team in sell",
            dateCreated: "12-2-2026",
            reported: "Jean",
            Group: "IMPERA"
        },
        {
            id: "4",
            Description: "Create user for whole team in sell",
            dateCreated: "12-2-2026",
            reported: "Jean",
            Group: "IMPERA"
        },
        {
            id: "4",
            Description: "Create user for whole team in sell",
            dateCreated: "12-2-2026",
            reported: "Jean",
            Group: "IMPERA"
        },
        {
            id: "4",
            Description: "Create user for whole team in sell",
            dateCreated: "12-2-2026",
            reported: "Jean",
            Group: "IMPERA"
        },
        {
            id: "4",
            Description: "Create user for whole team in sell",
            dateCreated: "12-2-2026",
            reported: "Jean",
            Group: "IMPERA"
        },
        {
            id: "4",
            Description: "Create user for whole team in sell",
            dateCreated: "12-2-2026",
            reported: "Jean",
            Group: "Impera",
            status: "cerrado"
        },
        {
            id: "4",
            Description: "Create user for whole team in sell",
            dateCreated: "12-2-2026",
            reported: "Jean",
            Group: "IMPERA",
            status: "cerrado"
        },
        {
            id: "4",
            Description: "Create user for whole team in sell",
            dateCreated: "12-2-2026",
            reported: "Jean",
            Group: "IMPERA",
            status: "cerrado"
        },
        {
            id: "4",
            Description: "Create user for whole team in sell",
            dateCreated: "12-2-2026",
            reported: "Jean",
            Group: "IMPERA",
            status: "Cerrado"
        },
        {
            id: "4",
            Description: "Create user for whole team in sell",
            dateCreated: "12-2-2026",
            reported: "Jean",
            Group: "IMPERA"
        },
        {
            id: "4",
            Description: "Create user for whole team in sell",
            dateCreated: "12-2-2026",
            reported: "Jean",
            Group: "IMPERA"
        },
        {
            id: "4",
            Description: "Create user for whole team in sell",
            dateCreated: "12-2-2026",
            reported: "Jean",
            Group: "IMPERA"
        }
    ]);
    

    const newTicket = () => {
        setTicket([]);
    };

    
    //Function diseñada para la busqueda del usuario
    const search = (event) => {
        const value = event.target.value;

        

        if(value.trim() === "") {
            setUserValue(undefined)
            console.log("Input vacío");
            return;
        }

        const showValue = ticket.find(it => it.id === value );

        if (showValue === undefined) {
            setUserValue(null);
            console.log("No encontrado");
        
        } else {
            console.log(`${showValue.Description}`);
            setUserValue(showValue)
        }
    };

    //Funcion diseñada para la busqueda de estado de los tickets
    const searchStatus = (event ) => { 
        const value = event.target.value.trim().toLowerCase();

        const showValue = ticket.filter(it => it.status === value)
        

        if(value.trim() === "" ) {
            setUserValue(undefined)
            return;
        }else {
            console.log(`${showValue.Description}`);
            setUserValue(showValue)
        }
        }
        
    

    //cambio a Dashboard
    const mainContent = () => {    
        setOptions("Dashboard")
    }

    //cambio de contenido principal
    const onTicketsMainContent = () => { 
        setOptions("mainList")
    }

    //cambio a configuraciones
       const onConfigContent = () => { 
        setOptions("Config")
    }



    return (
        <dataContext.Provider
            value={{
                newTicket,
                ticket,
                search,
                userValue,
                noFoundTicket,
                options,
                mainContent,
                onTicketsMainContent,
                onConfigContent,
                apiTickets,
                setApiTickets,
                searchStatus,
                setUsernameClient,
                userNameClient,
                setUsernameClient,
                userNameClient,
                setPassword,
                password
                
            }}
        >
            {children}
        </dataContext.Provider>
    );
};

export default ContextData;
