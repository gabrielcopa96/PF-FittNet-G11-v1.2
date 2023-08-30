import { useNavigate } from 'react-router-dom';
import stylesScss from './logo.module.scss';
import type { LogoProps } from './interface/logo.interface';

const Logo = ({ size = "md", theme = "light" }: LogoProps): JSX.Element => {

  const LogoUrl = theme === "light" ? import.meta.env.VITE_LOGO_URL as string : import.meta.env.VITE_LOGO_URL_DARK;

  const navigate = useNavigate();

  return (
    <img
      onClick={() => navigate("/")}
      className={`${stylesScss.logo} ${size && stylesScss[size]}`}
      src={LogoUrl}
      alt=""
    />
  )
}

export default Logo;