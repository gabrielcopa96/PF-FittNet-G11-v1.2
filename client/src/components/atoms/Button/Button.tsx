import stylesScss from './button.module.scss';
import type { ButtonProps } from './interface/button.interface';

const Button = (props: ButtonProps): JSX.Element => {

  const {
    children,
    onClick,
    size = "md",
    variant = "solid", //completed
    effect = "none", 
    shape = "rounded", //completed
    type = "primary" //in process
  } = props;

  return (
    <div
      onClick={onClick}
      className={`
        ${stylesScss.button}
        ${size && stylesScss[size]}
        ${variant && stylesScss[variant]}
        ${effect && stylesScss[effect]}
        ${shape && stylesScss[shape]}
        ${type && stylesScss[type]}
      `}
    >
      {children}
    </div>
  )
}

export default Button;