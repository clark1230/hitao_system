# 项目说明

<span style="color:orange;">本项目是是嗨淘电商后台管理系统的前端页面，采用的是前后端分离的技术，后台采用spring cloud全家桶，前端页面采用vue+element!</span>

## 接口文档说明 详情请看api文件夹下的文档
### 请求路径:http://localhost:8200/

页面|vue文件|对应接口说明文档|功能
:--|:--|:--|:---
登陆页|views/login/login.vue| api/login.md|系统登陆
首页|views/index| api/index.md|系统首页展示
欢迎页|views/welcome.vue| api/welcome.md|系统欢迎
系统用户管理|views/permissions/user/user.vue| api/permissions/user.md|系统用户管理
系统角色管理|views/permissions/role/role.vue| api/permissions/role.md|系统角色管理
系统权限管理|views/permissions/permision/permission.vue| api/permissions/permission.md| 系统权限管理
服务网关管理|views/gateway/gateway.vue| api/gateway/gateway/md| 微服务网关管理
发布商品|views/product/goods/addGoods.vue| api/goods/addGoods.md| 发布商品
商品管理|views/product/goods/goods.vue| api/product/goods.md| 商品管理
品牌管理|views/product/brand/brand.vue| api/product/brand.md| 品牌管理
后台类目管理|views/product/category/category.vue| api/product/gateway.md| 后台类目管理
区域信息管理|views/member/shopArea.vue| api/member/shopArea.md| 区域信息管理
收货地址管理|views/memeber/shopAddress.vue| api/member/shopAddress.md | 收货地址管理
系统监控管理|views/monitor/*| api/monitor/monitor.md| 所有系统监控的信息都在这个文档里面进行说明
Swagger接口文档|views/api/*| api/api/swagger.md| 微服务在线接口文档
订单管理|views/order/order.vue| api/order/order.md| 订单管理
广告管理|views/adv/adv.vue| api/adv/adv.md| 广告管理
文章管理|views/article/article.vue|api/article/article.md|文章管理
系统设置|views/settings/settings.vue|api/settings/settings.md|系统设置
优惠券管理|views/coupon/coupon.vue|api/coupon/coupob.md|优惠券管理

---

## 小程序接口文档预览

页面|xml文件|对应接口说明文档|功能
:--|:--|:--|---
登陆页|pages/authc/login/login.xml |hitao/authc/login.md|会员登陆
注册页|pages/authc/register/register.xml|hitao/authc/register.md|会员注册
找回密码页|pages/authc/reset/reset.xml|hitao/authc/reset.md|会员找回密码
个人中心页|pages/ucenter/index/index.xml|hitao/ucenter/index.md|个人中心
收货地址页|pages/ucenter/address/address.xml|hitao/ucenter/address.md|收货地址管理
新增收货地址页|pages/ucenter/addressAdd/addressAdd.xml|hitao/ucenter/addressAdd.md|新增收货地址
个人信息页|pages/ucenter/userInfo/userInfo.xml|hitao/ucenter/userInfo.md|编辑个人信息
积分页|pages/ucenter/credit/credit.xml|hitao/ucenter/credit.md|积分详情
优惠券|pages/ucenter/coupon/coupon.xml|hitao/ucenter/coupon.md| 优惠券管理
会员商品收藏页|pages/ucenter/collect/collect.xml|hitao/ucenter/collect.md|收藏商品管理
订单页|pages/ucenter/order/order/xml|hitao/ucenter/order.md|订单管理
订单详情页|pages/ucenter/orderDetail/orderDetail.xml|hitao/ucenter/orderDetail.md|订单详情
首页|pages/index/index.xml|hitao/index.md|首页
商品详情页|pages/goods/goods.xml|hitao/goods/goods.md|商品详情页
商品分类页|pages/category/category.xml|hitao/category/category.md|商品分类
商品评论页|pages/comment/comment.xml|hitao/comment/comment.md|商品评论
购物车|pages/cart/cart.xml|hitao/cart/cart.md|购物车
订单确认页|pages/checkout/checkout.xml|hitao/checkout/checkout.md|订单确认
支付|pages/pay/pay.xml|hitao/pay/pay.md|支付
品牌街|pages/brand/brand/xml|hitao/brand/brand.md|品牌街
品牌详情页|pages/brandDetail/brandDetail.xml|hitao/brandDetail/brandDetail.md|品牌详情
商品搜索|pages/search/search.xml|hitao/search/search.md|商品搜索
热销商品页|pages/hotGoods/hotGoods.xml|hitao/hotGoods/hotGoods.md|热销商品
