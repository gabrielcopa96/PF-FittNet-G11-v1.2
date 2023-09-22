import { useState } from "react";
import { Button, Text, Title } from "../components/atoms";
import Link from "../components/atoms/Link/Link";
import Select from "../components/atoms/Select/Select";
import { Card, UserLogged } from "../components/molecules";

const TestingAtoms = (): JSX.Element => {

  const objCardInfo = {
    title: "Standard",
    pricing: "56",
    items: [
      "10 % de visibilidad",
      "Panel de control",
      "Historial de ventas",
      "Gestion de gimnasio",
      "Gestion de servicios",
      "Hasta 1 gimnasio",
      "5 servicios por gimnasios"
    ]
  }

  const [data, setData] = useState<any>("") 

  console.log(data, "mirame la data")

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "30%", gap: "1rem"}}>
        <Text>Heeeeeellloo</Text>
        <Title color="rgb(242, 137, 5)">This my title</Title>
        <Button>Accept</Button>
        <Link>Hola soy un link</Link>
        <UserLogged />
        <Card title={objCardInfo.title} pricing="9000" items={objCardInfo.items}/>
        <Select options={["1 - perro", "2 - gato", "3 - lechuza"]} setValue={setData}/>
    </div>
  )
}

export default TestingAtoms;