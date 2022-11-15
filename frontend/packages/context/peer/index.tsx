import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import {
  DataConnection,
  Peer,
} from 'peerjs';

type P2P_EVENTS =
  | "P2P_REGISTRATION"
  | "P2P_PAIRING"
  | "SET_P2P_PAIRING"
  | "SEND_MESSAGE"
  | "DESTROY";

const enum P2P_CONNECTION_TYPE {
  FRONT = "front",
  BACK = "back",
}

type P2PState = {
  peer: Peer | null;
  connection: DataConnection | null;
  type: P2P_CONNECTION_TYPE;
};

type PeerProviderProps = {
  children: React.ReactNode;
  type: P2P_CONNECTION_TYPE;
  p2pId: string;
};

type ActionType = {
  type: P2P_EVENTS;
  payload?: any;
};

type PeerContextProps = {
  p2pState: P2PState;
  dispatch: React.Dispatch<ActionType>;
};

const initialObjects: Record<string, P2PState> = {
  front: {
    peer: null,
    connection: null,
    type: P2P_CONNECTION_TYPE.FRONT,
  },
  back: {
    peer: null,
    connection: null,
    type: P2P_CONNECTION_TYPE.BACK,
  },
};

const peerReducer = (prevState: P2PState, action: ActionType) => {
  switch (action.type) {
    case "P2P_REGISTRATION": {
      let newState = { ...prevState };
      if (!prevState.peer && action.payload.id && action.payload.type) {
        console.log("socket:conn->create");
        const peer = new Peer(`${action.payload.type}-${action.payload.id}`, {
          secure: true,
          host: "localhost",
          port: 443,
          path: "/p2p",
        });
        newState = {
          ...prevState,
          peer: peer,
          type: action.payload.type,
        };
      }
      return newState;
    }

    case "P2P_PAIRING": {
      let newState = { ...prevState };

      if (!prevState.connection && prevState.peer && action.payload.pairId) {
        // check for pairing capabilities
        if (
          (prevState.type === P2P_CONNECTION_TYPE.BACK &&
            action.payload.pairId.startsWith(P2P_CONNECTION_TYPE.BACK)) ||
          (prevState.type === P2P_CONNECTION_TYPE.FRONT &&
            action.payload.pairId.startsWith(P2P_CONNECTION_TYPE.FRONT))
        ) {
          throw new Error(
            `${prevState.type} cannot pair with ${prevState.type}`
          );
        }
        const connection = prevState.peer.connect(action.payload.pairId, {
          reliable: true,
        });
        newState = { ...prevState, connection };
      }
      return newState;
    }

    case "SET_P2P_PAIRING": {
      let newState = { ...prevState };
      if (
        !prevState.connection &&
        prevState.peer &&
        action.payload.connection
      ) {
        newState = { ...prevState, connection: action.payload.connection };
      }
      return newState;
    }
    case "SEND_MESSAGE": {
      if (prevState.connection) {
        prevState.connection.send(action.payload);
        return { ...prevState };
      }
      throw new Error("No P2P Pair Found. Try connecting to one of the pair");
    }
    case "DESTROY": {
      if (prevState.peer) {
        console.log("removing listeners");
        if (prevState.connection) {
          prevState.connection.removeAllListeners();
          prevState.peer._removeConnection(prevState.connection);
        }
        prevState.connection?.removeAllListeners();
        prevState.peer.destroy();
      }
      return { ...initialObjects[prevState.type] };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const PeerContext = createContext<PeerContextProps | null>(null);
PeerContext.displayName = "P2P";

const PeerProvider = ({ children, type, p2pId }: PeerProviderProps) => {
  const [state, dispatch] = useReducer(peerReducer, initialObjects[type]);

  useEffect(() => {
    if (state.peer) {
      state.peer.on("open", (id) => {
        console.info(`Peer with identifier ${id} registered for P2P network`);
      });
      // peer.on("disconnected", (conn) => {
      //   console.log("disconnected");
      //   peer.reconnect();
      // });
      state.peer.on("error", (error) => {
        console.error(error);
      });

      state.peer.on("connection", (conn) => {
        dispatch({
          type: "SET_P2P_PAIRING",
          payload: {
            connection: conn,
          },
        });
      });
    }
  }, [state.peer]);

  useEffect(() => {
    if (state.connection) {
      state.connection.on("error", (error) => {
        console.error(error);
      });

      state.connection.on("open", () => {
        console.info("connected to a peer in P2P network");
      });

      state.connection.on("data", (data) => {
        console.log("data", data);
        // register handlers of the messages for front application
      });
    }
  }, [state.connection]);

  useEffect(() => {
    console.log("socket:conn");
    dispatch({
      type: "P2P_REGISTRATION",
      payload: {
        id: p2pId,
        type,
      },
    });

    return () => {
      console.log("return useEffect");

      dispatch({
        type: "DESTROY",
      });

      console.log("socket:dest");
    };
  }, []);

  return (
    <PeerContext.Provider value={{ p2pState: state, dispatch }}>
      {children}
    </PeerContext.Provider>
  );
};

const usePeerContext = () => {
  const context = useContext(PeerContext);
  if (!context) {
    throw new Error(`P2P Context must be used within P2P Provider`);
  }
  return context;
};

const connectToPair = (
  dispatch: React.Dispatch<ActionType>,
  pairId: string
) => {
  dispatch({
    type: "P2P_PAIRING",
    payload: {
      pairId,
    },
  });
};

const sendMessageToPair = (
  dispatch: React.Dispatch<ActionType>,
  payload: any
) => {
  dispatch({
    type: "SEND_MESSAGE",
    payload,
  });
};

export default PeerProvider;

export {
  connectToPair,
  P2P_CONNECTION_TYPE,
  PeerProvider,
  sendMessageToPair,
  usePeerContext,
};
