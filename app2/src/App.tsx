import { useEffect } from "react";
import { Peer, DataConnection } from "peerjs";

let peer: Peer;
let connection: DataConnection;

function App() {
  function connect() {
    connection = peer.connect("application1", {
      reliable: true,
    });
    connection.on("error", (error) => {
      console.error(error);
    });

    connection.on("open", () => {
      console.info("connected to a peer in P2P network");
      console.log({ connection });
      connection.send("Hello!");
    });

    connection.on("data", (data) => {
      console.log("data", data);
    });
  }

  useEffect(() => {
    peer = new Peer("application2", {
      secure: true,
      host: "localhost",
      port: 443,
      path: "/p2p",
    });
    peer.on("open", (id) => {
      console.info(`Peer with identifier ${id} registered for P2P network`);
    });
    peer.on("error", (error) => {
      console.error(error);
    });

    return () => {
      connection && peer._removeConnection(connection);
      peer.destroy();
    };
  }, []);

  return (
    <div className="App2">
      App2
      <button onClick={connect}>Connect</button>
    </div>
  );
}

export default App;
