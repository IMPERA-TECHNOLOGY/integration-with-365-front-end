import styles from "./layout.module.css"
import { useContext, useState } from "react";
import { dataContext } from "../context/index.jsx"
import { LayoutCards as DashboardCards } from "../dashboards/layout.jsx";
import Impera from "../images/impera.png"
import {Config} from "../Config/index.jsx"



export function Layout({mainList, asideContent}) {


    const {
        search,
        options
    } = useContext(dataContext);


    return (
        
        
        <div className={styles.main}>

            <aside className={styles.sidebar}>  
                {asideContent}             
            </aside>

            <div className={styles.contentWrapper}> 

                <header className={styles.header}>
                    <h3> Ticket Impera App</h3>
                    <div className={styles.userBrandGroup}>     
                        <img src= {Impera} alt= "Impera" style={{ width: '150px', height: '100px' }}  />
                    </div>    
                </header>
                        
                <main className={styles.mainContent}>
                    {options === "mainList" && (
                        <div className={styles.div}>
                            <input type="text" placeholder="Buscar tickets por ID..." onChange={(event) => search(event)} />
                        </div>
                    )}
                    

                    <div 
                        className={styles.tablaContenedor} 
                        style={{ overflowY: options === 'mainList' ? 'auto' : 'hidden' }}>
    
                        {options === "Dashboard" && <DashboardCards/>}
                        {options === "mainList" && mainList}
                        {options === "Config" && <Config/>}
                        
                    </div>
                </main>

                <footer className={styles.footer}>
                    Impera Global 2026
                </footer>  

            </div>              
        </div>
    )

}
export default Layout;

