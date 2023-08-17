import stylesScss from './text.module.scss';
import type { TextProps } from './interface/text.interface';
import { fontSizes } from './utils/text.utils';

const Text = ({ children, color, size = "md" }: TextProps): JSX.Element => {

  return (
    <p
      className={`${stylesScss.text} ${size && fontSizes(size)}`}
      style={{ color: color }}
    >
      {children}
    </p>
  )
}

export default Text;