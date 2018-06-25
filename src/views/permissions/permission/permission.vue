<template>
  <div class="app-container">
    <tree-table :data="data" :columns="columns" :evalFunc="func" :evalArgs="args"  border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="权限名称">
            <template slot-scope="scope">
                <span style="color:orange;">{{scope.row.name}}</span>
            </template>
        </el-table-column>
        <el-table-column label="排序">
            <template slot-scope="scope">
                <span>{{scope.row.sort}}</span>
            </template>
        </el-table-column>
        <el-table-column label="级别">
            <template slot-scope="scope">
                <span>{{scope.row.level}}</span>
            </template>
        </el-table-column>
        <el-table-column label="路径">
            <template slot-scope="scope">
                <span>{{scope.row.path}}</span>
            </template>
        </el-table-column>
        <el-table-column label="描述">
            <template slot-scope="scope">
                <span>{{scope.row.description}}</span>
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
        <el-table-column label="操作" width='290px'>
        <template slot-scope="scope">
          <el-button size='mini' type='success' plain @click="handleCreateData">新增</el-button>
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
        </el-table-column>
    </tree-table>
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
            <el-select class="filter-item"  v-model="temp.level" placeholder="请选择菜单级别!">
              <el-option  label="一级类目" value="1"></el-option>
              <el-option  label="二级类目" value="2"></el-option>
              <el-option  label="三级类目" value="3"></el-option>
              <el-option  label="系统按钮" value="4"></el-option>
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
        <el-button @click="dialogFormVisible = false" plain>{{$t('table.cancel')}}</el-button>
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
export default {
  name: 'treeTableDemo',
  components: { treeTable },
  data() {
    return {
      func: treeToArray,
      args: [],
      expandAll: true,
      columns: [
        {
          text: '',
          value: 'expand',
          width: 80
        }
      ],
      data: [],
      dialogFormVisible: false,
      dialogStatus: '',
      temp: {
        name: '',
        sort: 0,
        path: '',
        level: '',
        description: ''
      },
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
    req.get(that.myConfig.host + 'shopMenu/menuData').then(function(resp) {
      if (resp.data.status === 0) {
        that.data = resp.data.data
      } else {
        alert('获取数据失败!')
      }
    })
  },
  methods: {
      handleCreateData: function() {
        var that = this
        that.dialogStatus = 'create'
        that.dialogFormVisible = true
      },
      createData: function(index, row) {
        var that = this
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            alert('验证通过')
          } else {
            that.error('表单验证失败!')
          }
        })
      },
      handleEdit: function(index, row) {
        var that = this
        that.dialogStatus = 'update'
        that.dialogFormVisible = true
        req.get(that.myConfig.host + 'shopMenu/findOne', {
            params: {
             mId: row.mId
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
            alert('验证通过')
          } else {
            that.error('表单验证失败!')
          }
        })
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
