import stylesScss from './text.module.scss';
import type { TextProps } from './interface/text.interface';

const Text = ({ children, color, size = "md", weight = "normal" }: TextProps): JSX.Element => {

  return (
    <p
      className={`${stylesScss.text} ${size && stylesScss[size]} ${weight && stylesScss[weight]}`}
      style={{ color: color }}
    >
      {children}
    </p>
  )
}

export default Text;