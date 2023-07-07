<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerQueryTable">
      <template #headerTop> </template>
      <template #toolbar>
        <!-- <a-button type="primary" @click="getFormValues">获取表单数据</a-button> -->
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '预约',
                icon: 'ic:baseline-arrow-upward',
                color: 'success',
                onClick: handleReserve.bind(null, record),
                auth: ['user', 'test']
              }
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <MeetingQueryModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup name="meetingQuery">
import { BasicTable, useTable, TableAction } from '@/components/Table'
import { getMeetingActionColumns, getMeetingColumns, getMeetingFormConfig } from './meeting.data'
import { PageWrapper } from '@/components/Page'

import { meetingListApi } from '@/api/service/meetingTable'
import { useModal } from '@/components/Modal'
import MeetingQueryModal from './MeetingQueryModal.vue'

const [registerModal, { openModal }] = useModal()
const [registerQueryTable, { reload, updateTableDataRecord }] = useTable({
  title: '会议室信息列表',
  api: meetingListApi,
  columns: getMeetingColumns(),
  useSearchForm: true,
  formConfig: getMeetingFormConfig(),
  /* showTableSetting: true,
  tableSetting: { fullScreen: true }, */
  showIndexColumn: false,
  rowKey: 'id',
  actionColumn: getMeetingActionColumns()
})

function handleReserve(record: Recordable) {
  //console.log(record.id)
  openModal(true, {
    isRevoke: false,
    roomId: record.id
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
