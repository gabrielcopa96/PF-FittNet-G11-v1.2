import stylesScss from './title.module.scss';
import type { TitleProps } from './interface/title.interface';
import { fontSizes, fontWeights } from './utils/title.utils';

const Title = ({ children, color, size = "md", weight = "normal" }: TitleProps): JSX.Element => {
  return (
    <h1
      className={`
        ${stylesScss.title} 
        ${size && fontSizes(size)} 
        ${weight && fontWeights(weight)}
      `}
      style={{ color: color }}
    >
      {children}
    </h1>
  )
}

export default Title;