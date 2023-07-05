import { defHttp } from '@/utils/http/axios'
import { MeetingParams, MeetingListGetResultModel } from './model/meetingTableModel'

enum Api {
  MEETING_LIST = '/meetingroomMange/getRoomAll'
}

/**
 * @description: Get sample list value
 */

export const meetingListApi = (params: MeetingParams) => {
  return defHttp.get<MeetingListGetResultModel>({
    url: Api.MEETING_LIST,
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true
    }
  })
}
