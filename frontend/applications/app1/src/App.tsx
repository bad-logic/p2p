import {
  connectToPair,
  usePeerContext,
} from 'context';
import { Button } from 'ui';

function App() {
  const { p2pState, dispatch } = usePeerContext();

  const connect = () => {
    connectToPair(dispatch, "front-application2");
  };

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
