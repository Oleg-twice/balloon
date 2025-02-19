import { ButtonHTMLAttributes, memo } from "react";
import './Button.css';

export interface CustomButtonProps {
    text: string,
    size?: 'lg' | 'sm',
    className?: string,
  }
  
  type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & CustomButtonProps;

export const Button = ({ text, className = '', children, ...buttonProps }: ButtonProps) => <button className={`button ${className}`} {...buttonProps}>
    <span className="text-holder">{text || children}</span>
</button>;

export default memo(Button);
