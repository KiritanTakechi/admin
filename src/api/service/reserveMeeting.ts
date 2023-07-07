import { defHttp } from '@/utils/http/axios'
import { ReserveMeetingParams, ReserveMeetingListGetResultModel } from './model/reserveMeetingModel'

enum Api {
  MEETING_LIST = '/api/meetingroomMange/reserve'
}

/**
 * @description: Get sample list value
 */

export const reserveMeetingApi = (params: ReserveMeetingParams) => {
  return defHttp.post<ReserveMeetingListGetResultModel>({
    url: Api.MEETING_LIST,
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true
    }
  })
}
