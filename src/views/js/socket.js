
export function initSocket () {
    socketObj.methods.initWebsocket('init');
}
let socket = null;
let flag = 0;
let intervalObj = null;
let socketObj =  {
    data: {
        nowData: {
            oneFish: true,
            twoFish:false,
            fishTitle: "铁鱼信息采集",
            linkTitle: "二回路",
            linkUrl:"ws://219.140.94.192:30890/imserver/1001"
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
                socket = new WebSocket(socketUrl);
                //已连接
                socket.onopen = function () {
                    console.log('已连上');
                    myself.data.linkBreak = false;
                    myself.data.linkConnect = false;
                    myself.data.linkSuccess = true;
                    myself.data.heartCheck.reset().start();
                }
                //已断开
                socket.onclose = function () {
                    console.log('已断开');
                    //执行定时器任务
                    myself.methods.doInPerSecond();
                }
                //连接异常
                socket.onerror = function () {
                    console.log('连接异常');
                    if ("init" == type) {
                        myself.data.linkBreak = true;
                        myself.data.linkConnect = false;
                        myself.data.linkSuccess = false;
                        myself.data.connectText = "连接异常";
                    }
                }
                //收取消息
                socket.onmessage = function (evt) {
                    myself.data.heartCheck.reset().start();
                    console.log('收到消息');
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
            if(!(socketObj.data.linkConnect)) {
                socketObj.data.linkBreak = false;
                socketObj.data.linkConnect = true;
                socketObj.data.linkSuccess = false;
                socketObj.data.connectText = "尝试重连中....";
                //3秒循环
                intervalObj = setInterval(socketObj.methods.findReturn, 3000);
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
                socketObj.methods.initWebsocket("reset");
                if (socketObj.data.linkSuccess) {
                    clearInterval(intervalObj);
                }
            }
        },
        initData(jsonStr) {
            let obj = JSON.parse(JSON.parse(jsonStr));
            window.updateData(obj);
        },
        linkResetFish() {
            if (this.nowData.oneFish) {
                this.nowData.oneFish = false;
                this.nowData.twoFish = true;
                this.nowData.fishTitle = "二回路";
                this.nowData.linkTitle = "铁鱼信息采集";
                //路由跳转到二回路
                if (this.$route.path !== '/twoFish') {
                    //获取路由对象并切换
                    this.$router.push("twoFish")
                }
                this.nowData.linkUrl = "ws://219.140.94.192:30890/imserver/1002";
                socket.close();
                this.initWebsocket("reset");
            } else if (this.nowData.twoFish) {
                this.nowData.oneFish = true;
                this.nowData.twoFish = false;
                this.nowData.fishTitle = "铁鱼信息采集";
                this.nowData.linkTitle = "二回路";
                //默认界面为铁鱼信息采集，不需要路由跳转取数据
                this.nowData.linkUrl = "ws://219.140.94.192:30890/imserver/1001";
                socket.close();
                this.initWebsocket("reset");
            }

        }
    },
    destroyed() {
        socket.close();
    }
}
window.onbeforeunload = function() {
    socket.close();
}
export default {
    initSocket
}