import { Peer } from "peerjs";

function App() {
  const peer = new Peer("app2", {
    host: "localhost",
    port: 80,
    path: "/peers",
  });
  const conn = peer.connect("app1");
  conn.on("open", () => {
    conn.send("hi!");
  });
  peer.on("connection", (conn) => {
    conn.on("data", (data) => {
      // Will print 'hi!'
      console.log(data);
    });
    conn.on("open", () => {
      conn.send("hello!");
    });
  });
  return <div className="App">App2</div>;
}

export default App;
