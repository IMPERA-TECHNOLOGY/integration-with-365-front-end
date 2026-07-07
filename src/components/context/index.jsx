import { createContext, useState, useEffect } from "react";


export const dataContext = createContext();

export const ContextData = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(null)

    //cambiar email por configuracion
    const [changeEmail, setChangeEmail] = useState()

    //cambiar nombre por configuracion
    const [changeName, setChangeName] = useState()


    const [userValue, setUserValue] = useState("");

    const [noFoundTicket, setNoFoundTicket] = useState();

    const [userInfo, setUserInfo] = useState()



    //Password del usuario
    const [password, setPassword] = useState()

    // username del usuario
    const [userNameClient, setUserNameClient] =useState()

    //Array con todos los tickets desde la BD
    const [apiTickets, setApiTickets] = useState([])


    //cambio de contenido principal
    const [options, setOptions] = useState("mainList")

    
    //Function diseñada para la busqueda del usuario
    const search = (event) => {
        const value = event.target.value;
        
        if(value.trim() === "") {
            setUserValue(undefined)
            console.log("Input vacío");
            return;
        }

        const showValue = apiTickets.find(it => it.ticket_number === value );

        if (showValue === undefined) {
            setUserValue(null);
            console.log("No encontrado");
            console.log(apiTickets)
        
        } else {
            console.log(showValue);
            setUserValue(showValue)
        }
    };

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

    // Objeto de registro
    const [registerUser, setRegisterUser] = useState({
    completeName:"",
    email:"",
    password:"",
    passwordConfirm:"",
    rol:"standard user"
    })



    return (
        <dataContext.Provider
            value={{

                search,
                userValue,
                noFoundTicket,
                options,
                mainContent,
                onTicketsMainContent,
                onConfigContent,
                apiTickets,
                setApiTickets,
                setUserNameClient,
                userNameClient,
                setPassword,
                setUserInfo,
                password,
                userInfo,
                registerUser,
                setRegisterUser,
                changeEmail,
                setChangeEmail,
                setChangeName,
                changeName,
                isAuthenticated,
                setIsAuthenticated                
            }}
        >
            {children}
        </dataContext.Provider>
    );

}

export default ContextData;
