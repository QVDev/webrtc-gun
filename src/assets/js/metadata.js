export default class MetaData {
    constructor(gun, room, socketId) {
        this.room = room;
        this.root = gun;
        this.socketId = socketId;
        this.init();
    }

    init() {
        this.receiveData();
    }

    receiveData() {
        self = this;
        this.root.get(this.room).map().on(function (data, id) {
            if (!data) {
                return
            } else {
                if (self.onMetaData) {
                    self.onMetaData(data);
                }
            }
        });
    }

    sentControlData(data) {
        data.socketId = this.socketId;
        data.pid = this.root._.opt.pid;
        let metaData = this.root.get(this.root._.opt.pid).put(data);
        this.root.get(this.room).set(metaData);
    }
}