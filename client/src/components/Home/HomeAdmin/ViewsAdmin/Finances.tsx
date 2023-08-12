import { useEffect } from "react";
import IncomesAdmin from "../../../Graphics/IncomesAdmin";
import { getAllSales, getUser } from "../../../../redux/actions";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Finances(): JSX.Element {

    let { userId } = useParams();
    
    const dispatch = useDispatch();
  
    useEffect(()=>{
      dispatch((getUser(userId) as any))
      dispatch((getAllSales(userId) as any))// eslint-disable-next-line
    },[userId])


    return <IncomesAdmin/>
}