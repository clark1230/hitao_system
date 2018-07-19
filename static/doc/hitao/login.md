# 小程序系统登陆接口说明文档
<span style="color:blue;font-size:20px;">说明: 本文档是小程序系统登陆所依赖接口，登陆成功后，返回所需的数据给小程序，小程序把数据保存到LocalStorage中，数据保存有效时间为2个小时!</span>
---
<img src="./images/login.png"/>

## 请求参数(Content-Type:application/json;charset=utf-8)

```json
{
  "memberName":"张三", // 会员名称
  "memberPassword":"1234" // 会员密码
}
```
---
## 响应参数(Content-Type:application/json;charset=utf-8)

### <sap style="color:green;font-weight:bold;">登陆成功:</span>

```json
{
    "status": 0,
    "msg": "登陆成功!",
    "data": {
        "cartCount": 1, // 购物车商品数量
        "shopMember": { // 会员信息
            "memberId": 11, // 会员编号
            "memberName": "张三", // 会员名称
            "memberTruename": "宋小宝", // 会员真实名称
            "memberAvatar": "http://localhost:8096/xxxxxxxxxxxxxxxxx.jpg", // 会员头像
            "memberSex": 1, // 会员性别
            "memberBirthday": "2018-03-15T00:00:00.000+0000", // 会员生日
            "memberEmail": "3267672731@qq.com", // 会员邮箱
            "memberPoints": 100, // 会员积分
            "memberMobile": 13364167708,
            "availablePredeposit": 0,
            "freezePredeposit": 0,
            "informAllow": 1,
            "isBuy": 1,
            "isAllowtalk": 1,
            "memberState": 1,
            "memberCredit": 0,
        },
        "token":  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoibWVtYmVyIiwidW5pcXVlX25hbWUiOiLlvKDkuIkiLCJ1c2VyaWQiOiIxMSIsImlzcyI6Imh6aXR4eC5jb20iLCJhdWQiOiIwOThmNmJjZDQ2MjFkMzczY2FkZTRlODMyNjI3YjRmNiIsImV4cCI6MTUzMTg0OTAxMCwibmJmIjoxNTMxODQxODEwfQ.HrpDRf4o9bqYfnVyLnFLk92_wnOX3H5j0Ibx5Bk7j_I", // token令牌
        "defaultAddress": { // 收货地址信息
            "id": 3, // 收货地址编号
            "memberId": 11, // 会员编号
            "memberName": "冼耀基", // 收货人(会员)名称
            "provinceId": 440000, // 省份编号
            "cityId": 441200, // 城市编号
            "districtId": 441225, // 地区编号
            "fullRegion": "广东省/肇庆市/封开县", // 区域信息
            "address": "广东省封开县长岗镇福石翁塘村6号", // 详细地址
            "telNumber": "13823721074", // 电话号码
            "postCode": 526500, // 邮编
            "isDefault": 1  // 是否是默认地址
        }
    },
    "success": true  // 是否成功
}
```

### <sap style="color:red;font-weight:bold;">登陆失败:</span>

```json
{
    "status": 1, // 状态
    "msg": "登陆失败!用户名或者密码错误!", // 消息
    "data": null,  // 数据
    "success": false  // 是否成功
}
```

---

<p>作者:冼耀基,邮箱:3267672731@qq.com</p>