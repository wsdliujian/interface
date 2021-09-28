<template>
  <div style="height: 860px">
    <a-row style="min-height: 0.9rem; font-size: 0.4rem;">
      <a-col :span="1">
        <a-button type="primary" class="editable-add-btn" @click="refreshData()">
          刷新
        </a-button>
      </a-col>
      <a-col :span="2">
        <div title="返回应用商店" class="close" @click="closeWin"/>
      </a-col>
    </a-row>
    <a-table  :scroll="{ y: 840,x:1200 }" bordered :data-source="dataSource" :pagination="paginationOpt" :columns="columns">
      <template slot="equipmentStatus" slot-scope="text">
        <div v-if="text=='0'">
          <span style="color: #ff4d4f">未连接</span>
        </div>
        <div v-else>
          <span style="color: #096dd9">已连接</span>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
import socket from '../js/socket'
import {getUserIP} from '../js/ip'
export default {
  data() {
    return {
      isYC: false,
      isShow: false,
      localhostIp: '',
      params: '',
      dataSource: [],
      paginationOpt: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5","10","15","20"],
        showTotal: (total) => `共${total}条`,
        onShowSizeChange: (current,pageSize) => {
          //分页数量
          this.paginationOpt.current = 1;
          this.paginationOpt.pageSize = pageSize;
          this.axiosGet(this.$url + '/MEClass/findEquipmentList',"find");
        },
        onChange:(current,pageSize) => {
          //跳转页数
          this.paginationOpt.current = current;
          this.paginationOpt.pageSize = pageSize;
          this.axiosGet(this.$url + '/MEClass/findEquipmentList',"find");
        }
      },
      columns: [
       /* {
          title: '序号',
          customRender: (text,record,index) =>
              `${(this.paginationOpt.current -1) *
              this.paginationOpt.pageSize + index + 1
              }`,
          align: 'center',
          width: 80,
        },*/
        {
          title: '硬件端口号',
          dataIndex: 'port',
          width: 120,
        },
        {
          title: '设备',
          dataIndex: 'equipmentName',
          width: 120,
        },
        {
          title: '设备信息',
          dataIndex: 'remark',
          width: 260,
        },
        {
          title: '协议',
          dataIndex: 'agreement',
          width: 80,
        },
        {
          title: '状态',
          dataIndex: 'equipmentStatus',
          width: 80,
          scopedSlots: { customRender: 'equipmentStatus' },
        },
        {
          title: '转换格式',
          dataIndex: 'transferFormat',
          width: 120,
        },
        {
          title: '数据描述',
          dataIndex: 'dataDescribe',
          width: 360,
        },
        {
          title: '采集数据内容',
          dataIndex: 'dataInfo',
          ellipsis: true,
          width: 260,
        },
        {
          title: '数据去向',
          dataIndex: 'outDataAgreement',
          width: 120,
        },
        {
          title: '标准化数据',
          dataIndex: 'outDataSite',
          ellipsis: true,
          width: 160,
        },
      ],
    };
  },
  methods: {
    initData(url) {
      this.params = "?ip="+this.localhostIp
      this.axiosGet(url,"find");
    },
    refreshData() {
      socket.close();
      this.params = "?ip="+this.localhostIp
      this.axiosGet(this.$url + "/MEClass/findEquipmentList","refresh");
    },
    socketData(data) {
      let newData = JSON.parse(data);
      //console.log(newData)
      let port = newData['port'];
      let oldData = this.dataSource;
      for (let i = 0 ,length=oldData.length;i<length;i++) {
        let gatherDataPort = oldData[i]['gatherDataPort'];
        if (gatherDataPort == port) {
          oldData[i]['dataInfo'] = data;
          break;
        }
        let normDataPort = oldData[i]['normDataPort'];
        if(normDataPort == port) {
          oldData[i]['outDataSite'] = data;
          break;
        }
      }
      this.dataSource = oldData;
      this.dataSource = [...this.dataSource];
    },
    startSocket(data) {
      for (let i = 0,length=data.length;i<length;i++) {
        let equipmentIp = data[i]['equipmentIp'];
        let gatherDataPort = data[i]['gatherDataPort'];
        let normDataPort = data[i]['normDataPort'];
        //equipmentIp = "192.168.0.55";
        let url1 = "ws://" + equipmentIp + ":" + gatherDataPort;
        let url2 = "ws://" + equipmentIp + ":" + normDataPort;
        socket.initSocket(url1);
        socket.initSocket(url2);
      }
      /*socket.initSocket("ws://192.168.0.55:50001");
      socket.initSocket("ws://192.168.0.55:40003");*/
      //回调函数放到window里
      window.updateData = this.socketData;
      console.log(data)
    },
    /*handleFocus() {
      let myself = this;
      this.isYC = false;
      setTimeout(function(){
        if(!myself.isYC) {
          myself.isShow = true;
        }
      },1500)
    },
    handleBlur() {
      let myself = this;
      this.isYC = true;
      setTimeout(function(){
        if(myself.isYC) {
          myself.isShow = false;
        }
      },1000)
    },*/
    closeWin() {
      window.close();
    },
    axiosGet(url,type) {
      let myself = this;
      this.$axios
          .get(url+myself.params,{
            params:{
              pageNum:myself.paginationOpt.current,
              pageSize: myself.paginationOpt.pageSize
            }
          })
          .then(function (response){
            console.log(response)
            if (response.data.code == 200) {
              //默认查询不需要提示
              if (!("find" == type || "findOptions" == type)) {
                myself.$message.success(response.data.msg);
              }
              if ("find" == type || "refresh" == type) {
                myself.dataSource = response.data.data;
                myself.paginationOpt.total = response.data.total;
                myself.startSocket(myself.dataSource);
              }
            } else {
              myself.$message.error(response.data.msg);
            }
          })
          .catch(function (error) { // 请求失败处理
            console.log("error:" + error);
            myself.$message.error('get系统错误');
          });
    },
  },
  created() {
      let myself = this;
      //获取ip
      getUserIP().then(
          function(data){
             myself.localhostIp = data;
             myself.initData(myself.$url + "/MEClass/findEquipmentList");
          }
      ).catch(function (error) {
         myself.$message.error(error);
      });
     /* //实时获取数据内容
      socket.initSocket();
      //回调函数放到window里
      window.updateData = this.socketData;*/
  },
};
</script>
<style>
.editable-add-btn {
  margin-bottom: 14px;
  margin-left: 8px;
}
.close {
  float: right;
  background-image: url('../datav/img/close.png');
  margin: 0px 24px 0px 0px;
  width:32px;
  height: 32px;
  cursor: pointer;
}
</style>
