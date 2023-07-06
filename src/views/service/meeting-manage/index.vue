<template>
  <BasicTable @register="registerTable">
    <template #form-custom> custom-slot</template>
    <template #headerTop>
      <Alert type="info" show-icon>
        <template #message>
          <template v-if="nonFreeCount > 0">
            <span>已预定{{ nonFreeCount }}个会议室</span>
          </template>
          <template v-else>
            <span>未预定任何会议室</span>
          </template>
        </template>
      </Alert>
    </template>
    <template #toolbar>
      <a-button v-auth="['super', 'admin']" type="primary" @click="handleCreateMeeting" :loading="addLoading">添加会议室</a-button>
      <a-button type="primary" @click="getFormValues">获取表单数据</a-button>
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
              onClick: handleEdit.bind(null, record),
              ifShow: record.status === StatusEnum.FREE,
              auth: ['super', 'admin', 'user']
            },
            {
              label: '撤销',
              icon: 'ic:baseline-arrow-back',
              color: 'warning',
              onClick: handleEdit.bind(null, record),
              ifShow: record.status !== StatusEnum.FREE,
              auth: ['super', 'admin', 'user']
            },
            {
              label: '删除',
              icon: 'ic:outline-delete-outline',
              color: 'error',
              onClick: handleDelete.bind(null, record),
              ifShow: true,
              auth: ['super', 'admin']
            }
          ]"
        />
      </template>
    </template>
  </BasicTable>
  <MeetingModal @register="registerModal" @success="handleSuccess" />
</template>
<script lang="ts" setup>
import { watchEffect, ref } from 'vue'
import { BasicTable, useTable, TableAction } from '@/components/Table'
import { getMeetingActionColumns, getMeetingColumns, getMeetingFormConfig } from './meeting.data'
import { Alert } from 'ant-design-vue'

import { meetingListApi } from '@/api/service/meetingTable'
import { StatusEnum } from '@/enums/tableEnum'

import { useModal } from '@/components/Modal'
import MeetingModal from './MeetingModal.vue'

const nonFreeCount = ref<number>(0)
const addLoading = ref(false)

const [registerModal, { openModal }] = useModal()
const [registerTable, { getForm, getDataSource, reload, updateTableDataRecord }] = useTable({
  title: '会议室信息列表',
  api: meetingListApi,
  columns: getMeetingColumns(),
  useSearchForm: true,
  formConfig: getMeetingFormConfig(),
  showTableSetting: true,
  tableSetting: { fullScreen: true },
  showIndexColumn: false,
  rowKey: 'id',
  actionColumn: getMeetingActionColumns()
})

watchEffect(async () => {
  const data = await getDataSource()
  nonFreeCount.value = data.filter((item) => item.status !== StatusEnum.FREE).length
})

const handleCreateMeeting = () => {
  openModal(true, {
    isUpdate: false
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

function getFormValues() {
  console.log(getForm().getFieldsValue())
  const statusValues = getDataSource().map((item) => item.status)
  console.log(statusValues)
  console.log(nonFreeCount.value)
}

function handleEdit(record: Recordable) {
  console.log('点击了编辑', record)
}

function handleDelete(record: Recordable) {
  console.log('点击了删除', record)
}
</script>
