import React from 'react'
import { connect } from 'dva'
import moment from 'moment'


import {
	G2,
	Chart,
	Geom,
	Axis,
	Tooltip,
	Coord,
	Label,
	Legend,
	View,
	Guide,
	Shape,
	Facet,
	Util
} from 'bizcharts'


const cols = {
	usage: {
		min: 0,
		max: 1,
		tickInterval: 0.2,
		alias:'调用量'
	},
	time: {
		range: [ 0, 1 ],
		alias:'时间'
	}
}



class App extends React.Component {



	render () {

		// const chart = this.props.traffic.chart.req_query.start_time
		// console.log('chart', chart)
		// console.log(this.state.xAxis)


		// const cols = {
		// 	调用量: {
		// 		min: 0, // 定义数值范围的最小值
		// 		max: 1, // 定义数值范围的最大值
		// 		// ticks: [ 100, 1000, 2000, 3000 ], // 用于指定坐标轴上刻度点的文本信息（label），当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。
		// 		tickInterval: 0.2, // 用于指定坐标轴各个标度点的间距，是原始数据之间的间距差值，tickCount 和 tickInterval 不可以同时声明。
		// 		// tickCount: 10, // 定义坐标轴刻度线的条数，默认为 5
		// 	},
		// 	时间: {
		// 		ticks: [ '100分', 1000, 2000, 3000 ], // 用于指定坐标轴上刻度点的文本信息（label），当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。
		// 	}
		// }
		return (
			<Chart data={this.props.traffic.xAxis} scale={cols} forceFit>
				<Axis name="time" title='true' line={{
					stroke: "#848484"
				}} />
				<Axis name="usage" title='true' line={{
					stroke: "#848484"
				}} />
				<Tooltip
					crosshairs={{
						type: "y"
					}}
				/>
				<Geom type="line" position="time*usage" size={2} />
				<Geom
					type="point"
					position="time*usage"
					size={4}
					shape={"circle"}
					style={{
						stroke: "#fff",
						lineWidth: 1
					}}
				/>
			</Chart>

		)
	}

}

export default connect(({ traffic }) => ({ traffic }))(App)