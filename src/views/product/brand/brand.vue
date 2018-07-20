<template>
  <div class="app-container">
    <div style="margin: 0px 0px 10px 0px;">
      <el-button @click="handleCreate" type="primary" icon='el-icon-circle-plus' plain>增加</el-button>
      <el-button @click="handleBatchRemove" type="danger" icon="el-icon-delete" plain>批量启用/禁用</el-button>
      <el-form  class="demo-form-inline" ref="form" style="display:inline-block;" label-width="10px">
        <el-form-item >
          <el-input  placeholder="请输入搜索值!"></el-input>
        </el-form-item>
      </el-form>
      <el-button  style="display:inline-block;" type="primary"  icon="el-icon-search">搜索</el-button>
      <el-button @click="handleRefresh" icon="el-icon-refresh">刷新</el-button>
    </div>
    <el-table  @selection-change="handleSelectionChange" :data="brandData"  stripe  border size="mini" style="width: 100%">
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
            type='primary'
            @click="handleEdit(scope.$index, scope.row)" title="编辑" icon="el-icon-edit" plain></el-button>
          <el-button
            size="mini"
            :type="scope.row.isDel ===0?'success':'danger'"
            @click="handleRemove(scope.$index, scope.row)"  :title="scope.row.isDel === 0?'禁用':'启用'" :icon="scope.row.isDel===0?'el-icon-success':'el-icon-error'" plain></el-button>
          <!-- <el-button size='mini' type='warning' title="启用/禁用" icon="el-icon-d-caret" plain></el-button>   -->
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" 
      label-width="80px" style='width: auto; margin-left:10px;'>
          <el-form-item label="品牌名称" prop="brandName">
            <el-input type="text"  placeholder="请输入品牌名称!" v-model="temp.brandName">
            </el-input>
          </el-form-item>
          <el-form-item label="商品类目"  prop="classId">
              <el-cascader
                style="width:550px;"
                placeholder="请选择商品类目!"
                :clearable="true"
                :filterable="true"
                :change-on-select="false"
                :options="shopCategoryData"
                @change="handleCategory"
                 v-model="cateArr">
              </el-cascader>
          </el-form-item>
          <el-form-item label="品牌图片" >
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              >
              <i class="el-icon-plus"></i>
            </el-upload>
            <!-- <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog> -->
          </el-form-item>
          <el-form-item label="排序" prop="brandSort">
            <el-input type="text"  placeholder="请输排序编号!" v-model="temp.brandSort">
            </el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel" plain>{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData" plain>{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData" plain>{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import req from "@/utils/request";
export default {
  data() {
    return {
      brandData: [], // 品牌信息
      shopCategoryData: [], // 商品类目信息
      cateArr: [], // 选择类目信息
      brandIdArr:[],
      total: 0,
      listQuery: {
        page: 1,
        limit: 15,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "修改",
        create: "新增"
      },
      temp: {
        brandName: null,
        brandSort: null,
        classId: null,
        brandClass: null,
        brandPic: null
      },
      rules: {
          brandName: [{ required: true, message: '请输入品牌名称!', trigger: 'blur' }],
          classId: [
            { required: true, message: '请商品商品类目!!', trigger: 'blur' },
            { required: true, message: '请商品商品类目!!', trigger: 'change' }
          ],
          brandPic: [{ required: true, message: '请上传品牌图片!!', trigger: 'blur' }]
      }
    };
  },
  created: function() {
    this.handleGetData(this.listQuery.page, this.listQuery.limit);
  },
  methods: {
    handleGetData(page, limit) {
      var that = this;
      req
        .get(that.api.shopBrandAPI, {
          params: {
            page: page,
            limit: limit
          }
        })
        .then(function(resp) {
          if (resp.data.status === 0) {
            that.baseMsg("数据加载成功!", "success");
            that.brandData = resp.data.data.data;
            that.total = resp.data.data.count;
          } else {
            that.baseMsg("数据加载失败!", "error");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.handleGetData(this.listQuery.page, this.listQuery.limit)
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.handleGetData(this.listQuery.page, this.listQuery.limit)
    },
    handleRefresh() {
      // 刷新数据
      this.handleGetData(this.listQuery.page, this.listQuery.limit);
    },
    handleCreate() {
      // 打开添加品牌弹层
      this.dialogStatus= 'create'
      this.getCategory()
    },
    getCategory() {
      var that = this;
      // 获取商品类型信息
      req
        .get(that.api.shopGoodsCategory)
        .then(resp => {
          if (resp.data.status === 0) {
            that.shopCategoryData = resp.data.data;
            that.dialogFormVisible = true;
            // 勾选商品类目信息
            if(that.dialogStatus === 'update'){
              resp.data.data.forEach((ele) =>{
              if(ele.children !== null) {
                ele.children.forEach((subEle) => {
                  if(subEle.children !== null){
                    subEle.children.forEach((data) => {
                      if(data.value === that.temp.classId){
                        that.cateArr.push(ele.value)
                        that.cateArr.push(subEle.value)
                        that.cateArr.push(data.value)
                        that.temp.brandClass = data.label
                      }
                    })
                  }
                })
              }
            })
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleEdit(index,row) {
      var that = this
      that.dialogStatus = 'update'
      req.get(that.api.findShopBrand,{
        params: {
          brandId: row.brandId
        }
      }).then( (resp) =>{
        if(resp.data.status === 0){
          that.temp = resp.data.data
          that.getCategory()
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    handleCancel() { // 关闭弹层
      this.dialogFormVisible = false
      this.handleRestTemp()
    },
    handleCategory(value,a) {
      this.temp.classId = value.pop()
    },
    createData() { // 保存新增的品牌信息
      this.commonFormHandler(this.api.saveShopBrand)
    },
    updateData() { // 保存修改的品牌信息
      this.commonFormHandler(this.api.updateShopBrand)
    },
    commonFormHandler(url){
      var that = this
      this.$refs['dataForm'].validate((valid) => {
        console.log(valid)
        if (valid) {
          req.post(url, this.temp)
            .then(function(resp) {
              if (resp.data.status === 0) {
                that.baseMsg(resp.data.msg,'success')
                that.dialogFormVisible = false
                that.handleRestTemp()
                that.handleRefresh()
              } else {
                that.baseMsg(resp.data.msg,'error')
              }
            })
            .catch(function(error) {
              console.log(error)
            })
        }
      })
    },
    handleRemove (index,row){ // 逻辑删除用户
      this.commonDeleteHandler(this.api.removeShopBrand,'brandId',row.brandId)
    },
    handleBatchRemove() { // 批量逻辑删除
      this.commonDeleteHandler(this.api.removeBatchShopBrand,'brandIds',this.brandIdArr)
    },
    commonDeleteHandler(url,name,value){
      var that = this
      this.$confirm('此操作将禁用所选品牌, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          req.delete(url+'?'+name+'='+value).then((resp) => {
              if(resp.data.status === 0){
                that.baseMsg('删除成功!','success')
                that.handleRefresh()
              }else{
                that.baseMsg('删除失败!','error')
              }
            }).catch((error) =>{
              console.log(error)
            })
        }).catch(() => {
          this.baseMsg('已取消删除!','info')
        });
    },
    handleSelectionChange(val) {
      var that = this
      val.forEach((ele) => {
        that.brandIdArr.push(ele.brandId)
      })
    },
    handleRestTemp() { // 重置表单
      this.$refs['dataForm'].resetFields(); // 重置表单
      this.temp = {
        brandName: null,
        brandSort: null,
        classId: null,
        brandPic: null
      }
    }
  }
};
</script>

