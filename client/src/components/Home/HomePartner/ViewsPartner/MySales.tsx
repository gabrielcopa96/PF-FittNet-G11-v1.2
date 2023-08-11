import React from "react";
import IncomesGraph from "../../../Graphics/Incomes";
import { useSelector } from "react-redux";

export function MySales () {
    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    const user = useSelector((state)=>state.user)
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log(user, 'user de mysales')

    return (
        <div>
            <IncomesGraph />
        </div>
    )


}