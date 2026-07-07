import style from "./style.module.css"


export function Loading ()  {
    return (
        <div className ={style.container}>
            <div className={style.spinner}></div>
            <h2> Verificando .....</h2>
        </div>
        
    )
}





export default Loading