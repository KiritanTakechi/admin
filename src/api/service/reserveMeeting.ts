import { defHttp } from '@/utils/http/axios'
import { ReserveMeetingParams, ReserveMeetingListGetResultModel } from './model/reserveMeetingModel'

enum Api {
  RESERVE_MEETING = '/api/meetingroomMange/reserve'
}

/**
 * @description: Get sample list value
 */

export const reserveMeetingApi = (params: ReserveMeetingParams) => {
  return defHttp.post<ReserveMeetingListGetResultModel>({
    url: Api.RESERVE_MEETING,
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true
    }
  })
}
