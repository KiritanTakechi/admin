import { BasicPageParams, BasicFetchResult } from '@/api/model/baseModel'
/**
 * @description: Request list interface parameters
 */
export type UpdateMeetingParams = BasicPageParams

export interface UpdateMeetingListItem {
  oldId: number
  id: number
  buildName: string
  floor: number
  area: number
  capacity: number
}

/**
 * @description: Request list return value
 */
export type UpdateMeetingListGetResultModel = BasicFetchResult<UpdateMeetingListItem>
