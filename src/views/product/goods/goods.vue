<template>
  <div class="app-container">
    <div style="margin: 0px 0px 10px 0px;">
      <div style="display:inline-block;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="上架" name="first"></el-tab-pane>
        <el-tab-pane label="下架" name="second"></el-tab-pane>
        <el-tab-pane label="违规" name="third"></el-tab-pane>
      </el-tabs>
      </div>
      <div style="display:inline-block;">
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
    </div>
    <el-table :data="tableData" stripe border size="mini" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="goodsName" label="商品名称" width="180"> </el-table-column>
      <el-table-column prop="mainImage" label="主图" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.mainImage" style="transform:scale(1.3);height:35px;"/>
        </template>
      </el-table-column>
      <el-table-column prop="goodsStorage" label="库存"  sortable width="80"></el-table-column>
      <el-table-column prop="goodsPrice" label="价格(￥)" width="90"></el-table-column>
      <el-table-column prop="goodsMarketprice" label="市场价格(￥)" width="90"></el-table-column>
      <el-table-column prop="evaluationCount" label="评价数" width="80"></el-table-column>
      <el-table-column prop="goodsClick" label="点击数" width="80"></el-table-column>
      <el-table-column prop="goodsSalenum" label="销售数" width="80"></el-table-column>
      <el-table-column prop="goodsCollect" label="收藏数" width="80"></el-table-column>
      <el-table-column  label="评分(0-5星)"  sortable>
        <template slot-scope="scope">
          <el-rate
            v-model="scope.row.evaluationGoodStar"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column prop="goodsState" label="状态" width="70">
        <template slot-scope="scope">
          <span v-if="scope.row.goodsState ===0">下架</span>
          <span v-if="scope.row.goodsState ===1">正常</span>
          <span v-if="scope.row.goodsState ===10">违规</span>
        </template>
      </el-table-column>
      <el-table-column prop="goodsVerify" label="审核" width="70">
        <template slot-scope="scope">
          <span v-if="scope.row.goodsVerify ===0">未通过</span>
          <span v-if="scope.row.goodsVerify ===1">已通过</span>
          <span v-if="scope.row.goodsVerify ===10">审核中</span>
        </template>
      </el-table-column>
      <el-table-column label="删除" width="60">
        <template slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.isDel === 0">否</el-tag>
          <el-tag type="danger" v-if="scope.row.isDel === 1">是</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
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
        tableData:[],
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
        options: [],
        goodsVerify: 0
      }
    },
    created: function(){
      this.handleGetData(this.listQuery.page, this.listQuery.limit)
    },
    methods: {
      handleGetData(page, limit, searchParam, searchValue) {
        var that = this
        req.get(that.myConfig.host + 'shopGoods/shopGoodsAjax', {
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
      handleRefresh() {
        this.searchParam = ''
        this.searchValue = ''
        this.handleGetData(1,15)
      },
      handleSearch(){

      }
    }
  }
</script>
<style scoped>

</style>
