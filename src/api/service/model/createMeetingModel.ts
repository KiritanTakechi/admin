import { BasicPageParams, BasicFetchResult } from '@/api/model/baseModel'
/**
 * @description: Request list interface parameters
 */
export type CreateMeetingParams = BasicPageParams

export interface CreateMeetingListItem {
  id: number
  buildName: string
  floor: number
  area: number
  capacity: number
}

/**
 * @description: Request list return value
 */
export type CreateMeetingListGetResultModel = BasicFetchResult<CreateMeetingListItem>
