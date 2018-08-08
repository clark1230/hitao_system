# 系统首页

```json
{
	"status": 0,
	"msg": null,
	"data": {
		"shopAdmin": {
			"adminId": 1,
			"adminName": "admin",
			"adminLoginNum": 2629,
			"loginIp": "127.0.0.1",
			"loginStatus": 1,
			"email": "3267672731@qq.com",
			"isDel": 0,
			"loginTime": "2018-08-06 17:19:14",
			"createdBy": 1,
			"createdTime": "2018-04-11 10:03:19",
			"updatedBy": 1,
			"updatedTime": "2018-07-19 15:32:12"
		},
		"permissions": [{
			"path": "/order",
			"component": "order/order",
			"name": "order",
			"meta": "{\"title\":\"order\",\"icon\":\"form\"}",
			"children": [{
				"path": "order",
				"component": "order/order",
				"name": "order",
				"meta": "{\"title\":\"order\":\"noCache\":\"true\"}"
			}]
		}],
		"roles": ["admin"],
		"avatar": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=925993276,4023638545&fm=27&gp=0.jpg"
	},
	"success": true
}
```