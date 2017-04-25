import HJevent from 'hjevent';
//实现私有变量
var attributions = {}
function get(that, key) {
    return attributions[that] && attributions[that][key];
}
function set(that, key, value) {
    if(!attributions[that]) attributions[that] = {};
    attributions[that][key] = value
}


var eventEmitter = new HJevent();

class HJtimeout {

    //TODO: 换一种更好的实现私有属性方法
    constructor() {
        //the number of Timeout
        set(this, 'TOLen', 0);
        set(this, 'TOlist', []);
        //the number of Interval
        set(this, 'IVLen', 0);
        set(this, 'IVlist', []);
        this.bindEvent();
    }
    bindEvent() {
        let self = this;
        eventEmitter.on('timberFinished', function(id) {
            self.__removeTimeout(id);
        });        
    }

    getTolen() {
        return get(this, 'TOLen');
    }
    getTOlist() {
        return get(this, 'TOlist');
    }
    getIVLen() {
        return get(this, 'IVLen')
    }
    timer(callback, millisec) {
        set(this, 'TOLen', get(this, 'TOLen') + 1);

        let t = setTimeout(realCallback, millisec);
        //封装一个新callback方便计算数和跟踪状态
        function realCallback() {
            callback.apply(this, arguments);
            eventEmitter.emit("timberFinished", t);
            console.log(`timberFinished id: ${t}`);
        }
        get(this, 'TOlist').push({"id": t, "callback": callback.toString(), "millisec": millisec});
        return t;
    }
    interval(callback, millisec) {
        set(this, 'IVLen', get(this, 'IVLen') + 1);
        let t = setInterval(callback,millisec);
        get(this, 'IVlist').push({"id": t, "callback": callback.toString(), "millisec": millisec});
        return t;
    }
    cancelTimer(id) {
        this.__removeTimeout(id);
    }
    cancelTimerAll() {
        let self = this;
        //直接使用list会导致动态修改数组导致错误
        let list = get(this, 'TOlist');
        let clonelist = list.slice();

        clonelist.map(function(obj) {
            self.__removeTimeout(obj.id);
        });

    }
    cancelInterval(id) {

    }
    cancelIntervalAll() {

    }
    //移除Timeout，无论是完成还是取消
    __removeTimeout(id) {
        let list = get(this, 'TOlist');
        let itemIndex = list.findIndex((obj) => obj.id == id);
        if(itemIndex != -1) {
            clearTimeout(list[itemIndex].id);
            list.splice(itemIndex, 1);
            set(this, 'TOLen', get(this, 'TOLen') - 1);
        }
    }
}
export default HJtimeout;
