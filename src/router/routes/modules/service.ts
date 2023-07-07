import type { AppRouteModule } from '@/router/types'

import { LAYOUT } from '@/router/constant'
import { t } from '@/hooks/web/useI18n'
import { RoleEnum } from '@/enums/roleEnum'

const service: AppRouteModule = {
  path: '/service',
  name: 'Service',
  component: LAYOUT,
  redirect: '/service/meetingQuery',
  meta: {
    orderNo: 8000,
    icon: 'solar:slider-vertical-minimalistic-linear',
    title: '服务',
    auth: [RoleEnum.SUPER, RoleEnum.ADMIN, RoleEnum.USER, RoleEnum.TEST]
  },
  children: [
    {
      path: 'meetingQuery',
      name: 'MeetingQuery',
      component: () => import('@/views/service/meeting-query/index.vue'),
      meta: {
        title: '会议预约',
        auth: [RoleEnum.USER, RoleEnum.TEST]
      }
    },
    {
      path: 'meetingReserve',
      name: 'MeetingReserve',
      component: () => import('@/views/service/meeting-reserve/index.vue'),
      meta: {
        title: '个人预约管理',
        auth: [RoleEnum.USER, RoleEnum.TEST]
      }
    },
    {
      path: 'meetingManage',
      name: 'MeetingManage',
      component: () => import('@/views/service/meeting-manage/index.vue'),
      meta: {
        title: '会议信息管理',
        auth: [RoleEnum.SUPER, RoleEnum.ADMIN, RoleEnum.TEST]
      }
    }
  ]
}

export default service
