import { ReactNode } from "react";
import "../styles/IconInput.scss";

type IconInputProps = {
    className?: string,
    leftIcon: ReactNode,
    rightIcon?: ReactNode,
    children: ReactNode,
}

function IconInput({ className, leftIcon, rightIcon, children }: IconInputProps) {
    return (
        <div className={`${className ?? ""} icon-input`}>
            <div className="icon-input__left">
                {leftIcon}
            </div>
            {children}
            {rightIcon ?
                <div className="icon-input__right">
                    {rightIcon}
                </div>
                : null}
        </div>
    );
}

export default IconInput;