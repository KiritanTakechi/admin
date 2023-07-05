import type { AppRouteModule } from '@/router/types'

import { LAYOUT } from '@/router/constant'
import { t } from '@/hooks/web/useI18n'

const service: AppRouteModule = {
  path: '/service',
  name: 'Service',
  component: LAYOUT,
  redirect: '/service/meeting-query',
  meta: {
    orderNo: 80000,
    hideChildrenInMenu: true,
    icon: 'solar:slider-vertical-minimalistic-linear',
    //title: t('routes.demo.setup.page'),
    title: '服务'
  },
  children: [
    {
      path: 'meeting-query',
      name: 'meetingQuery',
      component: () => import('/@/views/service/meeting-query/index.vue'),
      meta: {
        //title: t('routes.demo.setup.page'),
        title: '会议查询',
        icon: 'whh:paintroll',
        hideMenu: true
      }
    }
  ]
}

export default service
