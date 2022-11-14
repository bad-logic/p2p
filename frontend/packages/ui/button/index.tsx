import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export const Button = (props: ButtonProps) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

export default Button;
