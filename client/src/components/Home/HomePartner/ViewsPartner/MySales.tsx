import IncomesGraph from "../../../Graphics/Incomes";
import { useSelector } from "react-redux";

export function MySales(): JSX.Element {
    const user = useSelector((state: any) => state.user)

    return (
        <>
            <IncomesGraph />
        </>
    )
}