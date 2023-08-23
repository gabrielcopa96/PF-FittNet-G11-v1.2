import ClientsGraph from "../../../Graphics/GraphClient";
import styles from "./styles/mygym.module.css";

export function MyClients(): JSX.Element {

    return (
        <div className={styles.containMainMyGyms}>
           <ClientsGraph/>
        </div>
    );
}