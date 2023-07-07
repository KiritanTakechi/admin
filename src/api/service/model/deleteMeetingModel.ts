import { BasicPageParams, BasicFetchResult } from '@/api/model/baseModel'
/**
 * @description: Request list interface parameters
 */
export type DeleteMeetingParams = BasicPageParams

export interface DeleteMeetingListItem {
  id: number
}

/**
 * @description: Request list return value
 */
export type DeleteMeetingListGetResultModel = BasicFetchResult<DeleteMeetingListItem>
