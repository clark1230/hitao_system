# 后台系统登陆接口文档

## 处理请求登陆(AccountController)

<p>前台系统传入json格式的数据，后台系统会自动转换为ShopAdmin对象!</p>

<div style="background-color:#f5f5f5;padding:10px;border-radius:15px;">
  <p style="color:red;font-size:20px;">请求方式:POST请求</p>
  <p style="style:skyblue;font-size:20px;">请求地址:/account/login</p>
</div>

示例:
``` json
{
  "adminName":"admin",
  "adminPassword":"123456"
}
```
参数说明
参数名称|数据类型|是否必须|说明
:--|:--|:--|:---
adminName|String|是|管理员名称
adminPassword|String|是|登陆密码

<p>登陆成功示例:</p>

```json
{
  "status": 0,
  "msg": null,
  "data": {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoibWVtYmVyIiwidW5pcXVlX25hbWUiOiJhZG1pbiIsInVzZXJpZCI6IjEiLCJpc3MiOiJoeml0eHguY29tIiwiYXVkIjoiMDk4ZjZiY2Q0NjIxZDM3M2NhZGU0ZTgzMjYyN2I0ZjYiLCJleHAiOjE1MzM2NDAwMDcsIm5iZiI6MTUzMzYzMjgwN30.b_CH8sn7bXr9U-nbVW3L9VNemEPHUWv26Z419gDNIPM"
  },
  "success": true
}
```
<p>登陆失败示例:</p>

``` json
{
  "status":1,
  "msg":"用户名或者密码错误!",
  "data":null,
  "success":false
}
```
## 处理系统注销