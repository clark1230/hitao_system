<template>
  <div class="app-container">
    <div style="margin: 0px 0px 10px 0px;">
      <el-button @click="handleCreate" type="primary" icon='el-icon-circle-plus' plain>增加</el-button>
      <el-button type="danger" icon="el-icon-delete" plain>批量删除</el-button>
      <el-form  class="demo-form-inline" ref="form" style="display:inline-block;" label-width="10px">
        <el-form-item >
          <el-input  placeholder="请输入搜索值!"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="handleSearch" style="display:inline-block;" type="primary"  icon="el-icon-search">搜索</el-button>
      <el-button @click="handleRefresh" icon="el-icon-refresh">刷新</el-button>
    </div>
    <el-table  :data="tableData"  stripe  border size="mini" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="brandName" label="品牌名称" width="180"></el-table-column>
      <el-table-column prop="brandClass" label="brandClass" width="180"></el-table-column>
      <el-table-column label="图片" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.brandPic" style="transform:scale(1.3);height:35px;"/>
        </template>
      </el-table-column>
      <el-table-column prop="brandSort" label="排序"></el-table-column>
      <el-table-column label="推荐">
        <template slot-scope="scope">
          <span v-if="scope.row.brandRecommend === 0">否</span>
          <span v-if="scope.row.brandRecommend === 1">是</span>
        </template>
      </el-table-column>
      <el-table-column label="品牌申请">
        <template slot-scope="scope">
          <span v-if="scope.row.brandApply ===1">已通过</span>
          <span v-if="scope.row.brandApply ===0">申请中</span>
        </template>
      </el-table-column>
      <el-table-column label="删除状态">
        <template slot-scope="scope">
          <span v-if="scope.row.isDel ===1">是</span>
          <span v-if="scope.row.isDel ===0">否</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="录入时间"></el-table-column>
      <el-table-column  prop="updatedTime" label="修改时间"> </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)" title="编辑" icon="el-icon-edit" plain></el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)" title="删除" icon="el-icon-delete" plain></el-button>
          <el-button size='mini' type='warning' title="启用/禁用" icon="el-icon-d-caret" plain></el-button>  
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
          sort: '+id'
        }
    }
  },
  created: function() {
    this.handleGetData(this.listQuery.page, this.listQuery.limit)
  },
  methods: {
    handleGetData(page, limit) {
        var that = this
        req.get(that.myConfig.host + 'shopBrand/shopBrandAjax', {
          params: {
            page: page,
            limit: limit
          }
        })
          .then(function(resp) {
            that.tableData = resp.data.data
            that.total = resp.data.count
          }).catch(function(error) {
            console.log(error)
          })
    }
  }
}
</script>

