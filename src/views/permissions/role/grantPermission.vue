<template>
  <div>
   <ul class="role-table col-xs-offset-2 col-md-offset-1 col-sm-offset-2">
    <li class="header">
        <div class="left">菜单列表</div>
        <div class="right">功能权限</div>
    </li>
    <div class="vertical-line"></div>
    <li  v-for="(item, index) in dataList" :key="item.id">
        <div class="left h40"  @click="fold(item)">
            <i :class="{'el-icon-caret-right':item.folded,'el-icon-caret-bottom':!item.folded}"
               v-cloak v-if="item.children"
               class="item-icon"></i>
            <el-checkbox @click.native="handleOneCheckAll($event,item)" v-cloak v-if="!item.children" :indeterminate="item.isIndeterminate" v-model="item.checkAll"> {{item.name}}</el-checkbox>
            <span v-if="item.children" v-cloak>{{item.name}}</span>
        </div>
        <div class="right h40">
          <!--三级权限-->
            <el-checkbox v-if="item.children" :indeterminate="item.isIndeterminate" 
            @change="checkSecondAll(item)" v-model="item.firstCheckAll"> 所有</el-checkbox>
            <!--展示二级权限-->
            <el-checkbox-group v-model="item.checkedCities" @change="handleOneCheckedCitiesChange(item)" v-else>
                 <el-checkbox  v-for="m in item.children" :label="m.id" :key="m.id" v-cloak>
                      {{m.name}}
                 </el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="line"></div>
        <!--展示三级权限信息-->
        <ul v-show="item.children.length&& !item.folded">
            <li class="h40" v-for="(children,cur) in item.children" :key="children.id">
                <div class="left">
                    <el-checkbox :indeterminate="children.isIndeterminate"  v-model="children.checkAll" @change="handleCheckAllChange($event,item,children)" v-cloak>
                        {{children.name}}
                    </el-checkbox>
                </div>
                <div class="right">
                    <el-checkbox-group v-model="children.checkedCities"  @change="handleCheckedCitiesChange($event,item,children)">
                        <el-checkbox  v-for="p in children.children" :label="p.id" :key="p.id" v-cloak >
                            {{p.name}}
                    </el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class="line"></div>
            </li>
        </ul>
    </li>
</ul>
</div>
</template>
<script>
import req from '@/utils/request'
export default {
  data() {
    return {
      // dataList: [
      //   {
      //     title: "权限管理",
      //     id: "1",
      //     children: [
      //       {
      //         title: "用户管理",
      //         id: "11",
      //         children: [
      //           {
      //             id: "10003",
      //             name: "浏览"
      //           },
      //           {
      //             name: "新增",
      //             id: "10004"
      //           },
      //           {
      //             name: "修改",
      //             id: "10005"
      //           }
      //         ],
      //         checkedCities: []
      //       },
      //       {
      //         title: "角色管理",
      //         id: "12",
      //         children: [
      //           {
      //             name: "浏览",
      //             id: "10005"
      //           },
      //           {
      //             name: "新增",
      //             id: "10007"
      //           },
      //           {
      //             name: "修改",
      //             id: "10008"
      //           },
      //           {
      //             name: "删除",
      //             id: "10009"
      //           }
      //         ],
      //         checkedCities: []
      //       },
      //       {
      //         title: "权限管理",
      //         id: "13",
      //         children: [
      //           {
      //             name: "浏览",
      //             id: "10010"
      //           },
      //           {
      //             name: "新增",
      //             id: "10011"
      //           },
      //           {
      //             name: "修改",
      //             id: "10012"
      //           },
      //           {
      //             name: "删除",
      //             id: "10013"
      //           }
      //         ],
      //         checkedCities: []
      //       }
      //     ]
      //   },
      //   {
      //     title: "服务网关管理",
      //     id: "2",
      //     children: [
      //       {
      //         title: "网关管理",
      //         id: "14",
      //         children: [
      //           {
      //             id: "10014",
      //             name: "浏览"
                  
      //           },
      //           {
      //             name: "新增",
      //             id: "10015"
      //           },
      //           {
      //             name: "修改",
      //             id: "10016"
      //           },
      //           {
      //             name: "删除",
      //             id: "10017"
      //           }
      //         ],
      //         checkedCities: []
      //       }
      //     ]
      //   }
      // ],
      dataList:[],
      permissionData: []
    };
  },
  created() {
    var that = this
    this.$store.getters.grantPermissionData = this.dataList;
    // shopMenuTreeData
    req.get(this.api.shopMenuTreeData,{
      params:{

      }
    }).then((resp)=>{
      if(resp.data.status === 0){
          that.dataList = resp.data.data[0].children
      }
    }).catch((error) =>{
      console.log(error)
    });
  },
  methods: {
    fold: function(item) {
      // 折叠
      if (typeof item.folded === "undefined") {
        this.$set(item, "folded", false);
      } else {
        item.folded = !item.folded;
      }
    },
    // 全选一项
    handleCheckAllChange(checked, item, children) {
      console.log('全选:'+checked)
      if (typeof children.checkedCities === "undefined") {
        this.$set(children, "checkedCities", []);
      }
      if (typeof children.children !== "undefined") {
        this.$set(children, "checked", false);
      }
      if (typeof item.isIndeterminate === "undefined") {
        this.$set(item, "isIndeterminate", false);
      }
      if (checked) {
        // 说明勾选了
        var checkedNum = 0;
        item.children.forEach(ele => {
          if (ele.checkAll) {
            checkedNum++;
          }
        });
        if (checkedNum === item.children.length) {
          item.firstCheckAll = true;
          item.isIndeterminate = false;
        } else {
          item.firstCheckAll = false;
          item.isIndeterminate = true;
        }
      } else {
        var unCheckedNum = 0;
        item.children.forEach(ele => {
          if (!ele.checkAll) {
            unCheckedNum++;
          }
        });
        if (unCheckedNum === item.children.length) {
          console.log("全部取消");
          item.firstCheckAll = false;
          item.isIndeterminate = false;
        } else {
          item.firstCheckAll = false;
          item.isIndeterminate = true;
        }
      }
      if (children.checkAll) {
        children.isIndeterminate = false;
        children.children.forEach(ele => {
          children.checkedCities.push(ele.id);
        });
      } else {
        children.checkedCities = [];
        children.isIndeterminate = false;
      }
      children.checkedAll = children.checkedAll === true ? false : true;
    },
    // 单选
    handleCheckedCitiesChange(checkedArr, item, children) {
      console.log('单选：'+checkedArr)
      console.log(item)
      console.log(children)
      //children.checkedCities = [];
      let checkedCount = 0;//children.checkedCities.length;
      if (typeof children.checkAll === "undefined") {
        this.$set(children, "checkAll", false);
      }
      if (typeof children.checkedCities === "undefined") {
        this.$set(children, "checkedCities", []);
      }
      if (typeof children.isIndeterminate === "undefined") {
        this.$set(children, "isIndeterminate", false);
      }
      if (typeof item.isIndeterminate === "undefined") {
        this.$set(item, "isIndeterminate", false);
      }
      children.checkAll = checkedCount === children.children.length;
      children.isIndeterminate =
        checkedCount > 0 && checkedCount < children.children.length;
      if (item.checkedAll) {
        item.isIndeterminate = false;
        item.checkedAll = true;
      } else {
        for (let a = 0; a < item.children.length; a++) {
          if (!item.children[a].checkAll) {
            item.isIndeterminate = true;
            for (let b = 0; b < item.children.length; b++) {
              console.log('eee:'+item.children[b].checkedCities)
              if (item.children[b].checkedCities.length > 0) {
                item.isIndeterminate = true;
                item.checkedAll = false;
                break;
              } else {
                item.isIndeterminate = false;
                item.firstCheckAll = false;
              }
            }
            break;
          } else {
            item.isIndeterminate = false;
            item.firstCheckAll = true;
          }
        }
      }
    },
    // 点击所有
    checkSecondAll: function(item) {
      if (typeof item.firstCheckAll === "undefined") {
        this.$set(item, "firstCheckAll", false);
      }
      for (let a = 0; a < item.children.length; a++) {
        this.checkItemAll(item.firstCheckAll, item.children[a]);
      }
      item.isIndeterminate = false;
    },
    checkItemAll: function(flag, item) {
      let arr = [];
      console.log(item)
      for (let a = 0; a < item.children.length; a++) {
        arr.push(item.children[a].id);
      }
      if (typeof item.checkedCities === "undefined") {
        this.$set(item, "checkedCities", arr);
      }
      item.checkedCities = flag ? arr : [];
      item.checkAll = flag;
    },

    // 没有二级菜单
    handleOneCheckedCitiesChange: function(item) {
      console.log(item)
      let checkedCount = item.checkedCities.length;
      if (typeof item.isIndeterminate === "undefined") {
        this.$set(item, "isIndeterminate", false);
      }
      if (typeof item.checkAll === "undefined") {
        this.$set(item, "checkAll", false);
      }
      item.isIndeterminate = checkedCount > 0 && checkedCount < item.children.length;
      item.checkAll = checkedCount === item.children.length;
      // 修改同级权限信息
      this.dataList.forEach((ele) => {
          if(ele.children !== undefined && ele.children.length >0){
              if(ele.firstCheckAll === 'undefined'){
                  this.$set(ele, "firstCheckAll", false);
              }
              ele.isIndeterminate = true
              ele.checkAll = false
              ele.children.forEach((subEle) => {
                  if (typeof subEle.isIndeterminate === "undefined") {
                    this.$set(subEle, "isIndeterminate", false);
                }
                  subEle.isIndeterminate = true
                //   subEle.children.forEach( (children) => {
                    
                //   })
                subEle.checkedCities = []
              })
          }
      })
    },
    // 概况全选
    handleOneCheckAll: function(event, item) {
      var that = this
      let arr = [];
      for (let a = 0; a < item.children.length; a++) {
        arr.push(item.children[a].id);
      }
      item.checkedCities = event.target.checked ? arr : [];
      if(item.checkedCities.length = item.children.length){
          item.checkAll = true;
          item.isIndeterminate = false;
      }else{
          item.isIndeterminate = true;
          item.checkedNum = false
      }
      // 把一下所有的数据的都遍历勾选
      if(event.target.checked){
        this.dataList.forEach((ele) => {
          if(ele.children !== undefined && ele.children.length >0){
              if(ele.firstCheckAll === 'undefined'){
                  this.$set(ele, "firstCheckAll", true);
              }
              ele.firstCheckAll =true;
              that.checkSecondAll(ele)
          }
        })
      }else{
          // 取消全部选择
          this.dataList.forEach((ele) => {
          if(ele.children !== undefined && ele.children.length >0){
              if(ele.firstCheckAll === 'undefined'){
                  this.$set(ele, "firstCheckAll", true);
              }
              ele.firstCheckAll =false;
              that.checkSecondAll(ele)
          }
        })
      }
    }
  }
};
</script>

<style>
ul {
  list-style-type: none;
}
.role-table {
  border: 1px solid #e0e0e0;
  border-bottom: none;
  padding: 0;
  position: relative;
}

.header {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #e7e7e7;
  background: #f8f8f9;
  text-align: center;
}

.vertical-line {
  width: 1px;
  height: 100%;
  background: #ddd;
  position: absolute;
  left: 30%;
  top: 0;
}

.left {
  width: 30%;
  float: left;
  padding-left: 10px;
  user-select: none;
  cursor: pointer;
}

.one {
  padding-left: 20px;
}

.right {
  width: 70%;
  float: left;
  padding-left: 10px;
}

.item-icon {
  margin-left: -5px;
  padding: 5px;
}

.line {
  clear: both;
  width: 100%;
  height: 1px;
  background: #e0e0e0;
}
.h40 {
  height: 39px;
  line-height: 39px;
}
[v-cloak] {
  display: none;
}
</style>

