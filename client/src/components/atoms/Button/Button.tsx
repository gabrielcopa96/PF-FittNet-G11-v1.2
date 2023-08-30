import stylesScss from './button.module.scss';
import type { ButtonProps } from './interface/button.interface';

const Button = (props: ButtonProps): JSX.Element => {

  const {
    children,
    onClick,
    size = "md",
    variant = "solid",
    effect = "none", 
    shape = "rounded", 
    type = "primary",
    weight = "bold",
    width = "w-md"
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
        ${weight && stylesScss[weight]}
        ${width && stylesScss[width]}
      `}
    >
      {children}
    </div>
  )
}

export default Button;