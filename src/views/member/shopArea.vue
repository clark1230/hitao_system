<template>
  <div class="app-container">
    <div style="margin: 0px 0px 10px 0px;">
      <el-button @click="handleCreate" type="primary" icon='el-icon-circle-plus' plain>增加</el-button>
      <el-button type="danger" icon="el-icon-delete" plain>批量删除</el-button>
      <el-select v-model="searchParam" placeholder="请选择搜索条件" style="display:inline-block;width:120px;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      <el-form  class="demo-form-inline" ref="form" style="display:inline-block;" label-width="10px">
        <el-form-item >
          <el-input v-model="searchValue" placeholder="请输入搜索值!"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="handleSearch" style="display:inline-block;" type="primary"  icon="el-icon-search">搜索</el-button>
      <el-button @click="handleRefresh" icon="el-icon-refresh">刷新</el-button>
    </div>
    <el-table :data="tableData" stripe border size="mini" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="地区名称" width="180">
        <template slot-scope="scope">
          <el-tag type="primary">{{scope.row.areaName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="areaParentId" label="父级编号" width="180"> </el-table-column>
      <el-table-column prop="areaSort" label="排序" width="100"></el-table-column>
      <el-table-column  prop="postCode" label="邮编" width="130"></el-table-column>
      <el-table-column label="地区深度" width="140">
        <template slot-scope="scope">
          <span v-if="scope.row.areaDeep ==1">省/直辖市</span>
          <span v-if="scope.row.areaDeep ==2">市级市</span>
          <span v-if="scope.row.areaDeep ==3">县/区</span>
        </template>
      </el-table-column>
      <el-table-column label="是否删除" width="80">
        <template slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.isDel ==0">否</el-tag>
          <el-tag type="danger" v-if="scope.row.isDel ==1">是</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="录入时间"></el-table-column>
      <el-table-column prop="updatedTime" label="编辑时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)" title="编辑" icon="el-icon-edit" plain></el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)" title="删除" icon="el-icon-delete" plain></el-button>
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
  export default{
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
        searchParam: '',
        searchValue: '',
        options: [{
          value: 'areaName',
          label: '区域名称'
        }, {
          value: 'postCode',
          label: '邮编'
        }]
      }
    },
    created: function(){
      this.handleGetData(this.listQuery.page, this.listQuery.limit)
    },
    methods: {
      handleGetData(page, limit, searchParam, searchValue) {
        var that = this
        req.get(that.myConfig.host + 'shopArea/shopAreaAjax', {
          params: {
            page: page,
            limit: limit,
            searchParam: searchParam,
            searchValue: searchValue
          }
        })
          .then(function(resp) {
            that.tableData = resp.data.data
            that.total = resp.data.count
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
      handleRefresh:function() {
        this.searchParam = ''
        this.searchValue = ''
        this.handleGetData(1,15)
      },
      handleSearch() { // 处理搜索
        let searchParam = this.searchParam
        let searchValue = this.searchValue
        console.log(searchValue)
        if (searchParam === ''){
           this.error('请选择搜索条件!')
           return false
        } else {
          let reg = /^\d{1,}$/
          if ( searchValue === ''){
             this.error('请输入搜索值!')
             return false
          }else if( searchParam === 'postCode' && !reg.test(searchValue)){
            this.error('邮编为数字!')
            this.searchValue = ''
            return false
          }
          // 搜索
          this.handleGetData(1,20,searchParam,searchValue)
        }
      },
      handleCreate(){
        console.log('添加....')
      },
      success(msg) {
        this.$message({
          message: msg,
          type: 'success',
          duration: 1500
        })
      },
      error(msg) {
        this.$message({
          message: msg,
          type: 'error',
          duration: 1500
        })
      }
    }
  }
</script>