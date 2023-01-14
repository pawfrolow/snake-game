import classNames from "classnames";
import React, { FC } from "react";
import styles from "./style.module.scss";

type ControlSelectType = {
    value: string;
    onChange: (value: string) => void;
    title: string,
    values: string[]
};

const ControlSelect: FC<ControlSelectType> = ({ value, values, onChange, title }) => {
    return (
        <div className={styles["speed-block"]}>
            <div className={styles["speed-text"]}>{title.toUpperCase()}:</div>
            <div className={styles["radio-group"]}>
                {values.map((item) => (
                    <button
                        key={item}
                        className={classNames(
                            styles["radio-item"],
                            item,
                            value === item && styles["checked"]
                        )}
                        onClick={() => value !== item && onChange(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ControlSelect;
