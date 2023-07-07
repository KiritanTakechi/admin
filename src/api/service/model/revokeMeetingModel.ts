import { BasicPageParams, BasicFetchResult } from '@/api/model/baseModel'
/**
 * @description: Request list interface parameters
 */
export type RevokeMeetingParams = BasicPageParams

export interface RevokeMeetingListItem {
  roomId: number
}

/**
 * @description: Request list return value
 */
export type RevokeMeetingListGetResultModel = BasicFetchResult<RevokeMeetingListItem>
