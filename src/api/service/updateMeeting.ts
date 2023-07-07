import { defHttp } from '@/utils/http/axios'
import { UpdateMeetingParams, UpdateMeetingListGetResultModel } from './model/updateMeetingModel'

enum Api {
  UPDATE_MEETING = '/api/meetingroomMange/update'
}

/**
 * @description: Get sample list value
 */

export const updateMeetingApi = (params: UpdateMeetingParams) => {
  return defHttp.post<UpdateMeetingListGetResultModel>({
    url: Api.UPDATE_MEETING,
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true
    }
  })
}
