import { getFakeData, getFakeApp, getFakeApi, getFakeChart } from '../services/getTrafficDetails'

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
			const response = yield call(getFakeChart, payload)

			yield put({
				type: 'saveChart',
				payload: { response, xAxis },
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
				xAxis: action.payload.xAxis,
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