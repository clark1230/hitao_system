<template>
  <div class="app-container">
    <div style="margin: 0px 0px 10px 0px;">
      <el-button  @click="handleAdd" type="primary" icon='el-icon-circle-plus' plain>增加</el-button>
      <el-button @click="handleDeletByIds" type="danger" icon="el-icon-delete" plain>批量删除</el-button>
      <el-form  class="demo-form-inline" ref="form" style="display:inline-block;" label-width="10px">
        <el-form-item >
          <el-input  placeholder="请输入搜索值!"></el-input>
        </el-form-item>
      </el-form>
      <el-button  style="display:inline-block;" :loading="btnRefresh.isSearchRefresh" type="primary"  icon="el-icon-search">搜索</el-button>
      <el-button @click="handleRefresh" icon="el-icon-refresh">刷新</el-button>
      <el-button type="primary" @click="handleGatewayRefresh" :loading="btnRefresh.isRefreshRoute" icon="el-icon-refresh">刷新路由</el-button>
    </div>
    <el-table
      :data="tableData"
      ref="gatwayTable"
      v-loading="loading"
      stripe
      border
      size="mini"
      style="width: 100%"
      @selection-change="handleSelectChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column prop="id" label="编号" width="50"></el-table-column>
      <el-table-column prop="apiName" label="网关名称"></el-table-column>
      <el-table-column prop="serviceId" label="服务编号" width="180"></el-table-column>
      <el-table-column prop="path" label="服务请求规则" width="180"></el-table-column>
      <el-table-column prop="url" label="代理服务地址" width="180"></el-table-column>
      <el-table-column
        label="是否重试">
        <template slot-scope="scope">
          <span>{{scope.row.retryable}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="是否禁用">
        <template slot-scope="scope">
          <span>{{scope.row.enabled}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否忽略访问前缀">
        <template slot-scope="scope">
          <span>{{scope.row.stripPrefix}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            title="编辑网关" 
            @click="handleUpdate(scope.$index, scope.row)" 
            icon="el-icon-edit" plain></el-button>
          <el-button
            size="mini"
            type="danger"
            title="删除网关"
            @click="handleDelete(scope.$index,scope.row)"
             icon="el-icon-delete" plain></el-button>
          <el-button 
            size="mini" 
            @click="handleEnabled(scope.$index,scope.row)" 
            :type="scope.row.enabled === true?'danger':'info'" 
            :title='scope.row.enabled === true?"关闭网关":"启用网关"' 
            :icon='scope.row.enabled === true?"el-icon-sort-down":"el-icon-sort-up"' 
            plain></el-button>
        </template>
      </el-table-column>
    </el-table>
     <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" 
      @current-change="handleCurrentChange" 
      :current-page="listQuery.page" 
      :page-sizes="[5,10,15,30, 50]" 
      :page-size="listQuery.limit" 
      layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!--弹层-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" 
      label-width="80px" style='width: auto; margin-left:10px;'>
          <el-form-item label="网关名称" prop="apiName">
            <el-input type="text"  placeholder="请输入网关名称!" v-model="temp.apiName">
            </el-input>
          </el-form-item>
          <el-form-item label="服务编号" prop="serviceId">
            <el-input type="text" placeholder="请输入服务编号!" v-model="temp.serviceId"></el-input>
          </el-form-item>
          <el-form-item label="请求规则" prop="path">
            <el-input type="text" placeholder="请输入服务请求规则!" v-model="temp.path"></el-input>
          </el-form-item>
          <el-form-item label="服务地址" prop="url">
            <el-input type="text" placeholder="请输入代理服务地址!" v-model="temp.url"></el-input>
          </el-form-item>
          <el-form-item label="启用" prop="enabled">
            <el-radio-group v-model="temp.enabled">
              <el-radio :border='true' :label="true">启用</el-radio>
              <el-radio :border='true' :label="false">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="重试" prop="retryable">
            <el-radio-group v-model="temp.retryable">
              <el-radio :border='true' :label="true">是</el-radio>
              <el-radio :border='true' :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="忽略访问前缀" prop="stripPrefix">
            <el-radio-group v-model="temp.stripPrefix">
              <el-radio :border='true' :label="true">是</el-radio>
              <el-radio :border='true' :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel()" plain>{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" @click="handleSubmitData" type="primary"  plain>{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary"  @click="handleSubmitData" plain>{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>  
</template>
<script>
  import req from '@/utils/request'
  export default {
    data() {
      return {
        tableData: [],
        loading: true,
        btnRefresh: {
          isRefreshRoute: false, // 是否刷新路由信息
          isSearchRefresh: false // 是否搜索信息
        },
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
        dialogStatus: '',
        temp: {
          id: 0,
          path: '',
          serviceId: '',
          url: '',
          retryable: false,
          enabled: true,
          stripPrefix: true,
          apiName: ''
        },
        textMap: {
          update: '编辑网关',
          create: '添加网关'
        },
        ids: [],
        rules: {
          apiName: [{ required: true, message: '请输入网关名称!', trigger: 'blur' }],
          serviceId: [{ required: true, message: '请输入服务名称!', trigger: 'blur' }],
          url: [{ required: true, message: '请输入服务地址!', trigger: 'blur' }],
          path: [{ required: true, message: '请输入服务请求规则!', trigger: 'blur' }]
        }
      }
    },
    created: function() {
      this.handleGetData(this.listQuery.page, this.listQuery.limit)
    },
    methods: {
      handleGetData(page, limit) {
        var that = this
        req.get(that.api.gatewayAPI, {
          params: {
            page: page,
            limit: limit
          }
        })
          .then(function(resp) {
            that.loading =false
            if(resp.data.status === 0){
              that.baseMsg('数据加载成功!','success')
              that.tableData = resp.data.data.data;
              that.total = resp.data.data.count;
            }else{
              that.baseMsg('数据加载失败!','error');
            }
          }).catch(function(error) {
            that.loading =false
            console.log(error.reponse.status)
          })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.handleGetData(this.listQuery.page, this.listQuery.limit)
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.handleGetData(this.listQuery.page, this.listQuery.limit)
      },
      handleAdd(){ // 添加网关
        this.dialogFormVisible = true;
        this.dialogStatus = 'create';
      },
      handleUpdate(index,row){ //编辑网关
        var that = this;
        //this.$refs['dataForm'].resetFields();
        req.get(that.api.gatewayFindOne+'?id='+row.id, {
          params: {
          }
        })
          .then(function(resp) {
            that.temp = resp.data.data;
            console.log(that.temp)
            that.$nextTick(() => {
                that.dialogStatus = 'update';
                that.dialogFormVisible = true;
                //that.$refs['dataForm'].clearValidate()
              })
          }).catch(function(error) {
            console.log(error)
          })
      },
      handleEnabled(index,row){ // 启用/关闭网关
        var that = this;
        req.post(that.api.editGateway, {
            id: row.id,
            enabled: row.enabled === true?false:true
        })
          .then(function(resp) {
           if(resp.data.status === 0){
              that.baseNotify('成功','操作成功!','success');
              that.handleGetData(that.listQuery.page, that.listQuery.limit)
            }else{
              that.baseNotify('失败','操作失败!','error');
            }
          }).catch(function(error) {
            console.log(error)
          })
      },
      handleDelete(index,row){ // 删除网关信息
       this.commonDelete(row.id);
      },
      commonDelete(ids){
        var that = this;
        this.$confirm('此操作将永久删除该网关, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            req.get(that.api.deleteGateway+"?ids="+ids, {})
            .then(function(resp) {
              if(resp.data.status === 0){
                  that.baseNotify('成功','操作成功!','success');
                  that.handleGetData(that.listQuery.page, that.listQuery.limit);
                  that.ids = [];
                }else{
                  that.baseNotify('失败','操作失败!','error');
                }
              }).catch(function(error) {
                console.log(error);
              })
          }).catch(() => {
            this.baseMsg('已取消删除','info')
          });
      },
      handleDeletByIds(){ // 批量删除网关
        if(this.ids.length > 0){
          this.commonDelete(this.ids);
        }else{
          this.baseMsg('请选择要删除的数据!','error');
        }
      },
      handleSelectChange(rows){ // 勾选要删除的数据
        var that = this
        rows.forEach(row => {
            that.ids.push(row.id);
        });
      },
      handleRefresh() {
        this.loading = true
        this.handleGetData(1, 15)
      },
      handleGatewayRefresh() {
        // http://localhost:8200/refreshRoute
        let that = this
        that.btnRefresh.isRefreshRoute = true
        req.get(that.api.refreshRoute).then((resp)=>{
          that.btnRefresh.isRefreshRoute = false
          if(resp.data.status === 0){
            that.baseNotify('成功',resp.data.msg,'success')
          }else{
            that.baseNotify('失败',resp.data.msg,'error')
          }
        })
        .catch((error) =>{
          that.btnRefresh.isRefreshRoute = false
        })
      },
      handleSubmitData(){  //提交表单
        var that = this
        this.$refs['dataForm'].validate((valid) => {
          console.log(valid)
          if (valid) {
            that.baseMsg('表单校验成功!','success');
            var url = (that.dialogStatus === 'create'? that.api.addGateway : that.api.editGateway);
            req.post(url, this.temp)
              .then(function(resp) {
                if (resp.data.status === 0) {
                  that.baseNotify('成功',resp.data.msg,'success')
                  that.$refs['dataForm'].resetFields();
                  that.resetTemp(); // 重置数据
                  that.dialogFormVisible = false
                  that.handleGetData(that.listQuery.page,that.listQuery.limit);
                } else {
                  that.baseNotify('失败',resp.data.msg,'error')
                }
              })
              .catch(function(error) {
                console.log(error)
              })
          }else{
            that.baseMsg('表单校验失败!','error');
          }
        })
      },
      handleCancel(){  // 点击取消按钮
        this.dialogFormVisible = false;
        //重置表单
        this.$refs['dataForm'].resetFields();
        this.resetTemp();
      },
      resetTemp: function(){
        this.temp = {
          id: 0,  // 编号
          path: '', // 路由规则
          serviceId: '', // 服务编号
          url: '', // 代理微服务地址
          retryable: false, // 是否可重试
          enabled: true, // 是否启用
          stripPrefix: true, // 是否严格匹配前缀
          apiName: null // 网关名称
        };
      },
      successNotify(msg) {
         this.$notify({
          title: '成功',
          message: msg,
          type: 'success'
        });
      },
      errorNotify(msg) {
        this.$notify.error({
          title: '错误',
          message: msg
        });
      }
    }
  }
</script>
