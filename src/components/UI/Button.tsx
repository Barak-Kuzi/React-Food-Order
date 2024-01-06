import React from "react";

interface ButtonProps {
    textOnly: boolean,
    children: React.ReactNode,
    className?: string,
    onClick?: () => void
    type?: "button" | "submit" | "reset"
}

export default function Button({textOnly, className, children, ...props}: ButtonProps): React.JSX.Element {
    const cssClasses: string = textOnly ? `text-button ${className}` : `button ${className}`;

    return (
        <button className={cssClasses} {...props}>
            {children}
        </button>
    );
}