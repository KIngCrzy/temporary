import request from '@/utils/request'

export async function getFakeData (params) {
	return request(`/api/traffic/traffic_query`, {
		method: 'POST',
		data: params,
	})
}

export async function getFakeApp () {
	return request(`/api/application/application_list`)
}

export async function getFakeApi () {
	return request(`/api/open_api/open_api_list`)
}


export async function getFakeChart (params) {
	if (params.app_id) {
		return request(`/api/traffic_statistics/traffic?application_id${params.app_id}&api_id=&=start_time=${params.start_time}&end_time=${params.end_time}`)

	} else {
		return request(`/api/traffic_statistics/traffic?start_time=${params.start_time}&end_time=${params.end_time}`)

	}
}
