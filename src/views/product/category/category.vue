<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div style="margin: 0px 0px 10px 0px;">
          <el-button type="primary" icon='el-icon-circle-plus' plain>增加</el-button>
          <el-button type="danger" icon="el-icon-delete" plain>批量删除</el-button>
          <el-form  class="demo-form-inline" ref="form" style="display:inline-block;" label-width="10px">
            <el-form-item >
              <el-input  placeholder="请输入搜索值!"></el-input>
            </el-form-item>
          </el-form>
          <el-button style="display:inline-block;" type="primary"  icon="el-icon-search">搜索</el-button>
          <el-button @click="handleRefresh()" icon="el-icon-refresh">刷新</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3"><div class="grid-content bg-purple">哈哈</div></el-col>
      <el-col :span="21">
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
        prop="catName"
        label="类目名称"
        width="150">
      </el-table-column>
      <el-table-column
        label="属性模板"
        width="90">
        <template slot-scope="scope">
           <router-link tag="属性模板" :to="{path: 'attrTemplate', query: {catId: scope.row.catId, catName: scope.row.catName}}">
            <a style="color:orange;border-bottom:1px dotted orange;font-weight:bold;">属性模板</a>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="parentId"
        label="父级编号" width="50">
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序" width="50">
      </el-table-column>
      <el-table-column prop="iconImage" label="主图" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.iconImage" style="transform:scale(1.3);height:35px;"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="level"
        label="类目级别"
        width="70">
      </el-table-column>
      <el-table-column
        prop="keywords"
        label="关键字"
        width="80">
      </el-table-column>
      <el-table-column
        label="是否删除"
        width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isDel ===1">是</el-tag>
          <el-tag type="danger" v-if="scope.row.isDel ===0">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createdTime"
        label="录入时间"
        width="160">
      </el-table-column>
      <el-table-column
        prop="updatedTime"
        label="编辑时间"
        width="160">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        width="180">
      </el-table-column>
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
      </el-col>
    </el-row>
    
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
    };
  },
  created() {
    this.handleGetData(this.listQuery.page,this.listQuery.limit)
  },
  methods: {
    handleGetData(page, limit) {
      var that = this;
      req
        .get(that.api.shopGoodsCategoryAPI, {
          params: {
            page: page,
            limit: limit
          }
        })
        .then(resp => {
          console.log(resp.data)
          if (resp.data.status === 0) {
            that.baseMsg('数据加载成功!','success');
            that.tableData = resp.data.data.data;
            that.total = resp.data.data.count;
          } else {
            that.baseMsg('数据加载失败!','error');
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleRefresh(){
      this.handleGetData(this.listQuery.page,this.listQuery.limit)
    }
  }
};
</script>

