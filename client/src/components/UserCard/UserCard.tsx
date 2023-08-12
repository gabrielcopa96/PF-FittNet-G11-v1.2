import React from "react";
// @ts-expect-error TS(2307): Cannot find module './style/UserCard.module.css' o... Remove this comment to see the full error message
import styles from './style/UserCard.module.css';


export default function UserCards(props: any) {
    console.log(props, 'las props')
    return (
        <div className={styles.boxSingleCard2}>
            <h3>{props.user}</h3>
            <h5>{props.plan === 'premium' ? '♢' : '☆'} {props.plan}</h5>
            <h4>$ {props.price}</h4>                
            <div className={styles.boxCard2}>
                <img className={styles.imageCard2} src={props.image} alt="logo" />

            </div>
                           
        </div>  

    )
}