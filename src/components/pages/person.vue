<template>
<div>
    <div style="border: 1px solid #ebebeb; border-radius: 3px; transition: .2s; padding: 10px; background: eee;">
        <!-- <el-button @click="toggleSelection([tableData3[1], tableData3[2]])" size="small">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()" size="small">取消选择</el-button> -->
        <el-row :gutter="24">
          <el-col :span="4"><el-input size="small"></el-input></el-col>
          <el-col :span="20">
              <el-button type="default" size="small" icon="fa fa-search">查询</el-button>
              <el-button type="primary" size="small" icon="fa fa-plus">新增</el-button>
              <el-button type="primary" size="small" icon="fa fa-edit">编辑</el-button>
              <el-button type="danger" size="small" icon="fa fa-remove">删除</el-button>
          </el-col>
        </el-row>
    </div>
    <div style="border: 1px solid #ebebeb; border-radius: 3px; transition: .2s; padding: 10px; margin-top: 5px;">
    <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" 
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.3)" >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="日期" width="150">
        <template slot-scope="scope">{{ scope.row.date }}</template> </el-table-column>
        <el-table-column prop="name" label="姓名" width="150"> </el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip> </el-table-column>
    </el-table>
    </div>  
     <div class="block" style="text-align: right; margin-top: 10px; padding:8px;">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="50"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
        </el-pagination>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      currentPage4: 4,
      tableData3: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    loadData(){

    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
  },
  created(){
      this.loading = false;
  }
};
</script>