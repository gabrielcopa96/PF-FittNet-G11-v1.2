import { InputEmailProps } from "./interfaces/inputemail.interface";
import stylesScss from "./inputemail.module.scss";

const InputEmail = (props: InputEmailProps): JSX.Element => {

    const { onChange, value, name, placeholder = "escribe aqui ...", required = false, disabled = false } = props

    return (
        <input
            type="email"
            name={name && name}
            value={value}
            className={stylesScss.input}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
        />
    )
}

export default InputEmail;