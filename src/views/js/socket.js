
export function initSocket (url) {
    socketObj.data.nowData.linkUrl = url;
    socketObj.methods.initWebsocket('init');
}
export function close () {
    socketObj.destroyed();
}
let socket = {};
let flag = 0;
let intervalObj = null;
let socketObj =  {
    data: {
        nowData: {
            oneFish: true,
            twoFish:false,
            fishTitle: "信息采集",
            linkTitle: "接口",
            linkUrl:"",
            //linkUrl2:"ws://192.168.0.55:50052"
        },
        searchVal: '',
        linkBreak:false,
        linkConnect:true,
        linkSuccess:false,
        breakText:'连接断开',
        connectText:'连接中....',
        heartCheck: {
            //十秒重连
            timeout: 10000,
            timeoutObj: null,
            reset: function (){
                clearTimeout(this.timeoutObj)
                return this
            },
            start:function () {
                this.timeoutObj = setTimeout( function (){
                    //重连
                    console.log("XXXX重链")
                    socketObj.methods.initWebsocket("reset");
                },this.timeout)
            }
        }
    },
    methods: {
        initWebsocket(type) {
            const myself = socketObj;
            if (typeof (WebSocket) == "undefined") {
                myself.data.breakText = "WebSocket不支持使用";
                myself.data.linkBreak = true;
            } else {
                console.log('开始连接');
                let socketUrl = myself.data.nowData.linkUrl;
                console.log(socketUrl)
                let initSocket = new WebSocket(socketUrl);
                socket[socketUrl] = initSocket;
                console.log(socket.url)
                //已连接
                socket[socketUrl].onopen = function () {
                    console.log('已连上');
                    myself.data.linkBreak = false;
                    myself.data.linkConnect = false;
                    myself.data.linkSuccess = true;
                    myself.data.heartCheck.reset().start();
                }
                //已断开
                socket[socketUrl].onclose = function () {
                    console.log('已断开');
                    //执行定时器任务
                    myself.methods.doInPerSecond();
                }
                //连接异常
                socket[socketUrl].onerror = function () {
                    console.log('连接异常');
                    if ("init" == type) {
                        myself.data.linkBreak = true;
                        myself.data.linkConnect = false;
                        myself.data.linkSuccess = false;
                        myself.data.connectText = "连接异常";
                    }
                }
                //收取消息
                socket[socketUrl].onmessage = function (evt) {
                    myself.data.heartCheck.reset().start();
                    console.log('收到消息');
                    console.log(socket[socketUrl].url);
                    console.log(evt.data);
                    myself.data.linkBreak = false;
                    myself.data.linkConnect = false;
                    myself.data.linkSuccess = true;
                    if (!("连接成功" == evt.data) && evt) {
                        if(myself.data.nowData.oneFish) {
                            myself.methods.initData(evt.data);
                        } else if (myself.nowData.twoFish){
                            if(evt.data!=null && evt.data){
                                //myself.searchVal = evt.data;
                            }
                        }
                    }
                }
            }
        },
        doInPerSecond() {
            console.log("ZZZZ对面断开需刷新重连")
            if(!(socketObj.data.linkConnect)) {
                //取消循环，防止重复连接
                /*socketObj.data.linkBreak = false;
                socketObj.data.linkConnect = true;
                socketObj.data.linkSuccess = false;
                socketObj.data.connectText = "尝试重连中....";
                //3秒循环
                intervalObj = setInterval(socketObj.methods.findReturn, 3000);*/
            }
        },
        findReturn() {
            flag++;
            if (flag > 10) {
                //请求次数结束
                socketObj.data.linkBreak = true;
                socketObj.data.linkConnect = false;
                socketObj.data.linkSuccess = false;
                socketObj.data.breakText = "连接断开";
                clearInterval(intervalObj);
                flag = 0;
            } else {
                //websocket
                console.log("XXXXYYYY重链")
                socketObj.methods.initWebsocket("reset");
                if (socketObj.data.linkSuccess) {
                    clearInterval(intervalObj);
                }
            }
        },
        initData(jsonStr) {
            if (JSON.parse(jsonStr)) {
                window.updateData(jsonStr);
            }
        },
    },
    destroyed() {
        let objArr = Object.values(socket);
        for (let i = 0,length=objArr.length;i<length;i++) {
            objArr[i].close();
        }
    }
}
window.onbeforeunload = function() {
    let objArr = Object.values(socket);
    for (let i = 0,length=objArr.length;i<length;i++) {
        objArr[i].close();
    }
}
export default {
    initSocket,
    close
}