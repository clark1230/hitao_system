<template>
  <div class="app-container">
    <div style="margin: 0px 0px 10px 0px;">
      <el-button @click="handleCreate" type="primary" icon='el-icon-circle-plus' plain>增加</el-button>
      <el-button @click="handleBatchRemove" type="danger" icon="el-icon-delete" plain>批量删除</el-button>
      <el-form  class="demo-form-inline" ref="form" style="display:inline-block;" label-width="10px">
        <el-form-item >
          <el-input v-model="searchValue"  placeholder="请输入搜索值!"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="handleSearch" style="display:inline-block;" type="primary"  icon="el-icon-search">搜索</el-button>
      <el-button @click="handleRefresh" icon="el-icon-refresh">刷新</el-button>
    </div>
    <el-table
      :data="tableData"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
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
        prop="acName"
        label="分类名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="acCode"
        label="分类标识码">
      </el-table-column>
      <el-table-column
        prop="acSort"
        label="排序">
      </el-table-column>
      <el-table-column
        label="是否删除">
        <template slot-scope="scope">
          <span v-if="scope.row.isDel ===1">是</span>
          <span v-if="scope.row.isDel ===0">否</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createdTime"
        label="录入时间">
      </el-table-column>
      <el-table-column
        prop="updatedTime"
        label="修改时间">
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
          <el-form-item label="分类名称" prop="acName">
            <el-input type="text"  placeholder="请输入分类名称!" v-model="temp.acName">
            </el-input>
          </el-form-item>
          <el-form-item label="识别码" >
            <el-input type="text"  placeholder="请输入分类识别码!" v-model="temp.acCode">
            </el-input>
          </el-form-item>
          <el-form-item label="排序" >
            <el-input type="text"  placeholder="请输入排序编号!" v-model="temp.acSort">
            </el-input>
          </el-form-item>
          <el-form-item label="是否删除" >
              <el-radio-group v-model="temp.isDel" >
              <el-radio :label="0" :border="true">否</el-radio>
              <el-radio :label="1" :border="true">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态" >
            <el-radio-group v-model="temp.acStatus" >
              <el-radio :label="0" :border="true">启用</el-radio>
              <el-radio :label="1" :border="true">禁用</el-radio>
            </el-radio-group>
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
import req from "@/utils/request";
export default {
  data() {
    return {
      tableData: [],
      acIdArr: [],
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
      dialogRoleVisible: false,
      dialogStatus: "",
      searchValue: null,
      temp: {
        acName: null,
        acCode: null,
        acSort: null,
        isDel: 0,
        acStatus: 0
      },
      textMap: {
        update: "修改",
        create: "新增"
      },
      rules: {
        acName: [{ required: true, message: "请输入名称!", trigger: "blur" }]
      }
    };
  },
  created() {
    this.handleGetData(this.listQuery.page, this.listQuery.limit);
  },
  methods: {
    handleGetData(page, limit, acName = null) {
      var that = this;
      var params =
        acName === null
          ? {
              page: page,
              limit: limit
            }
          : {
              page: page,
              limit: limit,
              acName: acName
            };
      req
        .get(this.api.articleClassAPI, {
          params: params
        })
        .then(function(resp) {
          if (resp.data.status === 0) {
            that.baseMsg("数据加载成功!", "success");
            that.tableData = resp.data.data.data;
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
      this.listQuery.limit = val;
      this.handleGetData(this.listQuery.page, this.listQuery.limit);
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.handleGetData(this.listQuery.page, this.listQuery.limit);
    },
    handleCreate() {
      // 添加文章分类
      this.dialogFormVisible = true;
      this.dialogStatus = "create";
    },
    handleEdit(index, row) {
      var that = this;
      this.dialogStatus = "update";
      req
        .get(this.api.findArticleClass, {
          params: {
            acId: row.acId
          }
        })
        .then(resp => {
          if (resp.data.status === 0) {
            that.temp = resp.data.data;
            that.dialogFormVisible = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSearch() {
      if (this.searchValue === null || this.searchValue === "") {
        this.baseMsg("请输入搜索参数!", "error");
        return false;
      }
      this.handleGetData(1, this.listQuery.limit, this.searchValue);
    },
    handleRefresh() {
      this.handleGetData(this.listQuery.page, this.listQuery.limit);
    },
    createData() {
      this.commonSubmit(this.api.saveArticleClass, this.temp);
    },
    updateData() {
      this.commonSubmit(this.api.updateArticleClass, this.temp);
    },
    commonSubmit(url, data) {
      var that = this;
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          // 提交表单
          req
            .post(url, data)
            .then(resp => {
              if (resp.data.status === 0) {
                that.baseNotify("成功", resp.data.msg, "success");
                that.dialogFormVisible = false;
                that.handleGetData(that.listQuery.page, that.listQuery.limit);
                that.$refs["dataForm"].resetFields();
                // 重置
                that.resetTemp();
              } else {
                that.baseNotify("失败", resp.data.msg, "error");
              }
            })
            .catch(error => {
              that.baseMsg(error, "error");
            });
        } else {
          that.baseMsg("表单验证失败!", "error");
          return false;
        }
      });
    },
    resetTemp() {
      this.temp = {
        acName: null,
        acCode: null,
        acSort: null,
        isDel: 0,
        acStatus: 0
      };
    },
    handleDelete(index, row) {
      var that = this;
      this.$confirm("此操作将永久删除该文章分类信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          req
            .get(this.api.removeArticleClass, {
              params: {
                acId: row.acId
              }
            })
            .then(resp => {
              if (resp.data.status === 0) {
                that.baseNotify("成功", resp.data.msg, "success");
                that.handleGetData(that.listQuery.page, that.listQuery.limit);
              } else {
                that.baseNotify("失败", resp.data.msg, "error");
              }
            });
        })
        .catch(() => {
          this.baseMsg("已取消删除!");
        });
    },
    handleSelectionChange(val) {
      console.log(val);
      var that = this;
      val.forEach(ele => {
        that.acIdArr.push(ele.acId);
      });
    },
    handleBatchRemove() {
      // 批量删除数据
      var that = this;
      if (this.acIdArr.length !== 0) {
        this.$confirm("此操作将永久删除该文章分类信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            req
              .get(this.api.removeBatchArticleClass + "?acIds=" + this.acIdArr)
              .then(resp => {
                if (resp.data.status === 0) {
                  that.baseNotify("成功 ", resp.data.msg, "success");
                  that.handleGetData(that.listQuery.page, that.listQuery.limit);
                } else {
                  that.baseNotify("失败", resp.data.msg, "error");
                }
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(() => {
            this.baseMsg("已取消删除!");
          });
      } else {
        this.baseMsg("请选择要删除的数据!", "error");
      }
    }
  }
};
</script>

