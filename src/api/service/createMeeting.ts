import { defHttp } from '@/utils/http/axios'
import { CreateMeetingParams, CreateMeetingListGetResultModel } from './model/createMeetingModel'

enum Api {
  MEETING_LIST = '/api/meetingroomMange/add'
}

/**
 * @description: Get sample list value
 */

export const createMeetingApi = (params: CreateMeetingParams) => {
  return defHttp.post<CreateMeetingListGetResultModel>({
    url: Api.MEETING_LIST,
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true
    }
  })
}
