import { BasicPageParams, BasicFetchResult } from '@/api/model/baseModel'
/**
 * @description: Request list interface parameters
 */
export type ReserveMeetingParams = BasicPageParams

export interface ReserveMeetingListItem {
  roomId: number
  startTime: Date
  endTime: Date
  meetingTopic: string
}

/**
 * @description: Request list return value
 */
export type ReserveMeetingListGetResultModel = BasicFetchResult<ReserveMeetingListItem>
