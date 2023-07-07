import type { AppRouteModule } from '@/router/types'

import { LAYOUT } from '@/router/constant'
import { t } from '@/hooks/web/useI18n'

const service: AppRouteModule = {
  path: '/service',
  name: 'Service',
  component: LAYOUT,
  redirect: '/service/meetingQuery',
  meta: {
    orderNo: 8000,
    icon: 'solar:slider-vertical-minimalistic-linear',
    title: '服务'
  },
  children: [
    {
      path: 'meetingQuery',
      name: 'MeetingQuery',
      component: () => import('@/views/service/meeting-query/index.vue'),
      meta: {
        title: '会议预约'
      }
    },
    {
      path: 'meetingManage',
      name: 'MeetingManage',
      component: () => import('@/views/service/meeting-manage/index.vue'),
      meta: {
        title: '会议管理'
      }
    }
  ]
}

export default service
