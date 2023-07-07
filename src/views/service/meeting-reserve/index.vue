<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerReserveTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '取消预约',
                icon: 'ic:outline-delete-outline',
                color: 'error',
                onClick: handleReserveMeeting.bind(null, record),
                ifShow: true,
                auth: ['user', 'test']
              }
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <MeetingReserveModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup name="meetingManage">
import { BasicTable, useTable, TableAction } from '@/components/Table'
import { getMeetingActionColumns, getMeetingColumns } from './meeting.data'
import { PageWrapper } from '@/components/Page'

import { useModal } from '@/components/Modal'
import { reserveListApi } from '@/api/service/reserveTable'
import MeetingReserveModal from './MeetingReserveModal.vue'

const [registerModal, { openModal }] = useModal()
const [registerReserveTable, { getForm, getDataSource, reload, updateTableDataRecord }] = useTable({
  title: '预约会议室列表',
  api: reserveListApi,
  columns: getMeetingColumns(),
  /* showTableSetting: true,
  tableSetting: { fullScreen: true }, */
  showIndexColumn: false,
  rowKey: 'id',
  actionColumn: getMeetingActionColumns()
})

const handleReserveMeeting = (record: Recordable) => {
  openModal(true, {
    reserveId: record.reserveId
  })
}

function handleSuccess({ isUpdate, values }) {
  if (isUpdate) {
    // 演示不刷新表格直接更新内部数据。
    // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
    const result = updateTableDataRecord(values.id, values)
    console.log(result)
  } else {
    reload()
  }
}
</script>
