// @ts-expect-error TS(2307): Cannot find module './styles/mygym.module.css' or ... Remove this comment to see the full error message
import styles from "./styles/mygym.module.css";

export function MyClients() {

    return (
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div className={styles.containMainMyGyms}>
           {/* <ClientsGraph/> */}
        </div>
    );
}