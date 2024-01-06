import React from "react";

interface InputProps {
    id: string,
    label: string
    type: string
}

export default function Input({id, label, type}: InputProps): React.JSX.Element {
    return (
        <p className="control">
            <label htmlFor={id}>{label}</label>
            <input id={id} name={id} type={type} required/>
        </p>
    );
}