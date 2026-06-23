import { LayoutDashboard, Ticket, Settings, LogOutIcon } from 'lucide-react';
import style from "./class.module.css"
import {dataContext} from "../context/index"
import { useContext } from 'react';




export function  Content ({onLogout}) {
    
    const {

        mainContent,
        onTicketsMainContent,
        options,
        onConfigContent
        
    } = useContext(dataContext)

     const logout = () => {
        onLogout(); 
    }

    return (
        <div className = {style.div}>
           <h3 onClick={mainContent} className= {options === "Dashboard" ? style.selected : ""} >
                <LayoutDashboard size={20} syle = {{marginRight: "10" }}/>
                Dashboard
            </h3>

            <h3 onClick={onTicketsMainContent} className= {options === "mainList" ? style.selected : ""} >
                <Ticket size={20} syle = {{marginRight: "10" }}/>
                Tickets
            </h3>

            <h3 onClick={onConfigContent} className= {options === "Config" ? style.selected : ""}>
                <Settings size={20} syle = {{marginRight: "10" }}/>
                Configuracion
            </h3>

            <h3 onClick={logout}>
                <LogOutIcon size={20} style = {{marginRight: "10" } }/>
                Sign out
            </h3>
        </div>
    )
}

export default Content; 