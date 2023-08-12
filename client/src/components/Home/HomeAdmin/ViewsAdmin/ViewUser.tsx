import GymCards from "../../../GymCards/GymCards";

export default function ViewUsers(): JSX.Element {
    return (
        <>
            <div style={{padding: "10px"}}>
                <a style={{padding: "10px", color: "#fff", fontSize:"18px" }} 
                href="/home/user/toni/eliddelusuario/unavatar">Experiencia user</a>
                 <p>Ingrese en "experiencia user" para recorrer la app como un usuario final.</p>
            </div>
            <GymCards/>   
        </>
        
    )
}