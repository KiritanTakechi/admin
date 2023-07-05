import { BasicPageParams, BasicFetchResult } from '@/api/model/baseModel'
/**
 * @description: Request list interface parameters
 */
export type MeetingParams = BasicPageParams

export interface MeetingListItem {
  id: number
  buildName: string
  floor: number
  area: number
  capacity: number
  status: string
}

/**
 * @description: Request list return value
 */
export type MeetingListGetResultModel = BasicFetchResult<MeetingListItem>
