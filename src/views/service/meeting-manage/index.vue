<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerManageTable">
      <template #toolbar>
        <a-button v-auth="['super', 'admin']" type="primary" @click="handleCreateMeeting" :loading="createLoading">添加会议室</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '编辑',
                icon: 'ic:baseline-edit',
                color: 'success',
                onClick: handleEdit.bind(null, record),
                ifShow: true,
                auth: ['super', 'admin', 'test']
              },
              {
                label: '删除',
                icon: 'ic:outline-delete-outline',
                color: 'error',
                onClick: handleDelete.bind(null, record),
                ifShow: true,
                auth: ['super', 'admin', 'test']
              }
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <MeetingManageModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup name="meetingManage">
import { ref } from 'vue'
import { BasicTable, useTable, TableAction } from '@/components/Table'
import { getMeetingActionColumns, getMeetingColumns, getMeetingFormConfig } from './meeting.data'
import { PageWrapper } from '@/components/Page'

import { meetingListApi } from '@/api/service/meetingTable'

import { useModal } from '@/components/Modal'
import MeetingManageModal from './MeetingManageModal.vue'

const createLoading = ref(false)

const [registerModal, { openModal }] = useModal()
const [registerManageTable, { reload, updateTableDataRecord }] = useTable({
  title: '会议室预约列表',
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

const handleCreateMeeting = () => {
  openModal(true, {
    isUpdate: false,
    isDelete: false
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

function handleEdit(record: Recordable) {
  openModal(true, {
    record,
    isUpdate: true,
    isDelete: false
  })
}

function handleDelete(record: Recordable) {
  openModal(true, {
    record,
    isUpdate: false,
    isDelete: true
  })
}
</script>
