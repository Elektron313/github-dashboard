import React from "react";

type PropsType = {
    value: string,
    onChange: (param: string) => void,
}

const CustomInput: React.FC<PropsType> = ({onChange, value}) => {
    const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value);
    };

    return (
        <div className={'custom-input'}>
            <input
                className={'custom-input__inner'}
                onChange={onChangeInput}
                value={value}
            />
        </div>
    )
};

export default CustomInput