import { Button, Text, Title } from "../components/atoms";
import Link from "../components/atoms/Link/Link";

const TestingAtoms = (): JSX.Element => {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "30%", gap: "1rem"}}>
        <Text>Heeeeeellloo</Text>
        <Title color="rgb(242, 137, 5)">This my title</Title>
        <Button>Accept</Button>
        <Link>Hola soy un link</Link>
    </div>
  )
}

export default TestingAtoms;