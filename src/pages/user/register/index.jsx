import { Form, Input, Tooltip, Icon, Select, Button, PageHeader, message } from 'antd'
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale'
import React, { Component } from 'react'
import { connect } from 'dva'
import { promisify } from 'util'
import router from 'umi/router'

import styles from './style.less'

const { Option } = Select

class RegistrationForm extends Component {
	state = {
		confirmDirty: false,
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		const { dispatch } = this.props
		const values = this.props.form.getFieldsValue()
		const validateFieldsAndScroll = promisify(this.props.form.validateFieldsAndScroll)
		try {
			await validateFieldsAndScroll()
			dispatch({
				type: 'register/register',
				payload: { ...values },
			})
			message.success(formatMessage({ id: 'user-register.register.register success' }))
		} catch (error) {
			console.error(error.stack)
			message.error('frontend error')
		}
	}

	handleConfirmBlur = e => {
		const { value } = e.target
		this.setState({ confirmDirty: this.state.confirmDirty || !!value })
	};

	compareToFirstPassword = (rule, value, callback) => {
		const { form } = this.props
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!')
		} else {
			callback()
		}
	};

	validateToNextPassword = (rule, value, callback) => {
		const { form } = this.props
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true })
		}
		callback()
	};

	render () {
		const { getFieldDecorator } = this.props.form

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				md: { span: 8 },
			},
			wrapperCol: {
				xs: { span: 24 },
				md: { span: 16 },
			},
		}
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0,
				},
				sm: {
					span: 16,
					offset: 8,
				},
			},
		}
		const prefixSelector = getFieldDecorator('prefix', {
			initialValue: '86',
		})(
			<Select style={{ width: 70 }}>
				<Option value="86">+86</Option>
			</Select>,
		)

		return (
			<div className={styles.main}>
				<PageHeader
					style={{
						border: '1px solid rgb(235, 237, 240)',
					}}
					onBack={() => router.push('/user/login')}
					title={`${formatMessage({ id: 'user-register.register.Register Page' })}`}
				/>
				<Form {...formItemLayout} onSubmit={this.handleSubmit}>
					<Form.Item className={styles.input} label={`${formatMessage({ id: 'user-register.register.Username' })}`}>
						{getFieldDecorator('username', {
							rules: [
								{
									required: true,
									message: 'Please input your username!',
								}
							]
						})(<Input />)}
					</Form.Item>
					<Form.Item className={styles.input} label={`${formatMessage({ id: 'user-register.register.Password' })}`} hasFeedback>
						{getFieldDecorator('password', {
							rules: [
								{
									required: true,
									message: 'Please input your password!',
								},
								{
									validator: this.validateToNextPassword,
								}
							]
						})(<Input.Password />)}
					</Form.Item>
					<Form.Item className={styles.input} label={`${formatMessage({ id: 'user-register.register.Confirm Password' })}`} hasFeedback>
						{getFieldDecorator('confirm', {
							rules: [
								{
									required: true,
									message: 'Please confirm your password!',
								},
								{
									validator: this.compareToFirstPassword,
								}
							]
						})(<Input.Password onBlur={this.handleConfirmBlur} />)}
					</Form.Item>
					<Form.Item
						className={styles.input}
						label={
							<span>
								<FormattedMessage id="user-register.register.Nickname" />
								<Tooltip title="What do you want others to call you?">
									<Icon type="question-circle-o" />
								</Tooltip>
							</span>
						}
					>
						{getFieldDecorator('nickname', {
							rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
						})(<Input />)}
					</Form.Item>
					<Form.Item className={styles.input} label={`${formatMessage({ id: 'user-register.register.Phone Number' })}`}>
						{getFieldDecorator('phone', {
							rules: [{ required: true, message: 'Please input your phone number!' }],
						})(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
					</Form.Item>
					<Form.Item className={styles.input} {...tailFormItemLayout}>
						<Button type="primary" htmlType="submit">
							<FormattedMessage id="user-register.register.register" />
						</Button>
					</Form.Item>
				</Form>
			</div>
		)
	}
}

const Register = Form.create({ name: 'register' })(RegistrationForm)

const mapStateToProps = (state) => {
	return {}
}
export default connect(mapStateToProps)(Register)
