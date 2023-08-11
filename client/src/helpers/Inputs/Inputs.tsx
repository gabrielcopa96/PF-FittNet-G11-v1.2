import React from "react";
// @ts-expect-error TS(2307): Cannot find module './styles/stylesInputs.module.c... Remove this comment to see the full error message
import styles from "./styles/stylesInputs.module.css";

export const InputPrymary = (props: any) => {
  const { onChange, type, password, name, placeholder } = props;

  return (
    <div className={styles.Field}>
      <input
        type={type}
        value={password}
        name={name}
        className={styles.Input}
        placeholder={placeholder}
        required
        onChange={onChange}
      />
    </div>
  );
};

export const InputSecond = (props: any) => {
  const { onClick, value, type } = props;

  return (
    <div>
      <input
        className={styles.Submit}
        type={type}
        value={value}
        onClick={onClick}
      />
    </div>
  );
};

export const InputPrimaryFormUsers = (props: any) => {
  const { value, type, name, placeholder, onChange, padding } = props;

  const inputStylesLinea = {
    padding: padding,
  };

  return (
    <div className={styles.FieldAlternative}>
      <input
        type={type}
        value={value}
        name={name}
        className={styles.InputAlternative}
        placeholder={placeholder}
        onChange={onChange}
        // @ts-expect-error TS(2322): Type '{ type: any; value: any; name: any; classNam... Remove this comment to see the full error message
        padding={padding}
        style={inputStylesLinea}
      />
    </div>
  );
};
