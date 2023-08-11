import React, { useEffect } from "react";
import IncomesAdmin from "../../../Graphics/IncomesAdmin";
import { getAllSales, getUser } from "../../../../redux/actions";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Finances() {

    let { userId } = useParams();
    
    const dispatch = useDispatch();
  
    useEffect(()=>{
      // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
      dispatch(getUser(userId))
      // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
      dispatch(getAllSales(userId))// eslint-disable-next-line
    },[userId])


    return (      
        <div>
            <IncomesAdmin/>
        </div> 
    )

}