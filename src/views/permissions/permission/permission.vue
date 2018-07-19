<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <!-- <div>
          <el-form  class="demo-form-inline" ref="form" style="display:inline-block;" label-width="10px">
            <el-form-item >
              <el-input  placeholder="请输入搜索值!"></el-input>
            </el-form-item>
          </el-form>
          <el-button  style="display:inline-block;" type="primary"  icon="el-icon-search">搜索</el-button>
          <el-button  icon="el-icon-refresh">刷新</el-button>
        </div> -->
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5" style="border:1px solid rgb(235, 238, 245);">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText">
        </el-input>
        <el-tree
          :data="treeData"
          node-key="id"
          ref="tree"
          :default-expand-all="true"
          :show-checkbox="true"
          :check-strictly="true"
          :expand-on-click-node="false"
          highlight-current
          :filter-node-method="filterNode"
          :props="defaultProps"
          :render-content="renderContent">
          <!-- <span class="custom-tree-node" slot-scope="{node, data}">
            <span>{{ node.id }}</span>
            <span>
              <el-button
                type="text"
                size="mini"
                >
                Append
              </el-button>
            </span>
        </span> -->
        </el-tree>
      </el-col>
      <el-col :span="19">
        <el-table :data="tableData"
            stripe
            border
            size="mini"
            style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column  label="权限名称">
                <template slot-scope="scope">
                  <el-tag>{{scope.row.name}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="排序" width="55">
                <template slot-scope="scope">
                    <span>{{scope.row.sort}}</span>
                </template>
            </el-table-column>
            <el-table-column label="级别">
                <template slot-scope="scope">
                    <span>{{scope.row.level}}</span>
                </template>
            </el-table-column>
            <el-table-column label="路径" width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.path}}</span>
                </template>
            </el-table-column>
            <el-table-column label="录入人">
                <template slot-scope="scope">
                    <span>{{scope.row.createdBy}}</span>
                </template>
            </el-table-column>
            <el-table-column label="录入时间">
                <template slot-scope="scope">
                    <span>{{scope.row.createdTime}}</span>
                </template>
            </el-table-column>
            <el-table-column label="修改人">
                <template slot-scope="scope">
                    <span>{{scope.row.updatedBy}}</span>
                </template>
            </el-table-column>
            <el-table-column label="修改日期">
                <template slot-scope="scope">
                    <span>{{scope.row.updatedTime}}</span>
                </template>
            </el-table-column>
            <el-table-column label="描述">
                <template slot-scope="scope">
                    <span>{{scope.row.description}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column label="操作" width='290px'>
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                plain
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                plain
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button size='mini' type="warning" plain>禁用</el-button>  
            </template>
            </el-table-column> -->
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
       </el-col>
    </el-row>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" 
      label-width="80px" style='width: auto; margin-left:10px;'>
          <el-form-item label="系统菜单" prop="name">
            <el-input type="text"  placeholder="请输入排序!" v-model="temp.name">
            </el-input>
          </el-form-item>
          <el-form-item label="排序">
            <el-input type="text"  placeholder="请输入排序!" v-model="temp.sort">
            </el-input>
          </el-form-item>
          <el-form-item label="级别" prop="level">
            <el-select class="filter-item" 
              v-model="temp.level" placeholder="请选择菜单级别!">
              <el-option key="0" label="根目录" :value="0" disabled=""></el-option>
              <el-option key="1" label="一级菜单" :value="1"></el-option>
              <el-option key="2" label="二级菜单" :value="2"></el-option>
              <el-option key="3" label="三级菜单" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="路径" prop="path">
            <el-input type="text"  placeholder="请输入路径!" v-model="temp.path">
            </el-input>
          </el-form-item>
          <el-form-item label="描述" >
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入描述信息!" v-model="temp.description">
            </el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel()" plain>{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData" plain>{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData" plain>{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import treeTable from '@/components/TreeTable'
import req from '@/utils/request'
import treeToArray from './customEval'
let id = 0;
export default {
 watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  data() {
    return {
      filterText: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
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
      data: [],
      dialogFormVisible: false,
      dialogStatus: '',
      temp: {
        name: '',
        sort: 0,
        path: '',
        parentId: 0,
        level: '',
        description: ''
      },
      currentNode:null, // 当前操作节点
      textMap: {
        update: '编辑',
        create: '新增'
      },
      rules: {
        name: [ {required: true, message: '请输入系统菜单!', trigger: 'blur' }],
        path: [ {required: true, message: '请输入路径!', trigger: 'blur' }],
        level: [ {required: true, message: '请选择菜单级别!', trigger: 'change' }]
      }
    }
  },
  created: function() {
    var that = this
    req.get(that.myConfig.host + 'authc/shopMenu/menuData').then(function(resp) {
      if (resp.data.status === 0) {
        that.treeData = resp.data.data;
      } else {
        that.errorNotify('数据加载失败!')
      }
    });
    this.handleGetData(this.listQuery.page,this.listQuery.limit);
  },
  methods: {
      handleGetData(page,limit){
        var that = this;
        req.get(that.api.shopMenuAPI,{
          params: {
            page: page,
            limit: limit
          }
        }).then((resp) => {
          if(resp.data.status === 0){
            that.tableData = resp.data.data.data;
            that.total = resp.data.data.count;
          }else{
            that.error('数据加载失败!');
          }
        })
      },
      handleCreateData: function() {
        var that = this
        that.dialogStatus = 'create'
        that.dialogFormVisible = true
      },
      createData: function(index, row) {
        var that = this;
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            req.post(that.api.saveShopMenu,that.temp).then((resp) => {
              if(resp.data.status === 0){
                that.successNotify('操作成功!');
                this.$refs.tree.setCheckedNodes([]);
                that.dialogFormVisible=false; // 关闭弹框
                that.$refs['dataForm'].resetFields(); // 重置表单
                that.resetTemp();// 重置表单数据
              }else{
                 that.errorNotify('操作失败!');
              }
            }).catch((error) => {
                console.log(error);
            });
          } else {
            that.error('表单验证失败!')
          }
        })
      },
      handleEdit: function(index, row) {
        var that = this
        that.dialogStatus = 'update'
        that.dialogFormVisible = true
        req.get(that.myConfig.host + 'authc/shopMenu/findOne', {
            params: {
             id: row.id
           }
      }).then(function(resp) {
        if (resp.data.status === 0) {
          that.temp = resp.data.data
        } else {
          that.error(resp.data.msg)
          }
        })
      },
      updateData: function() {
        var that = this
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            req.post(that.api.updateShopMenu,that.temp).then((resp) => {
              if(resp.data.status === 0){
                that.successNotify('操作成功!');
                this.$refs.tree.setCheckedNodes([]);
                that.dialogFormVisible=false; // 关闭弹框
                that.$refs['dataForm'].resetFields(); // 重置表单
                that.resetTemp();// 重置表单数据
              }else{
                 that.errorNotify('操作失败!');
              }
            }).catch((error) => {
                console.log(error);
            });
          } else {
            that.error('表单验证失败!')
          }
        })
      },
      handleCancel(){
        this.$refs.tree.setCheckedNodes([]);
        this.dialogFormVisible = false;
        this.$refs['dataForm'].resetFields(); // 重置表单
        this.resetTemp();
      },
      resetTemp(){ // 重置表单数据
        this.temp = {
          name: '',
          sort: 0,
          path: '',
          parentId: 0,
          level: '',
          description: ''
        }
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      append(data) {
        this.$refs.tree.setCheckedNodes([{id: data.id,name: data.name}])
        this.dialogFormVisible = true;
        this.dialogStatus = 'create';
        this.temp.parentId = data.id;
        this.currentNode= data;
        // const newChild = { id: id++, name: '添加节点', children: [] };
        // if (!data.children) {
        //   this.$set(data, 'children', []);
        // }
        // data.children.push(newChild);
      },
      edit(data) {
        var that = this;
        this.dialogStatus = 'update'
        this.dialogFormVisible = true;
        that.$refs.tree.setCheckedNodes([{id: data.id,name: data.name}])
        // const newChild = { id: id++, name: '编辑节点', children: [] };
        // if (!data.children) {
        //   this.$set(data, 'children', []);
        // }
        //data.children.push(newChild);
        req.get(that.api.findShopMenu,{
          params: {
            id: data.id
          }
        }).then( (resp) => {
            if(resp.data.status === 0){
              that.temp = resp.data.data;
            }else{
              that.errorNotify(resp.data.msg);
            }
        }).catch( (error) => {
          console.log(error);
        })
      },
      remove(node, data) {
        var that = this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          req.get(this.api.removeShopMenu,{
          params: {
            id: data.id
          }
          }).then((resp) => {
            if(resp.data.status === 0){
              const parent = node.parent;
              const children = parent.data.children || parent.data;
              const index = children.findIndex(d => d.id === data.id);
              children.splice(index, 1);
              that.successNotify(resp.data.msg);
            }else{
              that.errorNotify(resp.data.msg);
            }
        }).catch((error) => {
          console.log(error)
        });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
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
      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span><i class={node.childNodes.length > 0 ?'el-icon-goods parent-menu-icon':'el-icon-tickets leave-menu-icon'}></i>&nbsp;{node.label}</span>
            <span>
              <el-button v-show={node.level ===4?false:true}  title='添加子级菜单' type="text" on-click={ () => this.append(data) }>
                <i class="el-icon-circle-plus"></i>
              </el-button>
              <el-button class='edit-btn' title='编辑菜单' type="text" on-click={ () => this.edit(data) }>
                <i class="el-icon-edit-outline"></i>
              </el-button>
              <el-button class='delete-btn'  title='删除菜单' type="text" on-click={ () => this.remove(node, data) }>
                <i class="el-icon-delete"></i>
              </el-button>
            </span>
          </span>);
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
     },
    successNotify(msg){
       this.$notify({
          title: '成功',
          message: msg,
          type: 'success'
        });
    },
    errorNotify(msg){
      this.$notify.error({
        title: '错误',
        message: msg
      });
    }
  }
}
</script>
<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .delete-btn{
    color: red;
  }
  .edit-btn{
    color:#e6a23c;
  }
  .parent-menu-icon{
    color:black;
  }
  .leave-menu-icon{
    color:orange;
  }
</style>
