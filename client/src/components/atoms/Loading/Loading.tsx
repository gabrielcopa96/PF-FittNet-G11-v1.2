import stylesScss from "./laoding.module.scss";

const Loading = (): JSX.Element => {
  return (
    <div className={stylesScss.loaderContainer}>
        <span className={stylesScss.loader}></span>
    </div>
  )
}

export default Loading;