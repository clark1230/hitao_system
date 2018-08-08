<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div style="margin: 0px 0px 10px 0px;">
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
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
          <el-tree
            :data="treeData"
            :props="defaultProps"
            node-key="id"
            :check-strictly="true"
            :default-expand-all="true"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            ref="tree"
            highlight-current
            show-checkbox
            :render-content="renderContent"
            >
          </el-tree>
        </div>
        <div>
          <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" 
      label-width="80px" style='width: auto; margin-left:10px;'>
          <el-form-item label="类目名称" prop="name">
            <el-input type="text"  placeholder="请输入类目名称!" v-model="temp.catName">
            </el-input>
          </el-form-item>
          <el-form-item label="排序">
            <el-input type="text"  placeholder="请输入排序!" v-model="temp.sort">
            </el-input>
          </el-form-item>
          <el-form-item label="排序">
           <el-upload
              :action="uploadHost"
              :headers="headers"
              :limit="1"
              name="iconImage"
              :on-success="uploadSuccess"
              list-type="picture-card"
              >
              <i v-if="temp.iconImage === ''" class="el-icon-plus"></i>
              <img v-if="temp.iconImage !== ''" style="width:148px;height:148px;" :src="imageHost+temp.iconImage"/>
            </el-upload>
          </el-form-item>
          
          <el-form-item label="级别" prop="level">
            <el-select class="filter-item" 
              v-model="temp.level" placeholder="请选择类目级别!">
              <el-option key="1" label="一级类目" :value="1"></el-option>
              <el-option key="2" label="二级类目" :value="2"></el-option>
              <el-option key="3" label="三级类目" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述" >
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入描述信息!" v-model="temp.description">
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
      </el-col>
      <el-col :span="19">
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
      <el-table-column prop="iconImage" label="图片" width="120">
        <template slot-scope="scope">
          <img :src="imageHost + scope.row.iconImage" style="transform:scale(1.3);height:35px;"/>
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
      <!-- <el-table-column label="操作">
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
      </el-table-column> -->
    </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import req from "@/utils/request";
import Cookies from 'js-cookie';
var imageHost = window.g.ImageHost;
export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  data() {
    return {
      tableData: [],
      treeData: [],
      filterText: "",
      defaultProps: {
        children: "children",
        label: "label"
      },
      imageHost: imageHost,
      uploadHost: null,
      headers: {
        token : null
      },
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
      temp: {
        catName: "",
        sort: 0,
        iconImage: "",
        parentId: 0,
        level: "",
        description: ""
      },
      currentNode: null, // 当前操作节点
      textMap: {
        update: "编辑",
        create: "新增"
      },
      rules: {
        catName: [{ required: true, message: "请输入类目名称!", trigger: "blur" }],
        level: [
          { required: true, message: "请选择菜单级别!", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.headers.token = Cookies.get('token');
    this.uploadHost = this.api.uploadShopCategory;
    this.handleGetData(this.listQuery.page, this.listQuery.limit);
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
          if (resp.data.status === 0) {
            that.baseMsg("数据加载成功!", "success");
            that.tableData = resp.data.data.data;
            that.total = resp.data.data.count;
          } else {
            that.baseMsg("数据加载失败!", "error");
          }
        })
        .catch(error => {
          console.log(error);
        });
      // 获取树状数据
      req
        .get(this.api.shopGoodsTreeData)
        .then(resp => {
          if (resp.data.status === 0) {
            that.treeData = resp.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleRefresh() {
      this.handleGetData(this.listQuery.page, this.listQuery.limit);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    uploadSuccess(resp,file,fileList){ // 上传品牌图片
        console.log(resp)
        if(resp.status ===0) {
          this.baseNotify('成功','商品类目图片上传成功!','success')
          this.temp.iconImage = resp.data
        }else{
          this.baseNotify('失败','商品类目图片上传失败!','error')
        }
    },
    handleCancel() {
      this.$refs.tree.setCheckedNodes([]);
      this.dialogFormVisible = false;
      this.$refs["dataForm"].resetFields(); // 重置表单
      this.resetTemp();
    },
    resetTemp() { // 重置表单
      this.temp = {
        catName: "",
        sort: 0,
        iconImage: "",
        parentId: 0,
        level: "",
        description: ""
      }
    },
    append(data) {
      console.log(data)
      this.$refs.tree.setCheckedNodes([{value: data.value,label: data.label}])
      this.dialogFormVisible = true;
      this.dialogStatus = "create";
      this.temp.parentId = data.value;
      this.currentNode = data;
      // const newChild = { id: id++, name: '添加节点', children: [] };
      // if (!data.children) {
      //   this.$set(data, 'children', []);
      // }
      // data.children.push(newChild);
    },
    edit(data) {
      var that = this;
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      that.$refs.tree.setCheckedNodes([{ id: data.id, name: data.name }]);
      // const newChild = { id: id++, name: '编辑节点', children: [] };
      // if (!data.children) {
      //   this.$set(data, 'children', []);
      // }
      //data.children.push(newChild);
      req
        .get(that.api.findShopCategory, {
          params: {
            catId: data.value
          }
        })
        .then(resp => {
          if (resp.data.status === 0) {
            that.temp = resp.data.data;
          } else {
            that.baseNotify("失败", resp.data.msg, "error");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    createData() {
        var that = this;
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            req.post(that.api.saveShopCategory,that.temp).then((resp) => {
              if(resp.data.status === 0){
                that.baseNotify('成功','操作成功!','success');
                this.$refs.tree.setCheckedNodes([]);
                that.dialogFormVisible=false; // 关闭弹框
                that.$refs['dataForm'].resetFields(); // 重置表单
                that.resetTemp();// 重置表单数据
                that.handleGetData(this.listQuery.page, this.listQuery.limit);
              }else{
                 that.baseNotify('失败','操作失败!','error');
              }
            }).catch((error) => {
                console.log(error);
            });
          } else {
            that.baseMsg('表单验证失败!','error')
          }
        })
    },
    updateData() {
      var that = this;
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            req.post(that.api.updateShopCategory,that.temp).then((resp) => {
              if(resp.data.status === 0){
                that.baseNotify('成功','操作成功!','success');
                this.$refs.tree.setCheckedNodes([]);
                that.dialogFormVisible=false; // 关闭弹框
                that.$refs['dataForm'].resetFields(); // 重置表单
                that.resetTemp();// 重置表单数据
                that.handleGetData(this.listQuery.page, this.listQuery.limit);
              }else{
                 that.baseNotify('失败','操作失败!','error');
              }
            }).catch((error) => {
                console.log(error);
            });
          } else {
            that.baseMsg('表单验证失败!','error')
          }
        })
    },
    remove(node, data) {
      var that = this;
      console.log(node);
      console.log(data);
      this.$confirm("此操作将禁用该属性, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          req
            .get(
              this.api.removeShopCategory + "?catId=" + data.value + "&isDel=1"
            )
            .then(resp => {
              if (resp.data.status === 0) {
                // const parent = node.parent;
                // const children = parent.data.children || parent.data;
                // const index = children.findIndex(d => d.id === data.id);
                // children.splice(index, 1);
                that.baseNotify("成功", resp.data.msg, "success");
              } else {
                that.baseNotify("失败", resp.data.msg, "error");
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          this.baseMsg("已经取消删除!", "errir");
        });
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>
            <i
              class={
                node.childNodes.length > 0
                  ? "el-icon-goods parent-menu-icon"
                  : "el-icon-tickets leave-menu-icon"
              }
            />&nbsp;{node.label}
          </span>
          <span>
            <el-button
              v-show={node.level === 3 ? false : true}
              title="添加子级菜单"
              type="text"
              on-click={() => this.append(data)}
            >
              <i class="el-icon-circle-plus" />
            </el-button>
            <el-button
              class="edit-btn"
              title="编辑菜单"
              type="text"
              on-click={() => this.edit(data)}
            >
              <i class="el-icon-edit-outline" />
            </el-button>
            <el-button
              class="delete-btn"
              title="删除菜单"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              <i class="el-icon-delete" />
            </el-button>
          </span>
        </span>
      );
    }
  }
};
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
.delete-btn {
  color: red;
}
.edit-btn {
  color: #e6a23c;
}
.parent-menu-icon {
  color: black;
}
.leave-menu-icon {
  color: orange;
}
</style>
