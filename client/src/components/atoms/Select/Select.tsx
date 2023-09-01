import { Children, PropsWithChildren } from "react";
import Text from "../Text/Text";
import stylesScss from "./select.module.scss";


const Select = ({ children }: PropsWithChildren): JSX.Element => {
    return (
        <section>
            <div className={stylesScss.select}>
                <Text size="sm">Seleccione un valor ...</Text>
            </div>
            {
                Children.map(children, (child: any) => {
                    if(child.type == Options) {
                        return child;
                    } else {
                        console.warn("Tienes que usar la sintaxis <Select.Options> para poder visualizar las opciones")
                        return null
                    }
                })
            }
        </section>
    )
}

const Options = (): JSX.Element => {
    return (
        <div>a</div>
    )
}

Select.Options = Options;

export default Select;