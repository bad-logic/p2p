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
    connectToPair(dispatch, "front-application2");
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
      App1
      <Button
        onClick={connect}
        text={
          p2pState.connection
            ? "Connected to front Facing app"
            : "Connect to front Facing app"
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
