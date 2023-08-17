import stylesScss from './avatar.module.scss';
import { AvatarProps } from './interface/avatar.interface';

const Avatar = ({ src, size = "md", alt = "avatar" }: AvatarProps): JSX.Element => {
  return (
    <div className={`${stylesScss.avatar} ${size && stylesScss[size]}`}>
      <img src={src ? src : "https://images.vexels.com/content/145908/preview/male-avatar-maker-2a7919.png"} alt={alt} />
    </div>
  )
}

export default Avatar;