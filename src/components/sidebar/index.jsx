import { LayoutDashboard, Ticket, Settings, LogOutIcon } from 'lucide-react';
import style from "./class.module.css"
import {dataContext} from "../context/index"
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;





export function  Sidebar ({onLogout}) {
    
    const {

        mainContent,
        onTicketsMainContent,
        options,
        onConfigContent,
        setIsAuthenticated,
        setUserNameClient,
        setPassword     
    } = useContext(dataContext)

     const logout = () => {
        onLogout(); 
    }

    const signOut = async () => {

        const response = await fetch(`${API_URL}/logout`, {
            method: "POST",
            headers: {"content-type": "application/json"},
            credentials: "include"
        })

        if(response.ok) {
            console.log("seccion cerrada")
            setIsAuthenticated(false)
            setPassword(" ")
            setUserNameClient(" ")
            

        }
    }


    return (
        <div className = {style.div}>
           <h3 onClick={mainContent} className= {options === "Dashboard" ? style.selected : ""} >
                <LayoutDashboard size={20} style = {{marginRight: "10px" }}/>
                Dashboard
            </h3>

            <h3 onClick={onTicketsMainContent} className= {options === "mainList" ? style.selected : ""} >
                <Ticket size={20} style = {{marginRight: "10px" }}/>
                Tickets
            </h3>

            <h3 onClick={onConfigContent} className= {options === "Config" ? style.selected : ""}  >
                <Settings size={20} style = {{marginRight: "10px"}}/>
                Configuracion
            </h3>

            <h3 onClick={signOut}>
                <LogOutIcon size={20} style = {{marginRight: "10px" } }/>
                Sign out
            </h3>
        </div>
    )
}

export default Sidebar; 