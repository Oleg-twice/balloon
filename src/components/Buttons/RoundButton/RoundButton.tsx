import { ButtonHTMLAttributes, memo } from "react";
import './RoundButton.css';

const RoundButton = ({
    children,
    className,
    ...restProps
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button className={`round-button ${className}`} {...restProps}>{children}</button>
);

export default memo(RoundButton);
