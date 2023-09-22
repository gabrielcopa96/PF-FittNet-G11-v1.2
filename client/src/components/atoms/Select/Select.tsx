import { Dispatch, SetStateAction, useState } from "react";
import Text from "../Text/Text";
import stylesScss from "./select.module.scss";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";


interface SelectProps {
    options?: string[];
    value?: string;
    setValue: Dispatch<SetStateAction<string>>
}

const Select = ({ options, value, setValue }: SelectProps): JSX.Element => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <section className={stylesScss.container}>
            <div className={stylesScss.select} onClick={() => setIsOpen(!isOpen)}>
                <Text size="sm" color="#ff2767">{value ? value : "Seleccione un valor .."}</Text>
                {
                    isOpen ? <BsCaretUpFill /> : <BsCaretDownFill />
                }
            </div>
            {
                isOpen && (<Options values={options ? options : []} setValue={{
                    setOpen: setIsOpen,
                    set: setValue
                }}/>)
            }
        </section>
    )
}

interface OptionsProps {
    values: string[];
    setValue: {
        setOpen: Dispatch<SetStateAction<boolean>>;
        set: Dispatch<SetStateAction<any>>;
    };
}

const Options = ({ values, setValue }: OptionsProps): JSX.Element => {

    return (
        <section className={stylesScss.options}>
            {
                values.map((value, index) => {
                    return (
                        <div 
                            key={index} 
                            className={stylesScss.select_option}
                            onClick={() => {
                                setValue.set(value)
                                setValue.setOpen(false)
                            }}
                        >
                            {value}
                        </div>
                    )
                })
            }
        </section>
    )
}

Select.Options = Options;

export default Select;