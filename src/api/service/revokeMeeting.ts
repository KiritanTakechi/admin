import { defHttp } from '@/utils/http/axios'
import { RevokeMeetingParams, RevokeMeetingListGetResultModel } from './model/revokeMeetingModel'

enum Api {
  REVOKE_MEETING = '/api/meetingroomMange/revoke'
}

/**
 * @description: Get sample list value
 */

export const revokeMeetingApi = (params: RevokeMeetingParams) => {
  return defHttp.post<RevokeMeetingListGetResultModel>({
    url: Api.REVOKE_MEETING,
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true
    }
  })
}