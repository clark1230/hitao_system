<template>
  <div class="app-container">
    <div style="margin: 0px 0px 10px 0px;">
      <el-button @click="handleCreate" type="primary" icon='el-icon-circle-plus' plain>增加</el-button>
      <el-button @click="handleBatchRemove" type="danger" icon="el-icon-delete" plain>批量删除</el-button>
      <el-button @click="handleGrantRole" type="primary">授予角色</el-button>
      <el-form  class="demo-form-inline" ref="form" style="display:inline-block;" label-width="10px">
        <el-form-item >
          <el-input v-model="searchValue"  placeholder="请输入搜索值!"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="handleSearch" style="display:inline-block;" type="primary"  icon="el-icon-search">搜索</el-button>
      <el-button @click="handleRefresh" icon="el-icon-refresh">刷新</el-button>
    </div>
    <el-table
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      :data="tableData"
      stripe
      border
      size="mini"
      style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="adminName" label="名称" width="120"></el-table-column>
      <el-table-column prop="adminLoginNum" label="登陆次数" width="80"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="140"></el-table-column>
      <el-table-column prop="loginIp" label="登陆IP" width="120"></el-table-column>
      <el-table-column  label="登陆状态" width="70">
        <template slot-scope="scope">
          <span v-if="scope.row.loginStatus ===1"><el-tag type="success">在线</el-tag></span>
          <span v-if="scope.row.loginStatus ===0"><el-tag type="danger">离线</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column prop="loginTime" label="登陆时间" width="140"></el-table-column>
      <el-table-column label="删除状态" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.isDel ===1">是</span>
          <span v-if="scope.row.isDel ===0">否</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdBy" label="录入人" width="80"></el-table-column>
      <el-table-column prop="createdTime" label="录入时间" width="140"></el-table-column>
      <el-table-column prop="updatedBy" label="修改人" width="80"></el-table-column>
      <el-table-column prop="updatedTime" label="修改时间" width="140"></el-table-column>
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
    <!--用户增加、编辑表单-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" 
      label-width="90px" style='width: auto; margin-left:10px;'>
          <el-form-item label="用户名称" prop="adminName">
            <el-input type="text"  placeholder="请输入系统用户名称!" v-model="temp.adminName">
            </el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
            <el-input type="text"  placeholder="请输入电子邮箱!" v-model="temp.email">
            </el-input>
          </el-form-item>
          <el-form-item label="是否删除" prop="isDel">
             <el-radio-group v-model="temp.isDel" >
              <el-radio :label="0" :border="true">否</el-radio>
              <el-radio :label="1" :border="true">是</el-radio>
            </el-radio-group>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel()" plain>{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData" plain>{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData" plain>{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!--角色授权-->
    <el-dialog title="授予角色" :visible.sync="grantRoleDialogVisible">
      <div>
        <el-checkbox-group v-model="roleIdArr">
          <div style="display:inline-block;margin-right:10px;" v-for="(role, subIndex) in roleData" :key="subIndex">
            <el-checkbox border  :label="role.roleId" name="type">{{role.roleName}}</el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelGrantRole" plain>{{$t('table.cancel')}}</el-button>
        <el-button @click="handleGrantRoleData" type="primary" plain>{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import req from '@/utils/request'
export default {
  data() {
    const checkAdminNameExists = (rule,value,callback) => {
      if(this.dialogStatus === 'update'){
        callback();
      }else{
        var that = this;
        req.get(this.api.shopAdminCheckExists,{params:{
          adminName: value
        }}).then((resp) => {
          if(resp.data.status === 0){
            that.baseNotify('成功',resp.data.msg,'success');
            callback()
          }else{
            that.baseNotify(resp.data.msg);
            callback(new Error('失败',resp.data.msg,'error'));
          }
        }).catch((error) => {
          console.log(error);
          callback(new Error('后台服务校验失败!'));
        })
      }
    }
    return {
      tableData: [], // 管理员表格数据
      total: 0, // 总记录数
      listQuery: {  // 分页查询
        page: 1,
        limit: 15,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      searchValue: null, // 搜索值
      adminIdArr:[], // 管理员编号数组
      roleData:[], // 角色信息
      roleIdArr:[], // 角色编号数组
      dialogFormVisible: false,  // 表单是否可见
      grantRoleDialogVisible: false,
      dialogStatus: '',  // 对话框状态
      temp: {
        adminId: null, // 系统用户编号
        adminName: '', // 系统用户名称
        email: '', // 电子邮箱
        isDel: 0 // 是否删除
      },
      textMap: {
        update: '修改',
        create: '新增'
      },
      rules: { // 表单验证规则
        adminName: [
          { required: true, message: '请输入系统用户名称!', trigger: 'blur' },
          { required: true, message: '该用户已经存在!',trigger: 'blur', validator: checkAdminNameExists}
          ],
        email: [
          {required: true, message: '请输入电子邮箱!', trigger: 'blur'},
          { type: 'email', required: true, message: '邮箱格式不正确!', trigger: 'blur'}
        ]
      }
    }
  }, 
  created: function() {
    this.handleGetData(this.listQuery.page, this.listQuery.limit)
  },
  methods: {
    handleGetData(page, limit,value=null) { // 获取管理员数据
      var params = value === null ? {
          page: page,
          limit: limit
        } :
        {
          page: page,
          limit: limit,
          adminName: value
        };
      var that = this
      req.get(that.api.shopAdminAPI, {
        params: params
      })
      .then(function(resp) {
        if(resp.data.status === 0){
          that.baseMsg('数据加载成功!','success');
          that.tableData = resp.data.data.data
          that.total = resp.data.data.count
        }else{
          that.baseMsg('数据加载失败!','error');
        }
      }).catch(function(error) {
        console.log(error)
      })
    },
    handleCancel(){ // 取消
      this.dialogFormVisible = false;
      this.$refs['dataForm'].resetFields();
    },
    handleCreate() { 
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
    },
    createData(){
      this.commonSubmit(this.api.addShopAdmin,this.temp);
    },
    commonSubmit(url,data){
      var that = this
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // 提交表单
          req.post(url,data).then((resp) =>{
            if(resp.data.status === 0){
              that.baseNotify('成功',resp.data.msg,'success');
              that.dialogFormVisible = false;
              that.handleGetData(that.listQuery.page,that.listQuery.limit);
              that.$refs['dataForm'].resetFields();
              // 重置
              that.resetTemp();
            }else{
              that.baseNotify('失败',resp.data.msg,'error');
            }
          }).catch((error) => {
            that.baseMsg(error,'error');
          })
        } else {
          that.baseMsg('表单验证失败!','error');
          return false;
        }
      });
    },
    updateData(){
      this.commonSubmit(this.api.editShopAdmin,this.temp);
    },
    checkAdminName(adminName){
      console.log('系统用户:'+adminName);
    },
    handleSizeChange(val) {
        this.listQuery.limit = val
        this.handleGetData(this.listQuery.page, this.listQuery.limit)
    },
    resetTemp(){  // 重置表单数据
      this.temp = {
        adminId: 0,
        adminName: null,
        email: null,
        isDel: 0
      }
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.handleGetData(this.listQuery.page, this.listQuery.limit)
    },
    handleEdit(index,row){ // 编辑系统用户信息
      var that = this;
      that.dialogFormVisible = true;
      that.dialogStatus = 'update';
      // 获取系统用户
      req.get(that.api.shopAdminFindOne+"?adminId="+row.adminId).then((resp) =>{
        console.log(resp.data.status);
        if(resp.data.status === 0){
          that.temp = resp.data.data;
          console.log(resp.data.data);
        }else{
          that.baseNotify('失败',resp.data.msg,'error');
        }
      }).catch((error) =>{
        console.log(error);
      })
    },
    handleDelete(index,row){ // 删除系统用户信息
      var that = this;
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          req.get(that.api.deleteShopAdmin+"?adminId="+row.adminId).then((resp)=>{
            if(resp.data.status === 0){
              that.baseNotify('成功',resp.data.msg,'success');
              that.handleGetData(that.listQuery.page,that.listQuery.limit);
            }else{
              that.baseNotify('失败',resp.data.msg,'error');
            }
          }).catch((error) =>{
            console.log(error);
          });
        }).catch(() => {
          this.baseMsg('已取消删除')
        });
    },
    handleBatchRemove() {
      var that = this;
      var data = 'adminIds='+this.adminIdArr
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          req.get(that.api.deleteBatchShopAdmin+"?adminIds="+that.adminIdArr).then((resp)=>{
            if(resp.data.status === 0){
              that.baseNotify('成功',resp.data.msg,'success');
              that.handleGetData(that.listQuery.page,that.listQuery.limit);
            }else{
              that.baseNotify('失败',resp.data.msg,'error');
            }
          }).catch((error) =>{
            console.log(error);
          });
        }).catch(() => {
          this.adminIdArr = []
          this.baseMsg('已取消删除')
        });
    },
    handleSearch(){  // 搜索用户信息
      var searchValue = this.searchValue;
      if(searchValue === '' || searchValue === null){
        this.baseMsg('请输入搜索值!','error');
        return false;
      }
      this.handleGetData(1,this.listQuery.limit,searchValue);
    },
    handleSelectionChange(val) {
      var that = this
      val.forEach((ele) => {
        that.adminIdArr.push(ele.adminId)
      })
    },
    handleRefresh(){ // 刷新数据
      this.handleGetData(this.listQuery.page,this.listQuery.limit);
    },
    cancelGrantRole() { // 取消授予角色
      this.grantRoleDialogVisible=false
      this.$refs.multipleTable.clearSelection(); // 清空表格选择
      this.adminIdArr = [];
      this.roleIdArr = [];
    },
    handleGrantRole() { // 授予角色
      var that = this
      if(this.adminIdArr.length <=0){
        this.baseMsg('请选择要授予角色的用户!','error');
        return false;
      }
      // 获取角色信息
      req.get(that.api.findAllShopRole)
      .then((resp) =>{
        if(resp.data.status === 0){
          that.grantRoleDialogVisible = true
          that.roleData = resp.data.data
        }else{
          that.baseNotify('失败',resp.data.msg,'error');
        }
      }).catch((error) => {
        console.log(error)
      });
      // 数据回显
      req.get(that.api.shopAdminFindRole, {
        params: {
          adminId: that.adminIdArr[0]
        }
      }).then((resp) => {
        if(resp.data.status === 0){
          that.roleIdArr = resp.data.data
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    handleGrantRoleData() { // 保存授予的角色信息
      var that = this
      if(this.roleIdArr.length <=0){
        this.baseMsg('请选用角色!','error');
        return false;
      }
      req.get(that.api.shopAdminGrantRole+"?adminIds="+that.adminIdArr+"&roleIds="+that.roleIdArr)
          .then((resp)=>{
            that.adminIdArr = []
            that.roleIdArr = []
            that.$refs.multipleTable.clearSelection(); // 清空表格选择
            if(resp.data.status === 0){
              that.grantRoleDialogVisible = false
              that.baseNotify('成功',resp.data.msg,'success');
              that.handleGetData(that.listQuery.page,that.listQuery.limit);
            }else{
              that.baseNotify('失败',resp.data.msg,'error');
            }
          }).catch((error) =>{
            console.log(error);
          });
    }
  }
}
</script>