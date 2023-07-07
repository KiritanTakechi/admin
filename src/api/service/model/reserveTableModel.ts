import { BasicPageParams, BasicFetchResult } from '@/api/model/baseModel'
/**
 * @description: Request list interface parameters
 */
export type ReserveParams = BasicPageParams

export interface ReserveListItem {
  reserveId: number
  roomId: number
  buildName: string
  floor: number
  startTime: Date
  endTime: Date
  meetingTopic: string
  status: string
}

/**
 * @description: Request list return value
 */
export type ReserveListGetResultModel = BasicFetchResult<ReserveListItem>
