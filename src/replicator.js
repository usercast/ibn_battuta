import { TreeMirrorClient } from 'tree-mirror';

class Replicator {
  constructor() {
    this.startMirroring();
  }

  socketSend(msg) {
    console.log(JSON.stringify(msg));
  }

  startMirroring() {
    this.socketSend({ base: location.href.match(/^(.*\/)[^\/]*$/)[1] });

    new TreeMirrorClient(document, {
      initialize: (rootId, children) => {
        this.socketSend({
          f: 'initialize',
          args: [rootId, children]
        });
      },

      applyChanged: (removed, addedOrMoved, attributes, text) => {
        this.socketSend({
          f: 'applyChanged',
          args: [removed, addedOrMoved, attributes, text]
        });
      }
    });
  }
}

export default Replicator;
