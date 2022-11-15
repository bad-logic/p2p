### P2P COMMUNICATION

- App1 and App2 uses p2p communication to communicate with each other.
- Peerjs server helps establishing connections between these apps.

#### [Backend](./p2pserver/)

#### [Frontend](./frontend/)

- frontend uses [turborepo](https://turbo.build/repo/docs).
- frontend is divided into [applications](./frontend/applications/) and [packages](./frontend/packages/)
- [Applications](./frontend/) folder contains two react apps.
- [packages](./frontend/packages/) folder contains [tsconfigs](./frontend/packages/tsconfig/), shared [ui](./frontend/packages/ui/) and shared [contexts](./frontend/packages/context/)

---

[Peerjs-server](https://github.com/peers/peerjs-server)
[peerjs](https://peerjs.com/)
[learn more](https://hacks.mozilla.org/2013/07/webrtc-and-the-ocean-of-acronyms/)
