// // pusher.js
import Pusher from "pusher-js";

const pusher = new Pusher({
  appId: "1656270",
  key: "556f5cee277b4c7c22d7",
  secret: "342c2f70e9382ffdb571",
  cluster: "eu",
  encrypted: true, // Use encrypted connection
});

export default pusher;
