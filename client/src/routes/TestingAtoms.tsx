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

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "30%", gap: "1rem"}}>
        <Text>Heeeeeellloo</Text>
        <Title color="rgb(242, 137, 5)">This my title</Title>
        <Button>Accept</Button>
        <Link>Hola soy un link</Link>
        <UserLogged />
        <Card title={objCardInfo.title} pricing="9000" items={objCardInfo.items}/>
        <Select>
          <Select.Options values={["1 - prueba", "2 - prueba 2"]}/>
        </Select>
    </div>
  )
}

export default TestingAtoms;