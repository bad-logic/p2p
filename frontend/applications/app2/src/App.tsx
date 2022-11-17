import { useState } from 'react';

import {
  connectToPair,
  sendMessageToPair,
  usePeerContext,
} from 'context';
import {
  Button,
  MessageBox,
} from 'ui';

function App() {
  const { p2pState, dispatch } = usePeerContext();
  const [message, setMessage] = useState<string>("");

  const connect = () => {
    connectToPair(dispatch, "back-application1");
  };

  const updateMessage = (message: string) => {
    setMessage(message);
  };

  const send = () => {
    sendMessageToPair(dispatch, { message });
    setMessage("");
  };

  return (
    <div>
      App2
      <Button
        onClick={connect}
        text={
          p2pState.connection
            ? "Connected to back Facing app"
            : "Connect to back Facing app"
        }
        disabled={p2pState.connection ? true : false}
      />
      <div>
        <MessageBox value={message} onChange={updateMessage} />
        <Button text="sendMessage" onClick={send} />
      </div>
    </div>
  );
}

export default App;
