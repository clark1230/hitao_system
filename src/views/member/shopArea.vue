<template>
  <div class="app-container">
    <div style="margin: 0px 0px 10px 0px;">
      <el-button @click="handleCreate" type="primary" icon='el-icon-circle-plus' plain>增加</el-button>
      <el-button type="danger" icon="el-icon-delete" plain>批量删除</el-button>
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
    <el-table :data="tableData" stripe border size="mini" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="地区名称" width="180">
        <template slot-scope="scope">
          <el-tag type="primary">{{scope.row.areaName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="areaParentId" label="父级编号" width="180"> </el-table-column>
      <el-table-column prop="areaSort" label="排序" width="100"></el-table-column>
      <el-table-column  prop="postCode" label="邮编" width="130"></el-table-column>
      <el-table-column label="地区深度" width="140">
        <template slot-scope="scope">
          <span v-if="scope.row.areaDeep ==1">省/直辖市</span>
          <span v-if="scope.row.areaDeep ==2">市级市</span>
          <span v-if="scope.row.areaDeep ==3">县/区</span>
        </template>
      </el-table-column>
      <el-table-column label="是否删除" width="80">
        <template slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.isDel ==0">否</el-tag>
          <el-tag type="danger" v-if="scope.row.isDel ==1">是</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="录入时间"></el-table-column>
      <el-table-column prop="updatedTime" label="编辑时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
             title="编辑" icon="el-icon-edit" plain></el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)" 
            title="删除" icon="el-icon-delete" plain></el-button>
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
          <el-form-item label=区域名称 prop="areaName">
            <el-input type="text"  placeholder="请输入区域名称!" v-model="temp.areaName">
            </el-input>
          </el-form-item>
          <el-form-item label=父级区域 prop="areaParentId">
            <el-select
                v-model="temp.areaParentId"
                filterable
                remote
                reserve-keyword
                placeholder="请输入父级区域名称!"
                :remote-method="querySearchAsync"
                :loading="loading">
                <el-option
                  v-for="item in areaArr"
                  :key="item.areaId"
                  :label="item.areaName"
                  :value="item.areaId">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="邮编" prop="postCode">
            <el-input type="text"  placeholder="请输入邮编!" v-model="temp.postCode">
            </el-input>
          </el-form-item>
          <el-form-item label="排序" prop="areaSort">
            <el-input type="text"  placeholder="请输入区域排序!" v-model="temp.areaSort">
            </el-input>
          </el-form-item>
          <el-form-item label="地区深度"  prop="areaDeep">
            <el-select class="filter-item" 
              v-model="temp.areaDeep" placeholder="请选择区域深度!">
              <el-option key="1" label="省/直辖市/自治区" :value="1"></el-option>
              <el-option key="2" label="市级市" :value="2"></el-option>
              <el-option key="3" label="区/县" :value="3"></el-option>
            </el-select>
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
  import req from '@/utils/request'
  export default{
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
        searchParam: '',
        searchValue: '',
        options: [{
          value: '1',
          label: '省/直辖市/自治区'
        },{
          value: '2',
          label: '市级市'
        },{
          value: '3',
          label: '区/县'
        }],
        areaArr:[],
        dialogFormVisible: false,
        dialogStatus: '',
        loading: false,
        temp: {
          areaName: null,
          areaParentId: null,
          areaSort: null,
          postCode: null,
          areaDeep: null
        },
        textMap: {
          update: '修改',
          create: '新增'
        },
        rules: {
          areaName: [{ required: true, message: '请输入区域名称!', trigger: 'blur' }],
          areaParentId: [{ required: true, message: '请输入输入父级区域!', trigger: 'blur' }],
          postCode: [{ required: true, message: '请输入输入邮编!', trigger: 'blur' }],
          areaDeep: [{ required: true, message: '请选择区域深度!', trigger: 'change' }]
        }
      }
    },
    created: function(){
      this.handleGetData(this.listQuery.page, this.listQuery.limit)
      //this.areaArr = this.loadAll();
    },
    methods: {
      handleGetData(page, limit, searchParam, searchValue) {
        var that = this
        req.get(that.api.shopAreaAPI, {
          params: {
            page: page,
            limit: limit,
            searchParam: searchParam,
            searchValue: searchValue
          }
        })
          .then(function(resp) {
            that.tableData = resp.data.data.data
            that.total = resp.data.data.count
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
      handleSearch() { // 处理搜索
        let searchParam = this.searchParam
        let searchValue = this.searchValue
        if (searchParam === ''){
           this.baseMsg('请选择搜索条件!','error')
           return false
        } else {
          let reg = /^\d{1,}$/
          if ( searchValue === ''){
             this.baseMsg('请输入搜索值!','error')
             return false
          }else if( searchParam === 'postCode' && !reg.test(searchValue)){
            this.baseMsg('邮编为数字!','error')
            this.searchValue = ''
            return false
          }
          // 搜索
          this.handleGetData(1,20,searchParam,searchValue)
        }
      },
      querySearchAsync(queryString) { // 远程搜索区域信息
        var that = this
        console.log(queryString)
        if(queryString !== ''){
          // 异步获取数据
          this.loading = true;
          req.get(this.api.findParentShopArea,{
            params: {
              areaName: queryString
            }
          }).then((resp) => {
            that.loading = false;
            that.areaArr = resp.data.data;
            // resp.data.data.forEach( (ele)=>{
            //   if(ele.areaDeep === 1){
            //     areaDeep = '省/直辖市/自治区';
            //   }else if(ele.areaDeep === 2){
            //     areaDeep = '市级市';
            //   }else if(ele.areaDeep === 3){
            //     areaDeep = '区/县';
            //   }
            //   areaArr.push({
            //     value: ele.areaName+'---'+areaDeep,
            //     areaId: ele.areaId
            //   })
            // })
            // cb(areaArr);
          }).catch((error) => {
            console.log(error)
          })
        }
        // var results = queryString ? areaArr.filter(this.createStateFilter(queryString)) : areaArr;
        // clearTimeout(this.timeout);
        // this.timeout = setTimeout(() => {
        //   cb(results);
        // }, 8000); // 超时8秒
      },
      handleSelect(item) {  // 选择区域信息
        console.log(item);
        this.temp.areaParentId = item.areaId;
      },
      handleCreate(){ // 打开新增弹层
        this.dialogFormVisible = true
        this.dialogStatus = 'create'
      },
      handleEdit(index, row) { // 打开编辑弹层
        var that = this
       
        req.get(this.api.findShopArea,{
          params: {
            areaId: row.areaId
          }
        }).then((resp)=>{
            if(resp.data.status === 0){
              this.dialogFormVisible = true
              this.dialogStatus = 'update'
              that.temp = resp.data.data
            }
        }).catch((error)=>{
          console.log(error)
        })
      },
      handleCancel() {
      this.dialogFormVisible = false
      this.resetTemp()
      },
      handleDelete() {

      },
      createData() { // 保存区域信息
        var that = this
        this.$refs['dataForm'].validate((valid) => {
          console.log(valid)
          if (valid) {
            req.post(this.api.saveShopArea, this.temp)
              .then(function(resp) {
                if (resp.data.status === 0) {
                  that.baseNotify('成功',resp.data.msg,'success');
                  that.dialogFormVisible = false;
                  that.$refs['dataForm'].resetFields(); // 重置表单
                  tht.resetTemp()
                  that.handleRefresh()
                } else {
                  that.baseNotify('成功',resp.data.msg,'error');
                }
              })
              .catch(function(error) {
                console.log(error)
              })
          }
        })
      },
      updateData() { // 编辑区域信息
        var that = this
        this.$refs['dataForm'].validate((valid) => {
          console.log(valid)
          if (valid) {
            req.post(this.api.updateShopArea, this.temp)
              .then(function(resp) {
                if (resp.data.status === 0) {
                  that.baseNotify('成功',resp.data.msg,'success');
                  that.dialogFormVisible = false;
                  that.$refs['dataForm'].resetFields(); // 重置表单
                  tht.resetTemp()
                  that.handleRefresh()
                } else {
                  that.baseNotify('成功',resp.data.msg,'error');
                }
              })
              .catch(function(error) {
                console.log(error)
              })
          }
        })
      },
      resetTemp() {
        this.temp = {
          areaName: null,
          areaParentId: null,
          areaSort: null,
          postCode: null,
          areaDeep: null
        }
      }
    }
  }
</script>