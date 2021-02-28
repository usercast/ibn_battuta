import { TreeMirrorClient } from "tree-mirror";
import { postRequest } from "request";

class Replicator {
  constructor() {
    this.startMirroring();
  }

  socketSend(msg) {
    console.log(JSON.stringify(msg));
    const url = "http://localhost:3000/stream";
    postRequest(url, msg);
  }

  startMirroring() {
    this.socketSend({ base: location.href.match(/^(.*\/)[^\/]*$/)[1] });

    new TreeMirrorClient(document, {
      initialize: (rootId, children) => {
        this.socketSend({
          f: "initialize",
          args: [rootId, children]
        });
      },

      applyChanged: (removed, addedOrMoved, attributes, text) => {
        this.socketSend({
          f: "applyChanged",
          args: [removed, addedOrMoved, attributes, text]
        });
      }
    });
  }
}

export default Replicator;
