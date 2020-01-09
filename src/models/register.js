import router from 'umi/router'
import { fakeRegister } from '@/services/register'
import { setAuthority } from '@/utils/authority'
import { getPageQuery } from '@/utils/utils'

const Model = {
	namespace: 'register',
	state: {},
	effects: {
		*register ({ payload }, { call, put }) {
			const response = yield call(fakeRegister, payload)

			if (response.status === 'ok') {
				router.push('/user/login')
			}
		},
	},
	reducers: null
}
export default Model
