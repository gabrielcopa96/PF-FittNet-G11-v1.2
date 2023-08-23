import stylesScss from "./styles/loading.module.scss";

const Loading = () => {
  return (
    <div className={stylesScss.loaderContainer}>
        <span className={stylesScss.loader}></span>
    </div>
  )
}

export default Loading;