import { IconProps } from './interfaces/icon.interface';

const Icons = ({ name, width = "512", height = "512" }: IconProps): JSX.Element => {
  return (
    <svg width="512" height="512" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      {
        name === "chevron-down" && (
          <path fill="#ffffff" fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
        )
      }
    </svg>
  )
}

export default Icons;