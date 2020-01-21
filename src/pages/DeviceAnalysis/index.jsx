import React from 'react'
import { Card } from 'antd'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import FormBasic from './FormBasic'
import Chart from './Chart'



export default () => (
	<div >
		<PageHeaderWrapper content=" 这个页面只有 admin 权限才能查看">
			<Card>
				<FormBasic />
			</Card>
		</PageHeaderWrapper>
		<Chart></Chart>


	</div >
)
