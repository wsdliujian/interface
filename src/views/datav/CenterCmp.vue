<template>
  <div style="height: 960px">
<!--    <a-button class="editable-add-btn" @click="handleAdd">
      Add
    </a-button>-->
    <a-table bordered :data-source="dataSource" :columns="columns">
      <template slot="describe" slot-scope="text, record">
        <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)" />
      </template>
      <template slot="agreement" slot-scope="value">
        <a-select
            :default-value="value"
            show-search
            placeholder="搜索"
            option-filter-prop="children"
            style="width: 200px"
            :filter-option="filterOption"
            @change="handleChange"
        >
          <a-select-option value="TCP">
            TCP
          </a-select-option>
          <a-select-option value="HTTP">
            HTTP
          </a-select-option>
          <a-select-option value="HTTPS">
            HTTPS
          </a-select-option>
        </a-select>
      </template>
      <template slot="transferFormat" slot-scope="value">
        <a-select
            :default-value="value"
            show-search
            placeholder="搜索"
            option-filter-prop="children"
            style="width: 200px"
            :filter-option="filterOption"
            @change="handleChange"
        >
          <a-select-option value="A">
            A
          </a-select-option>
          <a-select-option value="B">
            B
          </a-select-option>
          <a-select-option value="C">
            C
          </a-select-option>
        </a-select>
      </template>
      <template slot="dataInfo" slot-scope="text, record">
        <span>{{record.dataInfo}}</span>
      </template>
    </a-table>
<!--自定义分页    <a-pagination size="small" :total="50" show-size-changer show-quick-jumper />-->
  </div>
</template>
<script>
const EditableCell = {
  template: `
    <div class="editable-cell">
    <div v-if="editable" class="editable-cell-input-wrapper">
      <a-input :value="value" @change="handleChange" @pressEnter="check" /><a-icon
        type="check"
        class="editable-cell-icon-check"
        @click="check"
    />
    </div>
    <div v-else class="editable-cell-text-wrapper">
      {{ value || ' ' }}
      <a-icon type="edit" class="editable-cell-icon" @click="edit" />
    </div>
    </div>
  `,
  props: {
    text: String,
  },
  data() {
    return {
      value: this.text,
      editable: false,
    };
  },
  methods: {
    handleChange(e) {
      const value = e.target.value;
      this.value = value;
    },
    check() {
      this.editable = false;
      this.$emit('change', this.value);
    },
    edit() {
      this.editable = true;
    },
  },
};
export default {
  components: {
    EditableCell
  },
  data() {
    return {
      dataSource: [
        {
          key: '0',
          index: 1,
          interfaceCode: '接口1',
          status: '未连接',
          agreement: 'TCP',
          facilityInfo: 'xxxx-098-099-001',
          transferFormat: 'A',
          describe: '这是一号种子',
          dataInfo: '正在读取中....',
          outDataAgreement: 'TCP',
          outDataSite: 'XXX99',
        },
        {
          key: '1',
          index: 2,
          interfaceCode: '接口2',
          status: '已连接',
          agreement: 'HTTP',
          facilityInfo: 'xxxx-098-099-002',
          transferFormat: 'B',
          describe: '这是二二号种子',
          dataInfo: '正在读取....',
          outDataAgreement: 'HTTP',
          outDataSite: 'XXX99100',
        },
        {
          key: '2',
          index: 3,
          interfaceCode: '接口3',
          status: '未连接',
          agreement: 'TCP',
          facilityInfo: 'xxxx-098-099-001',
          transferFormat: 'A',
          describe: '这是一号种子',
          dataInfo: '正在读取中....',
          outDataAgreement: 'TCP',
          outDataSite: 'XXX99',
        },
        {
          key: '3',
          index: 4,
          interfaceCode: '接口4',
          status: '已连接',
          agreement: 'HTTP',
          facilityInfo: 'xxxx-098-099-002',
          transferFormat: 'B',
          describe: '这是二二号种子',
          dataInfo: '正在读取....',
          outDataAgreement: 'HTTP',
          outDataSite: 'XXX99100',
        },
        {
          key: '4',
          index: 5,
          interfaceCode: '接口5',
          status: '未连接',
          agreement: 'TCP',
          facilityInfo: 'xxxx-098-099-001',
          transferFormat: 'A',
          describe: '这是一号种子',
          dataInfo: '正在读取中....',
          outDataAgreement: 'TCP',
          outDataSite: 'XXX99',
        },
        {
          key: '5',
          index: 6,
          interfaceCode: '接口6',
          status: '已连接',
          agreement: 'HTTP',
          facilityInfo: 'xxxx-098-099-002',
          transferFormat: 'B',
          describe: '这是二二号种子',
          dataInfo: '正在读取....',
          outDataAgreement: 'HTTP',
          outDataSite: 'XXX99100',
        },
        {
          key: '6',
          index: 7,
          interfaceCode: '接口7',
          status: '未连接',
          agreement: 'TCP',
          facilityInfo: 'xxxx-098-099-001',
          transferFormat: 'A',
          describe: '这是一号种子',
          dataInfo: '正在读取中....',
          outDataAgreement: 'TCP',
          outDataSite: 'XXX99',
        },
        {
          key: '7',
          index: 8,
          interfaceCode: '接口8',
          status: '已连接',
          agreement: 'HTTP',
          facilityInfo: 'xxxx-098-099-002',
          transferFormat: 'B',
          describe: '这是二二号种子',
          dataInfo: '正在读取....',
          outDataAgreement: 'HTTP',
          outDataSite: 'XXX99100',
        },
        {
          key: '8',
          index: 9,
          interfaceCode: '接口9',
          status: '未连接',
          agreement: 'TCP',
          facilityInfo: 'xxxx-098-099-001',
          transferFormat: 'A',
          describe: '这是一号种子',
          dataInfo: '正在读取中....',
          outDataAgreement: 'TCP',
          outDataSite: 'XXX99',
        },
        {
          key: '9',
          index: 10,
          interfaceCode: '接口10',
          status: '已连接',
          agreement: 'HTTP',
          facilityInfo: 'xxxx-098-099-002',
          transferFormat: 'B',
          describe: '这是二二号种子',
          dataInfo: '正在读取....',
          outDataAgreement: 'HTTP',
          outDataSite: 'XXX99100',
        },
        {
          key: '10',
          index: 11,
          interfaceCode: '接口11',
          status: '未连接',
          agreement: 'TCP',
          facilityInfo: 'xxxx-098-099-001',
          transferFormat: 'A',
          describe: '这是一号种子',
          dataInfo: '正在读取中....',
          outDataAgreement: 'TCP',
          outDataSite: 'XXX99',
        },
        {
          key: '11',
          index: 12,
          interfaceCode: '接口12',
          status: '已连接',
          agreement: 'HTTP',
          facilityInfo: 'xxxx-098-099-002',
          transferFormat: 'B',
          describe: '这是二二号种子',
          dataInfo: '正在读取....',
          outDataAgreement: 'HTTP',
          outDataSite: 'XXX99100',
        },
        {
          key: '12',
          index: 13,
          interfaceCode: '接口13',
          status: '未连接',
          agreement: 'TCP',
          facilityInfo: 'xxxx-098-099-001',
          transferFormat: 'A',
          describe: '这是一号种子',
          dataInfo: '正在读取中....',
          outDataAgreement: 'TCP',
          outDataSite: 'XXX99',
        },
        {
          key: '13',
          index: 14,
          interfaceCode: '接口14',
          status: '已连接',
          agreement: 'HTTP',
          facilityInfo: 'xxxx-098-099-002',
          transferFormat: 'B',
          describe: '这是二二号种子',
          dataInfo: '正在读取....',
          outDataAgreement: 'HTTP',
          outDataSite: 'XXX99100',
        },
        {
          key: '14',
          index: 15,
          interfaceCode: '接口15',
          status: '未连接',
          agreement: 'TCP',
          facilityInfo: 'xxxx-098-099-001',
          transferFormat: 'A',
          describe: '这是一号种子',
          dataInfo: '正在读取中....',
          outDataAgreement: 'TCP',
          outDataSite: 'XXX99',
        },
        {
          key: '15',
          index: 16,
          interfaceCode: '接口16',
          status: '已连接',
          agreement: 'HTTP',
          facilityInfo: 'xxxx-098-099-002',
          transferFormat: 'B',
          describe: '这是二二号种子',
          dataInfo: '正在读取....',
          outDataAgreement: 'HTTP',
          outDataSite: 'XXX99100',
        },
      ],
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          align: 'center',
          width: 80,
        },
        {
          title: '串口/接口号',
          dataIndex: 'interfaceCode',
        },
        {
          title: '状态',
          dataIndex: 'status',
        },
        {
          title: '协议',
          dataIndex: 'agreement',
          scopedSlots: { customRender: 'agreement' },
        },
        {
          title: '设备信息',
          dataIndex: 'facilityInfo',
        },
        {
          title: '转换格式',
          dataIndex: 'transferFormat',
          scopedSlots: { customRender: 'transferFormat' },
        },
        {
          title: '数据描述',
          dataIndex: 'describe',
          scopedSlots: { customRender: 'describe' },
        },
        {
          title: '数据内容',
          dataIndex: 'dataInfo',
          scopedSlots: { customRender: 'dataInfo' },
        },
        {
          title: '数据去向协议',
          dataIndex: 'outDataAgreement',
        },
        {
          title: '数据去向位置',
          dataIndex: 'outDataSite',
        },
      ],
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    filterOption(input, option) {
      return (
          option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    onCellChange(key, dataIndex, value) {
      console.log(key)
      console.log(dataIndex)
      console.log(value)
      const dataSource = [...this.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.dataSource = dataSource;
      }
    },
    handleAdd() {
      const { count, dataSource } = this;
      const newData = {
        key: count,
        name: `Edward King ${count}`,
        age: 32,
        address: `London, Park Lane no. ${count}`,
      };
      this.dataSource = [...dataSource, newData];
      this.count = count + 1;
    },
    getDataInfo() {
      let myself = this;
      //const { dataSource } = this;
      setInterval(function (){
        for (let i = 0;i< 16;i++) {
          let val = (Math.random() * 100).toFixed(1);
          myself.dataSource[i].dataInfo = val;
        }
        //myself.dataSource = dataSource;
      },2000)
    },
  },
  mounted() {
    this.$nextTick(() => {
      //实时获取数据内容
      this.getDataInfo();
    })
  },
};
</script>
<style>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper, .editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>
