import {
  PeerConnectOption,
  PeerJSOption,
  Peer as P,
  DataConnection,
} from "peerjs";

const peerConfig: PeerJSOption = {
  host: "localhost",
  port: 80,
  path: "/p2p",
};

const peerConnectionConfig: PeerConnectOption = {
  reliable: true,
};

export default class Peer extends P {
  private _peer: P;
  private _pair: string | undefined = undefined;
  private _pairConnection: DataConnection | undefined = undefined;

  constructor(id: string = "", options?: PeerJSOption) {
    super();
    this._peer = new P(id, {
      ...peerConfig,
      ...options,
    });
  }

  reconnect() {
    this._peer.reconnect();
  }

  async getAvailablePairs(): Promise<string[]> {
    return new Promise((resolve, _) => {
      this._peer.listAllPeers((pairs) => {
        return resolve(pairs);
      });
    });
  }

  pair(peerId: string, options?: PeerConnectOption) {
    if (this._pairConnection) {
      throw new Error(
        `Already paired with peer -> ${this._pair}. cannot pair with more than one peer`
      );
    }
    const peers = this._peer.listAllPeers();
    console.log({ peers });
    this._pairConnection = this._peer.connect(peerId, {
      ...peerConnectionConfig,
      ...options,
    });
    this._pair = peerId;
  }

  unpair() {
    if (!this._pairConnection) {
      throw new Error("no pair to unpair");
    }
    this._peer._removeConnection(this._pairConnection);
  }

  destroy() {
    this._peer.destroy();
  }
}

export { Peer };
