### P2P COMMUNICATION

- [App1](./frontend/applications/app1/) and [App2](./frontend/applications/app2/) uses p2p communication to communicate with each other.
- Peerjs server helps establishing connections between these apps.

#### [Backend](./p2pserver/)

- uses p2p [server](https://github.com/peers/peerjs-server)

#### [Frontend](./frontend/)

- frontend uses [turborepo](https://turbo.build/repo/docs).
- frontend is divided into [applications](./frontend/applications/) and [packages](./frontend/packages/)
- [Applications](./frontend/) folder contains two react apps.
- [packages](./frontend/packages/) folder contains [tsconfigs](./frontend/packages/tsconfig/), shared [ui](./frontend/packages/ui/) and shared [contexts](./frontend/packages/context/)

##### How to run applications ?

**_Backend_**

```
$ cd p2pserver
$ docker-compose up
```

**_Frontend_**

```
$ cd frontend
$ pnpm run dev
```

---

[Peerjs-server](https://github.com/peers/peerjs-server)\
[peerjs](https://peerjs.com/)\
[learn more](https://hacks.mozilla.org/2013/07/webrtc-and-the-ocean-of-acronyms/)
