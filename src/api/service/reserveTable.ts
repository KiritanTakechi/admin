import { defHttp } from '@/utils/http/axios'
import { ReserveParams, ReserveListGetResultModel } from './model/reserveTableModel'

enum Api {
  RESERVE_LIST = '/mroomReserve/getRoomAll'
}

/**
 * @description: Get sample list value
 */

export const reserveListApi = (params: ReserveParams) => {
  return defHttp.get<ReserveListGetResultModel>({
    url: Api.RESERVE_LIST,
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true
    }
  })
}
