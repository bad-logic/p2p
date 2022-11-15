import {
  connectToPair,
  usePeerContext,
} from 'context';
import { Button } from 'ui';

function App() {
  const { p2pState, dispatch } = usePeerContext();

  const connect = () => {
    connectToPair(dispatch, "back-application1");
  };

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
