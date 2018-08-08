<template>
  <div class="app-container">
    <div style="margin: 0px 0px 10px 0px;">
      <el-button @click="handleCreate" type="primary" icon='el-icon-circle-plus' plain>增加</el-button>
      <el-button type="danger" icon="el-icon-delete" plain>批量删除</el-button>
      <el-button @click="showGrantPermission" type="success" plain="">授予权限</el-button>
      <el-form  class="demo-form-inline" ref="form" style="display:inline-block;" label-width="10px">
        <el-form-item >
          <el-input  placeholder="请输入搜索值!"></el-input>
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
        prop="roleName"
        label="角色名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createdBy"
        label="录入人">
      </el-table-column>
      <el-table-column
        prop="createdTime"
        label="录入时间">
      </el-table-column>
      <el-table-column
        prop="updatedBy"
        label="修改人">
      </el-table-column>
      <el-table-column
        prop="updatedTime"
        label="修改时间">
      </el-table-column>
      <el-table-column
        prop="roleDescription"
        label="角色描述"
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" 
      label-width="80px" style='width: auto; margin-left:10px;'>
          <el-form-item label="角色名称" prop="roleName">
            <el-input type="text"  placeholder="请输入角色名称!" v-model="temp.roleName">
            </el-input>
          </el-form-item>
          <el-form-item label="角色描述" >
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入角色描述!" v-model="temp.roleDescription">
            </el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" plain>{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData" plain>{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData" plain>{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog width="70%" top="5vh" :append-to-body="true" :center="true" title="角色授权" :visible.sync="dialogRoleVisible">
      <div style="height:550px;overflow:auto;">
        <grant-permission :is-edit='false'></grant-permission>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRoleVisible = false" plain>{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="handleGrantPermission" plain>确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import req from '@/utils/request' 
  import grantPermission  from  './grantPermission'
  export default {
    components: { grantPermission },
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
        dialogFormVisible: false,
        dialogRoleVisible: false,
        dialogStatus: '',
        temp: {
          roleName: '',
          roleDescription: ''
        },
        textMap: {
          update: '修改',
          create: '新增'
        },
        rules: {
          roleName: [{ required: true, message: '请输入角色名称!', trigger: 'blur' }]
        }
      }
    },
    created: function() {
      this.handleGetData(this.listQuery.page, this.listQuery.limit)
    },
    methods: {
      handleGetData(page, limit) {
        var that = this
        req.get(this.api.shopRoleAPI, {
          params: {
            page: page,
            limit: limit
          }
        })
          .then(function(resp) {
            if(resp.data.status === 0){
              that.baseMsg("数据加载成功!",'success');
              that.tableData = resp.data.data.data
              that.total = resp.data.data.count
            }else{
              that.baseMsg("数据加载失败!",'error');
            }
          }).catch(function(error) {
            console.log(error)
          })
      },handleSizeChange(val) {
        this.listQuery.limit = val
        this.handleGetData(this.listQuery.page, this.listQuery.limit)
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.handleGetData(this.listQuery.page, this.listQuery.limit)
      },
      handleSearch: function() {

      },
      handleRefresh: function() {
        this.handleGetData(this.listQuery.page,this.listQuery.limit)
      },
      handleDelete(index, row) {
        var that = this
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
              // 异步提交数据
          req.get(that.api.removeShopRole, {
            params: {
              roleId: row.roleId
            }
          })
          .then(function(resp) {
              if (resp.data.status === 0) {
                that.success(resp.data.msg);
                that.handleGetData(that.listQuery.page,that.listQuery.limit);
              } else {
                that.error(resp.data.msg)
              }
            }).catch((error) =>{
              console.log(error);
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      showGrantPermission(){ // 为角色授予权限
        this.dialogRoleVisible = true
        //this.router.push('grantPermission')
      },
      handleGrantPermission() {
        console.log(this.$store.getters.grantPermissionData)
        var permissionData = this.$store.getters.grantPermissionData
        // if(permissionData.length > 0){

        // }else{
        //   this.baseMsg('请选择要授权的数据?','error')
        // }
        var data = [];
        permissionData.forEach((ele) => {
          console.log(typeof ele.second.isIndeterminate)
          if(ele.isIndeterminate || ele.firstCheckAll){
            data.push(ele)
          }
        })
        console.log(data)
        if(data.length == 0){
          this.baseMsg('请选择要授权的数据?','error')
        }
      },
      handleEdit(index, row) {
        var roleId = row.roleId
        var that = this;
        this.dialogStatus = 'update';
        req.get(this.api.shopRoleFindOne, {
          params: {
            roleId: roleId
          }
        })
          .then(function(resp) {
            if (resp.data.status === 0) {
              that.dialogFormVisible = true
              that.temp = resp.data.data
              that.dialogStatus = 'update'
              that.$nextTick(() => {
                that.$refs['dataForm'].clearValidate()
              })
            } else {
              that.error('数据获取失败!')
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      handleCreate: function() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData: function() {
        var that = this
        this.$refs['dataForm'].validate((valid) => {
          console.log(valid)
          if (valid) {
            req.post(this.api.addShopRole, this.temp)
              .then(function(resp) {
                if (resp.data.status === 0) {
                  that.success(resp.data.msg)
                  that.dialogFormVisible = false
                } else {
                  that.error(resp.data.msg)
                }
              })
              .catch(function(error) {
                console.log(error)
              })
          }
        })
      },
      updateData: function() {
        var that = this
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            req.post(this.api.updateShopRole, that.temp)
            .then(function(resp) {
              if (resp.data.status === 0) {
                that.success(resp.data.msg)
                that.dialogFormVisible = false
              } else {
                that.error(resp.data.msg)
              }
            })
          }
        })
      },
      resetTemp: function() {
        this.temp = {
          roleName: '',
          roleDescription: ''
        }
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