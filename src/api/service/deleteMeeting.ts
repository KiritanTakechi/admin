import { defHttp } from '@/utils/http/axios'
import { DeleteMeetingParams, DeleteMeetingListGetResultModel } from './model/deleteMeetingModel'

enum Api {
  DELETE_MEETING = '/meetingroomMange/deleteRoom'
}

/**
 * @description: Get sample list value
 */

export const deleteMeetingApi = (params: DeleteMeetingParams) => {
  return defHttp.post<DeleteMeetingListGetResultModel>({
    url: Api.DELETE_MEETING,
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true
    }
  })
}
