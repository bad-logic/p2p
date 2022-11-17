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
      <h1 className="text-lg">Application 1</h1>
      <Button
        onClick={connect}
        text={
          p2pState.connection
            ? "Connected to Application 2"
            : "Connect to Application 2"
        }
        disabled={p2pState.connection ? true : false}
      />
      {p2pState.connection && (
        <div>
          <MessageBox value={message} onChange={updateMessage} />
          <Button text="sendMessage" onClick={send} />
        </div>
      )}
    </div>
  );
}

export default App;
