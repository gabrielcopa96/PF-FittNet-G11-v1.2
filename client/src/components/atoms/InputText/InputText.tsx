import stylesScss from './inputtext.module.scss';
import { InputTextProps } from './interfaces/input.interface';

const InputText = ({ onChange, value, name, placeholder = "escribe aqui ...", required = false, disabled = false }: InputTextProps): JSX.Element => {
  return (
    <input
      type="text"
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

export default InputText;