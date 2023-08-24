import stylesScss from './shape.module.scss';

const Shape = (): JSX.Element => {
    return (
        <div className={`${stylesScss.screenBackground}`}>
            <span className={stylesScss.shapeTop1}></span>
            <span className={stylesScss.shapeButtom1}></span>
            <span className={stylesScss.shapeTop2}></span>
            <span className={stylesScss.shapeButtom2}></span>
            <span className={stylesScss.shapeTop3}></span>
            <span className={stylesScss.shapeButtom3}></span>
            <span className={stylesScss.shapeTop4}></span>
            <span className={stylesScss.shapeButtom4}></span>
        </div>
    )
}

export default Shape;