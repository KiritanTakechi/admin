<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '删除',
                icon: 'ic:outline-delete-outline',
                onClick: handleDelete.bind(null, record)
              }
            ]"
            :dropDownActions="[
              {
                label: '启用',
                popConfirm: {
                  title: '是否启用？',
                  confirm: handleOpen.bind(null, record)
                }
              }
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
import { BasicTable, useTable, BasicColumn, TableAction } from '@/components/Table'

import { demoListApi } from '@/api/demo/table'
import { getMeetingColumns } from '@/views/service/meeting-query/meeting.data'
import { meetingListApi } from '@/api/service/meetingTable'
const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    fixed: 'left',
    width: 280
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 260
  },
  {
    title: '地址',
    dataIndex: 'address'
  },
  {
    title: '编号',
    dataIndex: 'no',
    width: 300
  },
  {
    title: '开始时间',
    width: 200,
    dataIndex: 'beginTime'
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    width: 200
  }
]
const [registerTable] = useTable({
  title: 'TableAction组件及固定列示例',
  api: meetingListApi,
  columns: getMeetingColumns(),
  rowSelection: { type: 'radio' },
  bordered: true,
  actionColumn: {
    width: 160,
    title: 'Action',
    dataIndex: 'action'
    // slots: { customRender: 'action' },
  }
})
function handleDelete(record: Recordable) {
  console.log('点击了删除', record)
}
function handleOpen(record: Recordable) {
  console.log('点击了启用', record)
}
</script>
