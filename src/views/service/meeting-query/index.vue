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
      <a-button type="primary" @click="getFormValues">获取表单数据</a-button>
    </template>
    <template #action="{ record }">
      <TableAction
        :actions="[
          {
            label: '编辑',
            onClick: handleEdit.bind(null, record)
            /*auth: 'other' // 根据权限控制是否显示: 无权限，不显示*/
          },
          {
            label: '删除',
            icon: 'ic:outline-delete-outline',
            onClick: handleDelete.bind(null, record)
            /*auth: 'super' // 根据权限控制是否显示: 有权限，会显示*/
          }
        ]"
      />
    </template>
  </BasicTable>
</template>
<script lang="ts" setup>
import { watchEffect, ref } from 'vue'
import { BasicTable, useTable, TableAction } from '@/components/Table'
import { getMeetingColumns, getMeetingFormConfig } from './data'
import { Alert } from 'ant-design-vue'

import { meetingListApi } from '@/api/service/meetingTable'
import { StatusEnum } from '@/enums/tableEnum'

const nonFreeCount = ref<number>(0)
const [registerTable, { getForm, getDataSource }] = useTable({
  title: '开启搜索区域',
  api: meetingListApi,
  columns: getMeetingColumns(),
  useSearchForm: true,
  formConfig: getMeetingFormConfig(),
  showTableSetting: true,
  tableSetting: { fullScreen: true },
  showIndexColumn: false,
  rowKey: 'id',
  actionColumn: {
    width: 120,
    title: '操作',
    dataIndex: 'action'
    // slots: { customRender: 'action' },
  }
})

watchEffect(async () => {
  const data = await getDataSource()
  nonFreeCount.value = data.filter((item) => item.status !== StatusEnum.FREE).length
})

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
