import React from "react";
// @ts-expect-error TS(2307): Cannot find module './style/PartnerCard.module.css... Remove this comment to see the full error message
import styles from './style/PartnerCard.module.css';


export default function PartnerCard(props: any) {
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log(props, 'las props partnerCard')
    return (
        <div className={styles.boxSingleCard2}>
            <h3>{props.partner}</h3>
            <h5>☆ {props.plan}</h5>
            <h4>$ {props.price}</h4>                
            <div className={styles.boxCard2}>
                <img className={styles.imageCard2} src={props.image} alt="logo" />

            </div>
                           
        </div>  

    )
}