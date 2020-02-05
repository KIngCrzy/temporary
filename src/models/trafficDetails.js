import { getFakeData, getFakeApp, getFakeApi, getFakeChart } from '../services/getTrafficDetails'
import moment from 'moment'

export default {
	namespace: 'traffic',
	state: {
		app: {},
		api: {},
		chart: {},
		xAxis: {},
	},
	effects: {
		*fetch ({ payload }, { call, put }) {
			const response = yield call(getFakeData, payload)
			yield put({
				type: 'updateToView',
				payload: response,
			}) // Login successfully

		},
		*getFakeChart ({ payload }, { call, put }) {
			const xAxis = payload.xAxis
			const current_time = moment()
			let data
			const usage =[0,0,0,0,0,0,0]
			switch (xAxis) {
				case 'hour':
					data = [ { time:moment(current_time).format('HH:mm') ,usage:usage[ 0 ] }]
					for (let i = 1; i < 60; i += 1) {
						data.unshift({ time:current_time.subtract(1, 'minutes').format('HH:mm'),usage:usage[ i ] })
					}
					break
				case 'day':
					data = [ { time:moment(current_time).format('MM-DD HH') ,usage:usage[ 0 ] }]

					for (let i = 1; i < 24; i += 1) {
						data.unshift({ time:current_time.subtract(1, 'hours').format('MM-DD HH') ,usage:usage[ i ] })
					}

					break
				case 'week':
					data = [ { time:moment(current_time).format('DD'),usage:usage[ 0 ] }]

					for (let i = 1; i < 7; i += 1) {
						data.unshift({ time:current_time.subtract(1, 'days').format('DD') ,usage:usage[ i ] })
					}
					break
				default:
					break
			};
			const response = yield call(getFakeChart, payload)

			yield put({
				type: 'saveChart',
				payload: { response, data },
			}) // Login successfully

		},
		*getFormItemOption (_, { call, put }) {
			const App = yield call(getFakeApp)
			const Api = yield call(getFakeApi)
			yield put({
				type: 'saveFormItemOption',
				payload: {
					App,
					Api,
				},
			})

		},
	},
	reducers: {
		updateToView (state, action) {
			return {
				...state,
				data: action.payload
			}
		},
		saveChart (state, action) {
			// console.log(action)

			return {
				...state,
				chart: action.payload.response,
				xAxis: action.payload.data,
			}
		},
		saveFormItemOption (state, action) {
			return {
				...state,
				app: action.payload.App,
				api: action.payload.Api
			}
		},
	},
}