import { useEffect } from "react";
import { Peer } from "peerjs";

let peer: Peer;

function App() {
  useEffect(() => {
    peer = new Peer("application1", {
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

    peer.on("connection", (conn) => {
      console.log({ conn });
      conn.on("data", (data) => {
        console.log("[+] Received data", data);
        conn.send("[+] ack");
      });
    });

    return () => {
      peer.destroy();
    };
  }, []);

  return <div className="App">App1</div>;
}

export default App;
