<template>
  <div>
     <el-row>
       <el-col :span="3">&nbsp;</el-col>
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
        width="180">
      </el-table-column>
      <el-table-column
        label="属性模板"
        width="100">
        <template slot-scope="scope">
          <router-link :to="{name:'goods',params: {catId: scope.row.catId}}">
            <span style="color:orange;font-weight:bolder;border-bottom:1px dotted orange;">属性模板</span></router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="parentId"
        label="父级编号">
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序">
      </el-table-column>
      <el-table-column
        label="图标">
        <template slot-scope="scope">
          <img  style="transform:scale(1.3);height:35px;" :src="scope.row.iconImage"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="level"
        label="类目级别">
      </el-table-column>
      <el-table-column
        prop="keywords"
        label="关键字"
        width="110">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        width="120">
      </el-table-column>
      <el-table-column
        label="是否禁用"
        width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.isDel ===0">否</span>
          <span v-if="scope.row.isDel ===1">是</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createdTime"
        label="录入时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="updatedTime"
        label="修改时间"
        width="180">
      </el-table-column>
      <el-table-column label="操作" width="140">
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
      tableData: []
    }
  },created() {
    var that = this
    req.get(that.api.shopGoodsCategoryAPI).then((resp) =>{
      if(resp.data.status === 0){
        that.tableData = resp.data.data.data;
      }else{

      }
    })
  },
}
</script>

