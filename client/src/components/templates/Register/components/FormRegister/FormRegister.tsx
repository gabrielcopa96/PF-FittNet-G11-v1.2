import { Button, InputText } from "../../../../atoms";
import InputEmail from "../../../../atoms/InputEmail/InputEmail";
import InputPassword from "../../../../atoms/InputPassword/InputPassword";
import { useHandleRegister } from "../../hooks/useHandleRegister";
import { Dropdown } from 'primereact/dropdown';
import stylesScss from "./formregister.module.scss";
import Select from "../../../../atoms/Select/Select";

const FormRegister = (): JSX.Element => {

  const { name, email, password, type, error, handleRegister } = useHandleRegister();

  const optionsSelect = [
    "user",
    "partner"
  ]

  console.log(type.get , "mirame este valor")

  return (
    <form className={stylesScss.form}>

      <InputText
        value={name.get}
        placeholder="Escriba su nombre..."
        onChange={(e) => name.set(e.target.value)}
      />

      <InputEmail
        value={email.get}
        placeholder="Escriba su e-mail..."
        onChange={(e) => email.set(e.target.value)}
      />

      <InputPassword
        value={password.get}
        placeholder="Escriba su clave..."
        onChange={(e) => password.set(e.target.value)}
      />

      <Select options={optionsSelect} value={type.get} setValue={type.set}/>

      <Button
        size="md"
        type="terciary"
        onClick={() => handleRegister()}
      >
        Registrarme
      </Button>

    </form>
  )
}

export default FormRegister;