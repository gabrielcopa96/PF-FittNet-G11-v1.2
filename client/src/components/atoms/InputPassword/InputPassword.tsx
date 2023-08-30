import { InputPasswordProps } from "./interfaces/inputpassword.interface";
import stylesScss from "./inputpassword.module.scss";

const InputPassword = ({ onChange, value, name, placeholder = "escribe aqui ...", required = false, disabled = false }: InputPasswordProps): JSX.Element => {
    return (
        <input
            type="password"
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

export default InputPassword;