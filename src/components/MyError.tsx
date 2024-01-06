import React from "react";

interface MyErrorProps {
    title: string,
    errorMsg: string
}


export default function MyError({title, errorMsg}: MyErrorProps): React.JSX.Element {
    return (
        <div className="error">
            <h2>{title}</h2>
            <p>{errorMsg}</p>
        </div>
    );
}