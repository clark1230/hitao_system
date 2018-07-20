<template>
  <div class="createPost-container">
    <el-form  class="form-container" ref="dataForm" :rules="rules" :model="shopGoods" >
    <el-row>
      <!--步骤-->
      <el-col :span="24">
        <div class=" bg-purple-light">
          <el-steps :space="670" :active="active" :align-center="true" direction="horizontal" 
           finish-status="success">
            <el-step description="选择类目和品牌!"></el-step>
            <el-step description="填写商品基本信息和属性规格"></el-step>
            <el-step description="上传商品图片和设置商品内容"></el-step>
          </el-steps>
        </div>
      </el-col>
    </el-row> 
    <!--类目和品牌-->
    <el-row v-if="active ===0">
      <el-row :gutter="10" style="min-width:1000px;">
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
          </div>
        </el-col>
        <el-col :span="4">
          <!--一级类目-->
          <div prop="catData" class="grid-content bg-purple" style="position:relative;">
            <el-input style="position:absolute;top:0px;left:0px;"  prefix-icon="el-icon-search"  placeholder="请搜索一级类目!"></el-input>
            <div class="item" style="cursor:pointer;" v-for="(data, index) in catData1" :key="index" >
              <div @click="handleCheckedChange1(index,data.catId,data.catName,$event)">
                <el-checkbox v-on:click.stop="handleCheckedChange1(index,data.catId,data.catName,$event)" :label="data.catId" 
                v-model="data.checked">{{data.catName}}</el-checkbox>
                <i style="position:absolute;right:10px;top:7px;" class="el-icon-arrow-right"></i>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <!--二级类目-->
          <div class="grid-content bg-purple" style="position:relative;">
            <el-input style="position:absolute;top:0px;left:0px;"  prefix-icon="el-icon-search"  placeholder="请搜索二级类目!"></el-input>
            <div class="item" style="cursor:pointer;" v-for="(data, index) in catData2" :key="index" @click="handleCheckedChange2(index,data.catId,data.catName)">
              <el-checkbox @change.native="test" :label="data.catId" v-model="data.checked">{{data.catName}}</el-checkbox>
              <i style="position:absolute;right:10px;top:7px;" class="el-icon-arrow-right"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <!--三级类目-->
          <div class="grid-content bg-purple" style="position:relative;">
            <el-input style="position:absolute;top:0px;left:0px;"  prefix-icon="el-icon-search"  placeholder="请搜索三级类目!"></el-input>
            <div class="item" style="cursor:pointer;" v-for="(data, index) in catData3" :key="index" @click="handleCheckedChange3(index,data.catId,data.catName)">
              <el-checkbox  :label="data.catId" v-model="data.checked">{{data.catName}}</el-checkbox>
              <i style="position:absolute;right:10px;top:7px;" class="el-icon-arrow-right"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <!--品牌信息-->
          <div class="grid-content bg-purple" style="position:relative;">
            <el-input style="position:absolute;top:0px;left:0px;"  prefix-icon="el-icon-search"  placeholder="请搜索品牌名称!"></el-input>
            <div class="item" @click="handleCheckedBrand(index,data.brandId,data.brandName)" v-for="(data,index) in brandData" :key="index">
              <el-checkbox v-model="data.checked">
                &nbsp;
                <img style="width:30px;height:30px;vertical-align:middle;" :src="data.brandPic"/>
                &nbsp;
                {{data.brandName}}
              </el-checkbox>
            </div>
          </div>
        </el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
      </el-row>
    </el-row>
     <!--商品基本信息-->
    <el-row v-if="active ===1">
      <el-col  :span="24">
        <div class="createPost-main-container">
          <el-row>
            <el-col >
              <div>
                <el-row>
                  <el-col>
                      <el-form-item label-width="90px" label="名称:" prop="goodsName"  class="postInfo-container-item">
                        <el-input style="width:500px;" v-model="shopGoods.goodsName" placeholder="请输入商品名称!"></el-input>
                        <el-tag>商品的真实名称!</el-tag>
                      </el-form-item>
                      <el-form-item label-width="90px" label="广告词:" prop="goodsJingle" class="postInfo-container-item">
                        <el-input  type="textarea" v-model="shopGoods.goodsJingle"
                            :rows="3" style="width:500px;" placeholder="请输入商品广告词!"></el-input>
                        <el-tag>商品的广告词不能含有反动，黄赌毒的信息!</el-tag>
                      </el-form-item>
                      <el-form-item label-width="90px" label="价格:" prop="goodsPrice" class="postInfo-container-item">
                        <el-input style="width:500px;" v-model="shopGoods.goodsPrice" placeholder="请输入商品价格!"></el-input>
                        <el-tag>商品的价格,可精确到小数点后两位!</el-tag>
                      </el-form-item>
                      <el-form-item label-width="90px" label="市场价格:" prop="goodsMarketprice" class="postInfo-container-item">
                        <el-input style="width:500px;" v-model="shopGoods.goodsMarketprice" placeholder="请输入商品价格!"></el-input>
                        <el-tag>商品的市场价格,可精确到小数点后两位!</el-tag>
                      </el-form-item>
                      <el-form-item label-width="90px" label="库存:" prop="goodsStorage" class="postInfo-container-item">
                        <el-input style="width:500px;" v-model="shopGoods.goodsStorage" placeholder="请输入商品库存!"></el-input>
                        <el-tag>商品的库存!</el-tag>
                      </el-form-item>
                      <el-form-item label-width="90px" label="运费:" class="postInfo-container-item">
                        <el-input style="width:500px;" placeholder="请输入商品运费!"></el-input>
                        <el-tag>商品运费,为0则免费!</el-tag>
                      </el-form-item>
                      <el-form-item label-width="90px" label="发票:" class="postInfo-container-item">
                        <div>
                        <el-radio-group v-model="shopGoods.goodsVat">
                          <el-radio  label="1" size="medium" border>是</el-radio>
                          <el-radio  label="0"  size="medium" border>否</el-radio>
                          </el-radio-group>
                          <el-tag>该商品是否可以开电子发票!</el-tag>
                        </div>
                      </el-form-item>
                      <el-form-item label-width="90px" label="商品推荐:" class="postInfo-container-item">
                        <div>
                        <el-radio-group v-model="shopGoods.goodsCommand">
                          <el-radio  label="1" size="medium" border>是</el-radio>
                          <el-radio  label="0"  size="medium" border>否</el-radio>
                          </el-radio-group>
                          <el-tag>商品推荐,如果是，则需要付费!</el-tag>
                        </div>
                      </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item label-width="90px" label="商品属性">
                        <div style="background-color:#e5e9f2;padding:0px 5px 10px 5px;border-radius:5px;margin-top:7px;"
                       v-for="(attrs, index) in shopGoods.attrValue" :key="index">
                          <el-row>
                            <el-col :span="2">
                              <i @click="handleRemoveAttr(shopGoods.attrValue,index,attrs.group)" style="color:red;cursor:pointer;" class="el-icon-delete"></i>
                              &nbsp;&nbsp;
                              <div style="display:inline-block;font-weight:bold;">
                                
                                <el-popover
                                  placement="top-start"
                                  title="编辑"
                                  width="280"
                                  :manual="true"
                                  trigger="click"
                                  >
                                  <div>
                                    <el-input prop="attrValue" @input="checkAttrValue(attrs.group)" v-model="attrs.group"></el-input>
                                    <div style="margin: 8px 0px 0px 0px;;">
                                      <el-button type="success" size="mini" icon="el-icon-check">确定</el-button>
                                      <el-button @click="cancelEditAttrName(shopGoods.attrValuer,attrs.group)" type="danger" size="mini" icon="el-icon-close">取消</el-button>
                                    </div>
                                  </div>
                                  <span slot="reference" style="border-bottom: 2px dotted orange;cursor:pointer;color:orange;">{{attrs.group}}:</span>
                                </el-popover>
                              </div>
                            </el-col>
                            <el-col :span="22">
                              <div style="display:inline-block;width:200px;margin-left:10px;"
                              v-for="(attr, subIndex) in attrs.attrs" :key="subIndex">
                                <el-popover
                                  placement="top-start"
                                  title="编辑"
                                  width="280"
                                  :manual="true"
                                  trigger="click"
                                  >
                                  <div>
                                    <el-input prop="attrValue" @input="checkAttrValue(attr.name)" v-model="attr.name"></el-input>
                                    <div style="margin: 8px 0px 0px 0px;;">
                                      <el-button type="success" size="mini" icon="el-icon-check">确定</el-button>
                                      <el-button @click="cancelEditAttrName(attr,attr.name)" type="danger" size="mini" icon="el-icon-close">取消</el-button>
                                    </div>
                                  </div>
                                  <span slot="reference" style="border-bottom: 2px dotted orange;cursor:pointer;color:orange;">{{attr.name}}</span>
                                </el-popover>
                                &nbsp;&nbsp;<i @click="handleRemoveAttr(attrs.attrs,subIndex,attr.name)" style="color:red;cursor:pointer;" class="el-icon-delete"></i>
                                <el-input
                                v-model="attr.value"
                                :placeholder="attr.name != null ? '请输入'+attr.name: '请输入属性值!'"
                                >
                                </el-input>
                              </div>
                              <div style="display:inline-block;margin:0px;padding:0px;">
                                <i @click="handleAddAttr(attrs.attrs)" style="color:green;font-size:25px;cursor:pointer;vertical-align:middle" class="el-icon-circle-plus"></i>
                              </div>
                            </el-col>
                          </el-row>
                      </div>
                      <div>
                        <i @click="handleAddAttr(attrs.attrs)" style="color:green;font-size:25px;cursor:pointer;vertical-align:middle" class="el-icon-circle-plus"></i>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <!--商品图片和内容-->
    <el-row v-if="active === 2">
      <el-col :span="24">
       <div class="createPost-main-container">
         <el-row>
          <el-col>
            <el-form-item label-width="90px" label="商品图片:" class="postInfo-container-item">
              <el-upload
                action="http://localhost:8096/fileupload/uploadShopGoodsImage"
                list-type="picture-card"
                :multiple="true"
                :headers="{'token':123}"
                :limit="8"
                :on-exceed="hanleExced"
                :on-success="handleShopGoodsSuccess"
                :on-error="handleError"
                :on-preview="handleMultiPictureCardPreview"
                :on-remove="handleRemove"
                :before-remove="handleBeforeRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-tag>最多只能上传五张商品图片,图片的大小为800x800!</el-tag>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="images" alt="">
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label-width="90px" label="商品内容:" prop="content">
              <div style="width:auto;min-height:350px;">
                <tinymce :height="350"  ref="editor" v-model="shopGoods.content"></tinymce>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        </div>
      </el-col>
    </el-row>
    <!--步骤按钮-->
   <el-row style="margin-top:30px;">
      <el-col :span="5">
        &nbsp;
      </el-col>
      <el-col :span="14">
        <el-button v-if="active > 0" @click="preStep" type="primary" ><i class="el-icon-d-arrow-left"></i>&nbsp;上一步</el-button>
        <el-button v-if="active < 2" @click="nextStep" type="primary" >下一步&nbsp;<i class="el-icon-d-arrow-right"></i></el-button>
        <el-button v-if="active === 2 && operateStatus === 'create'" type="primary" @click="handleAddGoods">发布商品</el-button>
        <el-button v-if="active === 2 && operateStatus === 'update'" type="primary" @click="handleUpdateGoods">保存商品</el-button>
        <el-button type="danger">清空&nbsp;<i class="el-icon-delete"></i></el-button>
      </el-col>
      <el-col :span="5">
      </el-col>
    </el-row>
   </el-form>
   </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import Upload from "@/components/Upload/singleImage3";
import MDinput from "@/components/MDinput";
import Multiselect from "vue-multiselect"; // 使用的一个多选框组件，element-ui的select不能满足所有需求
import "vue-multiselect/dist/vue-multiselect.min.css"; // 多选框组件css
import Sticky from "@/components/Sticky"; // 粘性header组件
import { validateURL } from "@/utils/validate";
import { userSearch } from "@/api/remoteSearch";
import req from "@/utils/request";
export default {
  name: "GoodsFormDetail",
  components: { Tinymce, MDinput, Upload, Multiselect, Sticky },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: 0,
      isShowForm: false, // 是否展示表单
      isChecked: false, // 是否勾选
      isShowTooltip : false, // 是否展示属性/组编辑
      fetchSuccess: true,
      checked: false,
      loading: false, // 正在加载
      radio: "1",
      catData1: [], // 一级类目
      catData2: [], // 二级类目
      catData3: [], // 三级类目
      brandData: [], // 品牌信息
      userLIstOptions: [],
      shopCateTemplate: [], // 属性模板
      shopGoods: { // 商品信息
        goodsName: "", // 商品名称
        goodsJingle: "", // 商品广告词
        goodsVat: "0",
        brandId: 0,
        goodsPrice: null,
        goodsMarketprice: null,
        goodsStorage: null,
        goodsMarketPrice: null,
        gcId: null, // 商品分类
        goodsCommand: "0",
        mainImage: "", // 商品主图
        content: "", // 商品内容
        attrValue: [] // 商品规格属性
      },
      goodsImages: [], // 商品图片
      goodsContent: "", // 商品内容
      images: "",
      dialogVisible: false, // 是否展示对话框
      options: [],
      operateStatus: 'create',
      rules: {
        goodsName: [
          { required: true, message: "请输入商品的名称!", trigger: "blur" }
        ],
        goodsJingle: [
          { required: true, message: "请输入商品广告词!", trigger: "blur" }
        ],
        goodsPrice: [
          { required: true, message: "请输入商品价格!", trigger: "blur" }
        ],
        goodsMarketprice: [
          { required: true, message: "请输入商品市场价格!", trigger: "blur" }
        ],
        goodsStorage: [
          { required: true, message: "请输入商品库存!", trigger: "blur" }
        ],
        gcId: [{ required: true, message: "请选择商品分类!", trigger: "blur" }],
        content: [
          { required: true, message: "请输入商品内容!", trigger: "blur" }
        ],
        attrValue: [{ required: true, message: '请输入内容!', trigger: 'blur'}]
      }
    };
  },
  created() {
    var that = this;
    req
      .get(this.api.catetoryFindByPId, {
        params: {
          pId: 0
        }
      })
      .then(function(resp) {
        if (resp.data.status === 0) {
          var data = resp.data.data;
          data.forEach(ele => {
            ele.checked = false;
          });
          that.catData1 = data;
        }
      });
    req.get(this.api.shopGoodsCategory).then(function(resp) {
      if (resp.data.status === 0) {
        that.options = resp.data.data;
      }
    });

    var goodsId = this.$route.query.goodsId;
    console.log("商品编号:"+goodsId)
    if(goodsId !== undefined){
       // 查询商品信息
       req.get(this.api.findShopGoods, {
         params: {
           goodsId : goodsId
         }
       }).then((resp) => {
         if(resp.data.status === 0){
           that.shopGoods = resp.data.data
         }else{
           that.baseNotify('失败!','该商品不存在!','error')
         }
       }).catch((error) => {
         console.log(error)
       })
       this.operateStatus = 'update'
    }
  },
  methods: {
    handleCheckedChange1(index, id, name, event) {
      var that = this;
      event.cancelBubble = true;
      console.log("获取二级类目!" + index);
      this.isChecked = true;
      this.catData1.forEach(ele => {
        if (ele.catId !== id) {
          ele.checked = false;
        } else {
          if (ele.checked) {
            ele.checked = false;
          } else {
            ele.checked = true;
          }
        }
      });
      // 异步提交数据到数据库查询对应的二级类目信息
      req
        .get(this.api.catetoryFindByPId, {
          params: {
            pId: id
          }
        })
        .then(function(resp) {
          if (resp.data.status === 0) {
            var data = resp.data.data;
            data.forEach(ele => {
              ele.checked = false;
            });
            that.catData2 = data;
          }
        });
      this.catData3 = []
      this.brandData = []
    },
    handleCheckedChange2(index, id, name) {
      console.log("勾选");
      var that = this;
      this.isChecked = true;
      this.catData2.forEach(ele => {
        if (ele.catId !== id) {
          ele.checked = false;
        } else {
          if (ele.checked) {
            ele.checked = false;
          } else {
            ele.checked = true;
          }
        }
      });
      // 异步提交数据到数据库查询对应的三级类目信息
      req
        .get(this.api.catetoryFindByPId, {
          params: {
            pId: id
          }
        })
        .then(function(resp) {
          if (resp.data.status === 0) {
            var data = resp.data.data;
            data.forEach(ele => {
              ele.checked = false;
            });
            that.catData3 = data;
          }
        });
        this.brandData = []
    },
    handleCheckedChange3(index, id, name) { // 三级类目
      var that = this;
      this.isChecked = true;
      this.catData3.forEach(ele => {
        if (ele.catId !== id) {
          ele.checked = false;
        } else {
          if (ele.checked) {
            ele.checked = false;
          } else {
            ele.checked = true;
          }
        }
      });
      // 异步提交数据到数据库查询对应的品牌信息
      req
        .get(this.api.shopBrandFindByClassId, {
          params: {
            classId: id
          }
        })
        .then(resp => {
          if (resp.data.status === 0) {
            that.brandData = resp.data.data;
          } else {
            that.baseNotify("失败", "品牌信息加载失败!", "error");
          }
        })
        .catch(error => {
          console.log(error);
        });

        // 设置类目信息
        this.shopGoods.gcId = id
    },
    handleCheckedBrand(index, id, name) {
      console.log(id)
      this.shopGoods.brandId = id
    },
    handleRemoveAttr(attr, subIndex,name) { // 手动移除商品属性规格
      this.$confirm('此操作将删除"'+name+'"这个属性规格, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          attr.splice(subIndex,1)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    handleAddAttr(attr) { // 添加类目
      attr.push({
        name: '自定义属性',
        value: null
      })
    },
    checkAttrValue(name) { // 检查编辑的属性/组 值是否合法
      if(name.length === 0){
        this.baseMsg('内容不能为空!','error')
      }else if(name.length === 8){
        this.baseMsg('内容长度已经超出范围!(最大长度为7)','error')
      }
    },
    cancelEditAttrName(attr,name){ // 取消编辑属性/组名称
      console.log(attr)
      var copyName = name
      attr.name = copyName
    },
    test() {
      console.log("change事件");
    },
    handleRemove(file, fileList) {
      return true;
    },
    handlePictureCardPreview(file) {
      this.shopGoods.mainImage = file.response.data;
      this.dialogVisible = true;
    },
    handleMultiPictureCardPreview(file) {
      this.images = file.response.data;
      this.dialogVisible = true;
    },
    nextStep() {
      // 下一步
      this.active += 1;
      if(this.active === 1 && this.shopGoods.attrValue.length === 0) {
        var that = this
        // shopCateTemplate
        req.get(this.api.shopGoodsAttrTemplateAPI, { // 加载类目对应的规格信息
          params: {
            catId : 18
          }
        }).then((resp) => {
          if(resp.data.status === 0){
            that.shopCateTemplate = JSON.parse(resp.data.data)
            that.shopCateTemplate.forEach((ele)=>{
              var attrArr= [];
              ele.attrArr.forEach((subEle) => {
                attrArr.push({
                  name: subEle.attrValue,
                  value:null
                })
              })
              that.shopGoods.attrValue.push({
                  group: ele.groupName,
                  attrs: attrArr
              })
            })
            console.log(that.shopGoods.attrValue)
          }else{
            that.baseNotify('失败!','数据获取失败!','error')
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    preStep() {
      // 上一步
      this.active -= 1;
    },
    hanleExced(files, fileList) {
      this.error("只能上传一张商品主图!");
    },
    handleSuccess(response, file, fileList) {
      this.shopGoods.mainImage = response.data;
    },
    handleError(err, file, fileList) {
      console.log("文件上传失败!");
    },
    handleBeforeRemove(file, fileList) {
      return true;
    },
    handleShopGoodsSuccess(response, file, fileList) {
      this.goodsImages.push(response.data);
      console.log(this.goodsImages);
    },
    handleAddGoods() {
      var that = this;
      this.$refs["dataForm"].validate(valid => {
        console.log(valid);
        if (valid) {
          req
            .post(that.api.saveShopGoods, this.shopGoods)
            .then(function(resp) {
              if (resp.data.status === 0) {
                that.baseMsg(resp.data.msg,'success');
                that.dialogFormVisible = false;
              } else {
                that.baseMsg(resp.data.msg,'error');
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
    },
    handleUpdateGoods() {
      var that = this;
      this.$refs["dataForm"].validate(valid => {
        console.log(valid);
        if (valid) {
          req
            .post(that.api.updateShopGoods, this.shopGoods)
            .then(function(resp) {
              if (resp.data.status === 0) {
                that.baseMsg(resp.data.msg,'success');
                that.dialogFormVisible = false;
                that.$router.go(-1)
              } else {
                that.baseMsg(resp.data.msg,'error');
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.title-prompt {
  position: absolute;
  right: 0px;
  font-size: 12px;
  top: 10px;
  color: #ff4949;
}
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 20px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
    .editor-container {
      min-height: 250px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
  .bg-purple-light {
    background-color: #f9fafc;
  }
  .grid-content {
    margin-top: 30px;
    padding: 40px 0px;
    border-radius: 4px;
    min-height: 500px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  // .bg-purple-light {
  //   background: #e5e9f2;
  // }
  .item {
    line-height: 30px;
    position: relative;
    padding: 0px 10px;
  }
  .item:hover {
    background-color: #e5e9f2;
  }
}
</style>

