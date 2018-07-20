<template>
  <div class="app-container"  v-loading="loading">
  <el-row style="margin-bottom:10px">
    <el-col :sapn="24">
      <span>您当前选择的类目为:{{catName}}</span>
    </el-col>
  </el-row>
   <draggable :list="attrTemplateArr" class="dragArea">
     <el-row v-for="(temp, index) in attrTemplateArr" :key="index" :gutter="15" style="background-color:#fafafa;padding:15px 0px;border: 1px solid lightgrey; border-radius:5px;margin-bottom:10px">
    <el-col :span="4">
       <el-row :gutter="15">
        <el-col :span="4">
           <el-button title="删除属性组!" size="small" 
           @click="subAttr(attrTemplateArr,temp,index)" type="danger" 
           icon="el-icon-delete" circle></el-button>
        </el-col>
        <el-col :span="20">
          <el-input
            placeholder="请输入属性组!" v-model="temp.groupName" clearable>
            <template slot="prepend">属性组:</template>
          </el-input>
        </el-col>
       </el-row>
    </el-col>
    <el-col :span="20" style="border-left:1px solid lightgrey;">
       <div style="border-radius:5px;padding:0px 5px;">
          <div style="display:inline;" v-for="(attr, subIndex) in temp.attrArr" :key="subIndex">
          <el-input style="width:250px;"
            placeholder="请输入属性值!" v-model="attr.attrValue" clearable>
            <template slot="prepend">属性名:</template>
          </el-input>
          <el-button type="danger" title='删除属性值!' icon="el-icon-delete" @click="subAttr(temp.attrArr,attr.attrValue,subIndex)" circle size="mini"></el-button>
          &nbsp;
        </div>
        <el-button type="primary" title='新增属性值!' @click="addAttr(temp.attrArr)" circle size="mini"><i class="el-icon-plus"></i></el-button>
       </div>
    </el-col>
</el-row>
  </draggable>

<el-row>
   <el-col :span="9">
    &nbsp;
   </el-col>
   <el-col :span="15">
    <div style="margin-top:15px;">
      <el-button @click="addAttrTemplate" type="primary" plain>新增属性组</el-button>
      <el-button @click="saveAttrTemplate" type="primary" :loading="btnLoading">保存操作</el-button>
      <el-button @click="goBack" type="warn">返回类目列表</el-button>
    </div>
   </el-col>
</el-row>
  </div>
</template>
<script>
import req from "@/utils/request";
import draggable from "vuedraggable"; // 导入可拖拽组件
export default {
  name: "DndList",
  components: { draggable },
  data() {
    return {
      attrTemplateArr: [
        {
          groupName: "", // 属性组名称
          attrArr: [] // 属性值
        }
      ],
      catId: 0,
      catName: "",
      loading: false,
      btnLoading: false
    };
  },
  created() {
    var that = this;
    var catId = this.$route.query.catId; // 没有r的，神坑
    this.catName = this.$route.query.catName;
    this.catId = catId;
    if(catId === undefined){
      this.$router.push('category')
    }
    this.loading = true
    req
      .get(this.api.shopGoodsAttrTemplateAPI, { params: { catId: this.catId } })
      .then(resp => {
        this.loading = false
        if (resp.data.status === 0) {
          that.baseNotify("提示", "数据加载成功!", "success");
          that.attrTemplateArr = JSON.parse(resp.data.data);
        } else {
          that.baseNotify("提示", resp.data.msg, "info");
        }
      })
      .catch(error => {
        this.loading = false
        console.log(error);
      });
      this.baseNotify("提示", "可以通过拖拽来实现属性组的排序!");
  },
  mounted() {
    this.duration = 1;
  },
  methods: {
    addAttrTemplate() {
      // 新增属性组
      this.attrTemplateArr.push({
        groupName: "",
        attrArr: []
      });
    },
    addAttr(attrArr) {
      // 新增值
      var that = this;
      attrArr.push({
        attrValue: ""
      });
    },
    subAttr(attrArr, attr, index) {
       this.$confirm('此操作将删除该属性或属性值, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           //删除属性组/值
           attrArr.splice(index, 1);
        }).catch(() => {
          this.baseMsg('已取消删除!')
        });
    },
    saveAttrTemplate() {
      var that = this;
      this.btnLoading = true
      req
        .post(this.api.shopGoodsAttrTemp, {
          attrTemp: this.attrTemplateArr,
          catId: this.catId
        })
        .then(resp => {
          that.btnLoading = false
          if (resp.data.status === 0) {
            that.baseNotify("提示","操作成功!", "success",);
            that.goBack();
          } else {
            that.baseNotify("提示", "操作失败!", "error");
          }
        }).catch((error) => {
          that.btnLoading = false
          console.log(error)
        })
    },
    goBack() {
      // 返回类目列表
      this.$router.go(-1);
    }
  }
};
</script>
<style>
</style>

