export default {
	// 支持值为 Object 和 Array
	'POST  /api/traffic/traffic_query': (req, res) => {
		if (req.body.app === 'app01') {
			res.send({
				status: 'ok'
			})
			return
		}
		res.send({
			status: 'error',

		})

	},
	'GET  /api/application/application_list': (req, res) => {
		res.send({
			status: '200',
			data: [
				{ id: "a977ab8593a44d9cb748a135e02c6787", name: "app003", create_time: 1546912300 },
				{ id: "a977ab8593a44d9cbsad748a135e02c6787", name: "app001", create_time: 1546912300 }
			],
			message: '操作成功'
		})

	},
	'GET  /api/open_api/open_api_list': (req, res) => {
		res.send({
			status: '200',
			data: [
				{ id: "0a77159d1c1649d3901faa346e0b082c", name: "/open_parking/user_profile", introduction: "用户信息" },
				{ id: "0a77159d1c1649d3asd901faa346e0b082c", name: "/open_parking/user_dsaa", introduction: "用户信息" },
			],
			message: '操作成功'
		})
	},

	'GET  /api/traffic_statistics/traffic': (req, res) => {
		res.send({
			req_query: req.query,
			status: '200',
			message: '操作成功',
			data:[0,0,0,0,0,0,0],
		})
	}

}
