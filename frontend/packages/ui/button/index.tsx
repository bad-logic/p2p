import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button onClick={props.onClick} disabled={props.disabled}>
      {props.text}
    </button>
  );
};

export default Button;
