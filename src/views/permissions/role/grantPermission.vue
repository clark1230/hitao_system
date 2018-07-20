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
               v-cloak v-if="item.second"
               class="item-icon"></i>
            <el-checkbox @click.native="handleOneCheckAll($event,item)" v-cloak v-if="!item.second" :indeterminate="item.isIndeterminate" v-model="item.checkAll"> {{item.title}}</el-checkbox>
            <span v-if="item.second" v-cloak>{{item.title}}</span>
        </div>
        <div class="right h40">
            <el-checkbox v-if="item.second" :indeterminate="item.isIndeterminate" 
            @change="checkSecondAll(item)" v-model="item.firstCheckAll"> 所有</el-checkbox>
            <el-checkbox-group v-model="item.checkedCities" @change="handleOneCheckedCitiesChange(item)" v-else>
                 <el-checkbox  v-for="m in item.list" :label="m.id" :key="m.id" v-cloak>
                      {{m.name}}
                 </el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="line"></div>
        <ul v-show="item.second&&!item.folded">
            <li class="h40" v-for="(second,cur) in item.second" :key="second.id">
                <div class="left">
                    <el-checkbox :indeterminate="second.isIndeterminate"  v-model="second.checkAll" @change="handleCheckAllChange($event,item,second)" v-cloak>
                        {{second.title}}
                    </el-checkbox>
                </div>
                <div class="right">
                    <el-checkbox-group v-model="second.checkedCities"  @change="handleCheckedCitiesChange($event,item,second)">
                        <el-checkbox  v-for="p in second.list" :label="p.id" :key="p.id" v-cloak >
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
export default {
  data() {
    return {
      dataList: [
        // {
        //   title: "概况",
        //   id: "0",
        //   checkedCities: [],
        //   list: [
        //     {
        //       name: "浏览",
        //       id: "10000"
        //     },
        //     {
        //       name: "新增",
        //       id: "10001",
        //     },
        //     {
        //       name: "修改",
        //       id: "10002",
        //       checked: true
        //     },
        //     {
        //       name: "删除",
        //       id: "20002",
        //       checked: true
        //     }
        //   ]
        // },
        {
          title: "权限管理",
          id: "1",
          second: [
            {
              title: "用户管理",
              id: "11",
              list: [
                {
                  id: "10003",
                  name: "浏览"
                },
                {
                  name: "新增",
                  id: "10004"
                },
                {
                  name: "修改",
                  id: "10005"
                }
              ],
              checkedCities: []
            },
            {
              title: "角色管理",
              id: "12",
              list: [
                {
                  name: "浏览",
                  id: "10005"
                },
                {
                  name: "新增",
                  id: "10007"
                },
                {
                  name: "修改",
                  id: "10008"
                },
                {
                  name: "删除",
                  id: "10009"
                }
              ],
              checkedCities: []
            },
            {
              title: "权限管理",
              id: "13",
              list: [
                {
                  name: "浏览",
                  id: "10010"
                },
                {
                  name: "新增",
                  id: "10011"
                },
                {
                  name: "修改",
                  id: "10012"
                },
                {
                  name: "删除",
                  id: "10013"
                }
              ],
              checkedCities: []
            }
          ]
        },
        {
          title: "服务网关管理",
          id: "2",
          second: [
            {
              title: "网关管理",
              id: "14",
              list: [
                {
                  id: "10014",
                  name: "浏览"
                  
                },
                {
                  name: "新增",
                  id: "10015"
                },
                {
                  name: "修改",
                  id: "10016"
                },
                {
                  name: "删除",
                  id: "10017"
                }
              ],
              checkedCities: []
            }
          ]
        }
      ],
      permissionData: []
    };
  },
  created() {
    this.$store.getters.grantPermissionData = this.dataList;
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
    handleCheckAllChange(checked, item, second) {
      if (typeof second.checkedCities === "undefined") {
        this.$set(second, "checkedCities", []);
      }
      if (typeof second.list !== "undefined") {
        this.$set(second, "checked", false);
      }
      if (typeof item.isIndeterminate === "undefined") {
        this.$set(item, "isIndeterminate", false);
      }
      if (checked) {
        // 说明勾选了
        var checkedNum = 0;
        item.second.forEach(ele => {
          if (ele.checkAll) {
            checkedNum++;
          }
        });
        if (checkedNum === item.second.length) {
          item.firstCheckAll = true;
          item.isIndeterminate = false;
        } else {
          item.firstCheckAll = false;
          item.isIndeterminate = true;
        }
      } else {
        var unCheckedNum = 0;
        item.second.forEach(ele => {
          if (!ele.checkAll) {
            unCheckedNum++;
          }
        });
        if (unCheckedNum === item.second.length) {
          console.log("全部取消");
          item.firstCheckAll = false;
          item.isIndeterminate = false;
        } else {
          item.firstCheckAll = false;
          item.isIndeterminate = true;
        }
      }
      if (second.checkAll) {
        second.isIndeterminate = false;
        second.list.forEach(ele => {
          second.checkedCities.push(ele.id);
        });
      } else {
        second.checkedCities = [];
        second.isIndeterminate = false;
      }
      second.checkedAll = second.checkedAll === true ? false : true;
    },
    // 单选
    handleCheckedCitiesChange(checkedArr, item, second) {
      second.checkedCities = checkedArr;
      let checkedCount = second.checkedCities.length;
      if (typeof second.checkAll === "undefined") {
        this.$set(second, "checkAll", false);
      }
      if (typeof second.isIndeterminate === "undefined") {
        this.$set(second, "isIndeterminate", false);
      }
      if (typeof item.isIndeterminate === "undefined") {
        this.$set(item, "isIndeterminate", false);
      }
      second.checkAll = checkedCount === second.list.length;
      second.isIndeterminate =
        checkedCount > 0 && checkedCount < second.list.length;
      if (item.checkedAll) {
        item.isIndeterminate = false;
        item.checkedAll = true;
      } else {
        for (let a = 0; a < item.second.length; a++) {
          if (!item.second[a].checkAll) {
            item.isIndeterminate = true;
            for (let b = 0; b < item.second.length; b++) {
              if (item.second[b].checkedCities.length > 0) {
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
      for (let a = 0; a < item.second.length; a++) {
        this.checkItemAll(item.firstCheckAll, item.second[a]);
      }
      item.isIndeterminate = false;
    },
    checkItemAll: function(flag, item) {
      let arr = [];
      console.log(item)
      for (let a = 0; a < item.list.length; a++) {
        arr.push(item.list[a].id);
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
      item.isIndeterminate = checkedCount > 0 && checkedCount < item.list.length;
      item.checkAll = checkedCount === item.list.length;
      // 修改同级权限信息
      this.dataList.forEach((ele) => {
          if(ele.second !== undefined && ele.second.length >0){
              if(ele.firstCheckAll === 'undefined'){
                  this.$set(ele, "firstCheckAll", false);
              }
              ele.isIndeterminate = true
              ele.checkAll = false
              ele.second.forEach((subEle) => {
                  if (typeof subEle.isIndeterminate === "undefined") {
                    this.$set(subEle, "isIndeterminate", false);
                }
                  subEle.isIndeterminate = true
                //   subEle.list.forEach( (list) => {
                    
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
      for (let a = 0; a < item.list.length; a++) {
        arr.push(item.list[a].id);
      }
      item.checkedCities = event.target.checked ? arr : [];
      if(item.checkedCities.length = item.list.length){
          item.checkAll = true;
          item.isIndeterminate = false;
      }else{
          item.isIndeterminate = true;
          item.checkedNum = false
      }
      // 把一下所有的数据的都遍历勾选
      if(event.target.checked){
        this.dataList.forEach((ele) => {
          if(ele.second !== undefined && ele.second.length >0){
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
          if(ele.second !== undefined && ele.second.length >0){
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

