import React from 'react'
import { Card, Tabs } from 'antd'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import TableBasic from './TableBasic'
import FormBasic from './FormBasic'
import Chart from './Chart'
const { TabPane } = Tabs

export default () => {

	return (

		<div >
			<PageHeaderWrapper content=" 这个页面只有 admin 权限才能查看"></PageHeaderWrapper>
			<div>
				<Tabs defaultActiveKey="1" >
					<TabPane tab='流量查询' key="1">
						<div>
							<Card>
								<FormBasic />
							</Card>
							<Card>
								<Chart />
							</Card>
						</div>
					</TabPane>
					<TabPane tab='超额接口列表' key="2">
						<Card><TableBasic /></Card>
					</TabPane>
				</Tabs>
			</div>

		</div >
	)
}

