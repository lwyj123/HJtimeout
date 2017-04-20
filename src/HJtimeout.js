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
    }

    getTolen() {
        return get(this, 'TOLen');
    }
    getIVLen() {
        return get(this, 'IVLen')
    }
    timer(callback, millisec) {
        set(this, 'TOLen', get(this, 'TOLen') + 1);
        //封装一个新callback方便计算数和跟踪状态
        let realCallback = function() {
            return function() {
                callback.apply(this, arguments);
                eventEmitter.emit("timberFinished");
                console.log("timberFinished");
            }
        }();
        let t = setTimeout(realCallback, millisec);
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

        clearTimeout(id);

    }
    cancelTimerAll() {

    }
    cancelInterval(id) {

    }
    cancelIntervalAll() {

    }

}
export default HJtimeout;
