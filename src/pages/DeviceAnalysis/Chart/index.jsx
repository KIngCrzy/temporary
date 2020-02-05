import React from 'react'
import { connect } from 'dva'

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

const data = [
	{
		year: "1991",
		value: 3
	},
	{
		year: "1992",
		value: 4
	},
	{
		year: "1993",
		value: 3.5
	},
	{
		year: "1994",
		value: 5
	},
	{
		year: "1995",
		value: 4.9
	},
	{
		year: "1996",
		value: 6
	},
	{
		year: "1997",
		value: 7
	},
	{
		year: "1998",
		value: 9
	},
	{
		year: "1999",
		value: 13
	}
]
const cols = {
	value: {
		min: 0,
		alias:'调用量'
	},
	year: {
		range: [ 0, 1 ],
		alias:'时间'
	}
}

export default class App extends React.Component {
	render () {
		return (
			<div display='inline-block'>
				<div >
					<Chart style={{ float: 'left' }} width={750} height={400} data={data} scale={cols} >
						<Axis name="year" title='true' line={{
							stroke: "#848484"
						}} />
						<Axis name="value" title='true' line={{
							stroke: "#848484"
						}} />
						<Tooltip
							crosshairs={{
								type: "y"
							}}
						/>
						<Geom type="line" position="year*value" size={2} />
						<Geom
							type="point"
							position="year*value"
							size={4}
							shape={"circle"}
							style={{
								stroke: "#fff",
								lineWidth: 1
							}}
						/>
					</Chart>
				</div>
				<div >
					<Chart width={750} height={400} data={data} scale={cols} >
						<Axis name="year" title='true' line={{
							stroke: "#848484"
						}} />
						<Axis name="value" title='true' line={{
							stroke: "#848484"
						}} />
						<Tooltip
							crosshairs={{
								type: "y"
							}}
						/>
						<Geom type="line" position="year*value" size={2} />
						<Geom
							type="point"
							position="year*value"
							size={4}
							shape={"circle"}
							style={{
								stroke: "#fff",
								lineWidth: 1
							}}
						/>
					</Chart>
				</div>

			</div>
		)
	}


}
