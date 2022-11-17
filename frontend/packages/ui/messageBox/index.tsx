import React from 'react';

interface MessageProps {
  value: string;
  onChange: (m: string) => void;
}

export const MessageBox: React.FC<MessageProps> = (props) => {
  return (
    <>
      <input
        className="m-2 border border-slate-300 hover:border-slate-400"
        type="text"
        value={props.value}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
      ></input>
    </>
  );
};

export default MessageBox;
