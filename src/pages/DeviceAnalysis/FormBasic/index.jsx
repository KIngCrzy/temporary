import React from 'react'
import { Form, Select, Button, DatePicker } from 'antd'
import { connect } from 'dva'
import moment from 'moment'

const { Option } = Select

class App extends React.Component {

	state = {
		startValue: null,
		endValue: null,
		show_select_time: 'false',
	}

	componentDidMount () {
		const { dispatch } = this.props
		dispatch({
			type: 'traffic/getFormItemOption',
		})
		this.setState({
			startValue: moment().subtract(1, 'hours').format('X'),
			endValue: moment().format('X'),
		}, () => {
			dispatch({
				type: 'traffic/getFakeChart',
				payload: {
					start_time: this.state.startValue,
					end_time: this.state.endValue,
				}
			})
		})
	}

	handleSubmit = e => {
		e.preventDefault()
		this.props.form.validateFields((err, fieldsValue) => {
			if (!err) {
				if (fieldsValue.start_time && fieldsValue.end_time) {
					const { dispatch } = this.props

					dispatch({
						type: 'traffic/getFakeChart',
						payload: {
							start_time: this.state.startValue,
							end_time: this.state.endValue,
						}
					})
				}

				console.log('Received values of form: ', fieldsValue)
			}
		})
	};

	handleSelectChange = value => {
		this.props.form.setFieldsValue({
			//note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
		})
		switch (value) {
			case 'hour':
				this.setState({
					startValue: moment().subtract(1, 'hours').format('X'),
					endValue: moment().format('X'),
				})
				break
			case 'day':
				this.setState({
					startValue: moment().subtract(1, 'days').format('X'),
					endValue: moment().format('X'),
				})
				break
			case 'week':
				this.setState({
					startValue: moment().subtract(1, 'weeks').format('X'),
					endValue: moment().format('X'),
				})
				break
			default:
				break
		};
		if (value === 'others') {
			this.setState({ show_select_time: 'true', })
		} else {
			this.setState({ show_select_time: 'false', })

		}
	};


	disabledStartDate = startValue => {
		const endValue = this.props.form.getFieldValue('end_time')
		if (endValue) {
			return startValue.valueOf() > moment().endOf('day') || startValue.valueOf() > endValue.valueOf()
		}
		return startValue.valueOf() > moment().endOf('day')


	};

	disabledEndDate = endValue => {
		const startValue = this.props.form.getFieldValue('start_time')
		if (startValue) {
			return endValue.valueOf() > moment().endOf('day') || endValue.valueOf() <= startValue.valueOf()

		}
		return endValue.valueOf() > moment().endOf('day')

	};


	onChange = (field, value) => {
		this.setState({
			[ field ]: value,
		})
	};

	onStartChange = value => {
		this.onChange('startValue', moment(value).startOf('day').format('X'))

	};

	onEndChange = value => {
		this.onChange('endValue', moment(value).add(1, 'days').startOf('day').format('X'))
	};

	render () {
		const { getFieldDecorator } = this.props.form
		if (!this.props.traffic.api.data) {
			return <div></div>

		}
		console.log(this.props.traffic)

		return (

			<Form layout='inline'

				onSubmit={this.handleSubmit}
			>
				<Form.Item label="应用">
					{getFieldDecorator('app', {
						initialValue: this.props.traffic.app.data[ 0 ].name,
						rules: [
							{
								message: 'Please select your gender!',
							},
						],
					})(
						<Select style={{ width: '180px' }}
							onChange={this.handleSelectChange}
						>
							{this.props.traffic.app.data.map(item => {
								return (
									<Option key={item.name} value={item.name}>{item.name}</Option>
								)
							})}
						</Select>,
					)}
				</Form.Item>

				<Form.Item label="时间">
					{getFieldDecorator('time', {
						initialValue: 'hour',
						rules: [
							{
								message: 'Please select your gender!',
							},
						],
					})(
						<Select style={{ width: '180px' }}
							placeholder="Select a option and change input text above"
							onChange={this.handleSelectChange}
						>
							<Option value='hour'>最近一小时</Option>
							<Option value="day">最近一天</Option>
							<Option value="week">最近一周</Option>
							<Option value="others">其他时间</Option>
						</Select>,
					)}
				</Form.Item>
				{this.state.show_select_time === 'true' ? (
					<div style={{ display: 'inline' }}>
						<Form.Item>
							{getFieldDecorator('start_time', {
								rules: [
								],
							})(
								<DatePicker
									disabledDate={this.disabledStartDate}
									format="YYYY-MM-DD HH:mm:ss"
									placeholder="开始时间"
									onChange={this.onStartChange}
								/>

							)}
						</Form.Item>
						<Form.Item>
							{getFieldDecorator('end_time', {
								rules: [
								],
							})(
								<DatePicker
									disabledDate={this.disabledEndDate}
									format="YYYY-MM-DD HH:mm:ss"
									placeholder="结束时间"
									onChange={this.onEndChange}
								/>

							)}
						</Form.Item>
					</div>) : null}

				<Form.Item
					wrapperCol={{
						span: 12,
						offset: 5,
					}}
				>
					<Button type="primary" htmlType="submit">
						查询
					</Button>
				</Form.Item>
			</Form>
		)
	}
}

const FormBasic = Form.create({
	name: 'coordinated',
})(App)

export default connect(({ traffic }) => ({ traffic }))(FormBasic)