import React from 'react'
import { Card, Typography, Icon } from 'antd'
import { PageHeaderWrapper } from '@ant-design/pro-layout'

export default () => (
	<PageHeaderWrapper content=" 这个页面只有 admin 权限才能查看">
		<Card>
			<Typography.Title
				level={2}
				style={{
					textAlign: 'center',
				}}
			>
				This is push-log
			</Typography.Title>
		</Card>
	</PageHeaderWrapper>
)
