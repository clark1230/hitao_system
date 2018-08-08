<template>
  <div class="app-container">
    <div style="margin: 0px 0px 10px 0px;">
      <el-select v-model="searchParam" placeholder="请选择搜索条件" style="display:inline-block;width:120px;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      <el-form   class="demo-form-inline" ref="form" style="display:inline-block;" label-width="10px">
        <el-form-item>
          <el-input v-model="searchValue" placeholder="请输入搜索值!"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="handleSearch" style="display:inline-block;" type="primary"  icon="el-icon-search">搜索</el-button>
      <el-button @click="handleRefresh" icon="el-icon-refresh">刷新</el-button>
    </div>
    <el-table  :data="tableData"  stripe border  size="mini" style="width: 100%">
      <el-table-column  type="selection" width="55"> </el-table-column>
      <el-table-column prop="memberId" label="会员编号" width="140"></el-table-column>
      <el-table-column prop="memberName" label="收货人" width="180"></el-table-column>
      <el-table-column prop="telNumber"  label="手机号码"  width="180"></el-table-column>
      <el-table-column prop="address" label="收货地址" width="350"></el-table-column>
      <el-table-column prop="postCode" label="邮编" width="80">
      </el-table-column>
      <el-table-column  label="默认" width="70">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.isDefault ==0">否</el-tag>
          <el-tag type="primary" v-if="scope.row.isDefault ==1">是</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)" title="编辑" icon="el-icon-edit" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
     <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" 
      @current-change="handleCurrentChange" 
      :current-page="listQuery.page" 
      :page-sizes="[10,15,30,50]" 
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
          sort: '+id'
        },
        options: [{
          value: 'memberId',
          label: '会员编号'
        }, {
          value: 'memberName',
          label: '收货人'
        }],
        searchParam: '',
        searchValue: ''
      }
    },
    created: function(){
      this.handleGetData(this.listQuery.page, this.listQuery.limit)
    },
    methods: {
      handleGetData(page, limit,searchParam,searchValue) {
        var that = this
        req.get(that.api.shopAddressAPI, {
          params: {
            page: page,
            limit: limit,
            searchParam: searchParam,
            searchValue: searchValue
          }
        })
          .then(function(resp) {
            that.tableData = resp.data.data.data
            that.total = resp.data.data.count
          }).catch(function(error) {
            console.log(error)
          })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.handleGetData(this.listQuery.page, this.listQuery.limit,this.searchParam,this.searchValue)
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.handleGetData(this.listQuery.page, this.listQuery.limit,this.searchParam,this.searchValue)
      },
      handleSearch() { // 处理搜索
        let searchParam = this.searchParam
        let searchValue = this.searchValue
        if (searchParam === ''){
           this.baseMsg('请选择搜索条件!','error')
           return false
        } else {
          let reg = /^\d{1,}$/
          if ( searchValue === ''){
             this.baseMsg('请输入搜索值!','error')
             return false
          }else if( searchParam === 'memberId' && !reg.test(searchValue)){
            this.baseMsg('会员编号为数字!','error')
            this.searchValue = ''
            return false
          }
          // 搜索
          this.handleGetData(1,20,searchParam,searchValue)
        }
      },
      handleRefresh:function() {
        this.searchParam = ''
        this.searchValue = ''
        this.handleGetData(1,20)
      }
    }
  }
</script>