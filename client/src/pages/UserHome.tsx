import NavBarProfile from "../components/NavBarProfile/NavBarProfile";
import Paginated from "../components/paginated/paginated";
import GymCards from "../components/GymCards/GymCards";

const UserHome = (): JSX.Element => {
    return (            
        <>                
            <NavBarProfile/>
            <Paginated/>
            <GymCards/>               
        </>         
    )
}

export default UserHome;