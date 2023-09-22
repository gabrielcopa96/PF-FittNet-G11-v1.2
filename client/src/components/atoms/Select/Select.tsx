import { Children, PropsWithChildren, useState } from "react";
import Text from "../Text/Text";
import stylesScss from "./select.module.scss";


const Select = ({ children }: PropsWithChildren): JSX.Element => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <section>
            <div className={stylesScss.select} onClick={() => setIsOpen(!isOpen)}>
                <Text size="sm">Seleccione un valor ...</Text>
            </div>
            {
                isOpen && Children.map(children, (child: any) => {
                    if (child.type == Options) {
                        console.log("muestro mis datos")
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

interface OptionsProps {
    values: string[];
}

const Options = ({ values }: OptionsProps): JSX.Element => {
    return (
        <section>
            {
                values.map((value, index) => {
                    return (
                        <div key={index}>
                            <Text size="sm">{value}</Text>
                        </div>
                    )
                })
            }
        </section>
    )
}

Select.Options = Options;

export default Select;