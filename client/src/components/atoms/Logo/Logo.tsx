import { useNavigate } from 'react-router-dom';
import stylesScss from './logo.module.scss';
import type { LogoProps } from './interface/logo.interface';

const LogoUrl = import.meta.env.VITE_LOGO_URL as string;

const Logo = ({ size = "md" }: LogoProps): JSX.Element => {

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