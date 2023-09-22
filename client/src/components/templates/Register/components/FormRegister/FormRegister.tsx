import { InputText } from "../../../../atoms";
import InputEmail from "../../../../atoms/InputEmail/InputEmail";
import InputPassword from "../../../../atoms/InputPassword/InputPassword";
import { useHandleRegister } from "../../hooks/useHandleRegister";
import { Dropdown } from 'primereact/dropdown';
import stylesScss from "./formregister.module.scss";

const FormRegister = (): JSX.Element => {

  const { name, email, password, type, error } = useHandleRegister();

  const optionsSelect = [
    "user",
    "partner"
  ]

  return (
    <div className={stylesScss.form}>

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

    </div>
  )
}

export default FormRegister;