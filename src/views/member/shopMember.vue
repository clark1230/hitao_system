<template>
  <div class="app-container">
    <div style="margin: 0px 0px 10px 0px;">
      <el-form  class="demo-form-inline" ref="form" style="display:inline-block;" label-width="10px">
        <el-form-item >
          <el-input v-model="searchValue" placeholder="请输入搜索值!"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="handleSearch" style="display:inline-block;" type="primary"  icon="el-icon-search">搜索</el-button>
      <el-button @click="handleRefresh" icon="el-icon-refresh">刷新</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      border
      size="mini"
      :highlight-current-row='true'
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
      prop="memberId"
      label="会员编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="memberName"
        label="会员名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="memberTrueName"
        label="会员姓名"
        width="120">
      </el-table-column>
      <el-table-column
        label="头像"
        width="120">
        <template slot-scope="scope">
          <img :src="scope.row.memberAvatar" style="transform:scale(1.3);height:35px;"/>
        </template>
      </el-table-column>
      <el-table-column
        label="性别"
        width="70">
        <template slot-scope="scope">
          <span v-if="scope.row.memberSex === 1">男</span>
          <span v-if="scope.row.memberSex === 2">女</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="memberMobile"
        label="手机号码"
        width="100">
      </el-table-column>
      <el-table-column
        prop="memberEmail"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="memberBirthday"
        label="生日"
        width="180">
      </el-table-column>
      <el-table-column
        prop="memberTime"
        label="注册时间">
      </el-table-column>
      <el-table-column
        label="禁用"
        width="70">
        <template slot-scope="scope">
          <span v-if="scope.row.isDel === 0">否</span>
          <span v-if="scope.row.isDel === 1">是</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button 
            size="mini" 
            @click="handleRemove(scope.$index,scope.row)" 
            :type="scope.row.isDel === 0?'danger':'info'" 
            :title='scope.row.isDel === 0?"禁用":"启用"' 
            :icon='scope.row.isDel === 0?"el-icon-sort-down":"el-icon-sort-up"' 
            plain></el-button>
        </template>

      </el-table-column>
    </el-table>
     <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" 
      @current-change="handleCurrentChange" 
      :current-page="listQuery.page" 
      :page-sizes="[10,15,30, 50]" 
      :page-size="listQuery.limit" 
      layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
     </div>
  </div>
</template>
<script>
import req from '@/utils/request' 
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 15,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      searchValue: null,
    };
  },
  created() {
    this.handleGetData(this.listQuery.page, this.listQuery.limit)
  },
  methods: {
    handleGetData(page, limit,searchValue=null) {
      var that = this;
      req
        .get(this.api.shopMemberAPI, {
          params: {
            page: page,
            limit: limit,
            memberName: searchValue
          }
        })
        .then(function(resp) {
          console.log(resp)
          if (resp.data.status === 0) {
            that.baseMsg("数据加载成功!",'success');
            that.tableData = resp.data.data.data;
            that.total = resp.data.data.count;
          } else {
            that.baseMsg("数据加载失败!",'error');
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.handleGetData(this.listQuery.page, this.listQuery.limit);
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.handleGetData(this.listQuery.page, this.listQuery.limit);
    },
    handleSearch: function() { // 搜索数据
      if(this.searchValue === null || this.searchValue === ''){
        this.baseMsg('请输入搜索值','error');
        return false;
      }
      this.handleGetData(1, this.listQuery.limit,this.searchValue)
    },
    handleRefresh: function() {
      this.searchValue = null;
      this.handleGetData(this.listQuery.page, this.listQuery.limit);
    },
    handleRemove(index, row) {
      var that =this
      var isDel = (row.isDel ===0 ? 1: 0);
      this.$confirm('此操作将启用/禁用该会员, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            req.get(that.api.removeShopMember+"?memberId="+row.memberId +"&isDel="+ isDel, {})
            .then(function(resp) {
              if(resp.data.status === 0){
                  that.baseNotify('成功','操作成功!','success');
                  that.handleGetData(that.listQuery.page, that.listQuery.limit);
                  that.ids = [];
                }else{
                  that.baseNotify('失败','操作失败!','error');
                }
              }).catch(function(error) {
                console.log(error);
              })
          }).catch(() => {
            this.baseMsg('已取消删除','info')
          });
    }
  }
};
</script>

