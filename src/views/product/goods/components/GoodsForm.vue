<template>
  <div class="createPost-container">
    <el-form class="form-container" ref="dataForm" :rules="rules" :model="shopGoods" >
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
                      <el-form-item label-width="90px" label="分类:"  prop="gcId" class="postInfo-container-item">
                        <div class="block">
                          <el-cascader
                            style="width:500px;"
                            placeholder="请选择类目!(可搜索)"
                            :options="options"
                            filterable
                            v-model ="shopGoods.gcId"
                            value="shopGoods.gcId"
                            :clearable="true"
                            size="medium"
                            expand-trigger="click"
                          ></el-cascader>
                          <el-tag>商品的分类!</el-tag>
                        </div>
                      </el-form-item>
                      <el-form-item label-width="90px" label="品牌:" class="postInfo-container-item">
                        <!-- <el-select v-model="value6"  style="width:500px;" placeholder="请选择">
                          <el-option
                            v-for="item in cities"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                          </el-option>
                          <el-tag>商品的品牌!</el-tag>
                        </el-select> -->
                      </el-form-item>
                      <el-form-item label-width="90px" label="价格:" prop="goodsPrice" class="postInfo-container-item">
                        <el-input style="width:500px;" v-model="shopGoods.goodsPrice" placeholder="请输入商品价格!"></el-input>
                        <el-tag>商品的价格,可精确到小数点后两位!</el-tag>
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
                      <el-checkbox-group>
                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                        <el-checkbox label="地推活动" name="type"></el-checkbox>
                        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                   </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item label-width="90px" label="商品主图:" class="postInfo-container-item">
                      <el-upload
                        action="http://localhost:8096/fileupload/uploadShopGoodsImage"
                        list-type="picture-card"
                        :multiple="false"
                        :limit="1"
                        :on-exceed="hanleExced"
                        :on-success="handleSuccess"
                        :on-error="handleError"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :before-remove="handleBeforeRemove">
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-tag>只能上传一张商品主图,该图片的大小为800x800!</el-tag>
                      <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="shopGoods.mainImage" alt="">
                      </el-dialog>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item label-width="90px" label="商品图片:" class="postInfo-container-item">
                      <el-upload
                        action="http://localhost:8096/fileupload/uploadShopGoodsImage"
                        list-type="picture-card"
                        :multiple="true"
                        :limit="5"
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
                      <tinymce :height="350"  ref="editor" v-model="shopGoods.content"></tinymce>
                    </el-form-item>
                  </el-col>
                </el-row>
            </div>
          </el-col>
        </el-row>
        <el-button type="primary" @click="addGoods">发布商品</el-button>
        <el-button type="info">清空数据</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/singleImage3'
import MDinput from '@/components/MDinput'
import Multiselect from 'vue-multiselect'// 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
import Sticky from '@/components/Sticky' // 粘性header组件
import { validateURL } from '@/utils/validate'
import { userSearch } from '@/api/remoteSearch'
import req from '@/utils/request'
export default {
  name: 'GoodsFormDetail',
  components: { Tinymce, MDinput, Upload, Multiselect, Sticky },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fetchSuccess: true,
      loading: false,
      userLIstOptions: [],
      shopGoods: {
        goodsName: '', // 商品名称
        goodsJingle: '', // 商品广告词
        goodsVat: '0',
        brandId: 0,
        goodsPrice: undefined,
        goodsStorage: undefined,
        goodsMarketPrice: undefined,
        gcId: null,  // 商品分类
        goodsCommand: '0',
        mainImage: '', // 商品主图
        content: '' // 商品内容
      },
      goodsImages:[],
      goodsContent: '',
      images: '',
      dialogVisible: false,
      options: [],
      rules: {
        goodsName: [{required: true, message: '请输入商品的名称!', trigger: 'blur'}],
        goodsJingle: [{required: true, message: '请输入商品广告词!', trigger: 'blur'}],
        goodsPrice: [{ required: true, message: '请输入商品价格!', trigger: 'blur'}],
        goodsStorage: [{required: true, message: '请输入商品库存!', trigger: 'blur'}],
        gcId: [
            { required: true, message: '请选择商品分类!', trigger: 'blur' }
          ],
        content: [{required: true, message: '请输入商品内容!', trigger: 'blur'}]  
      }
    }
  },
  created() {
    var that = this
    req.get(that.myConfig.host + 'shopGoodsCategory/ajaxCate').then(function(resp) {
      if(resp.data.status === 0){
        that.options =  resp.data.data
      }
    })
  },
  methods: {
    handleRemove(file, fileList) {
      return true
    },
    handlePictureCardPreview(file) {
      this.shopGoods.mainImage = file.response.data
      this.dialogVisible = true
    },
    handleMultiPictureCardPreview(file) {
      this.images = file.response.data
      this.dialogVisible = true
    },
    hanleExced(files, fileList){
      this.error('只能上传一张商品主图!')
    },
    handleSuccess(response, file, fileList) {
      this.shopGoods.mainImage = response.data
    },
    handleError(err, file, fileList){
      console.log('文件上传失败!')
    },
    handleBeforeRemove(file, fileList) {
      return true
    },
    handleShopGoodsSuccess(response, file, fileList) {
      this.goodsImages.push(response.data)
      console.log(this.goodsImages)
    },
    addGoods() {
      var that = this
      this.$refs['dataForm'].validate((valid) => {
        console.log(valid)
        if (valid) {
          req.post(that.myConfig.host, this.temp)
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

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .title-prompt{
    position: absolute;
    right: 0px;
    font-size: 12px;
    top:10px;
    color:#ff4949;
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
  }
</style>

