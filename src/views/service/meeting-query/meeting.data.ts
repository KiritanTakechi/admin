import { BasicColumn } from '@/components/Table/src/types/table'
import { FormProps, FormSchema } from '@/components/Table'
import { StatusEnum } from '@/enums/tableEnum'

const statusValueMap = new Map([
  [StatusEnum.APPROVED, '同意'],
  [StatusEnum.REVIEWING, '占用'],
  [StatusEnum.FREE, '空闲']
])

function getStatusValue(status) {
  return statusValueMap.get(status) || '未知'
}

export function getMeetingColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 100
    },
    {
      title: '楼名',
      dataIndex: 'buildName',
      width: 160
    },
    {
      title: '楼层',
      dataIndex: 'floor'
    },
    {
      title: '面积',
      dataIndex: 'area'
    },
    {
      title: '座位数',
      dataIndex: 'capacity'
    },
    {
      title: '状态',
      dataIndex: 'status',
      customRender: ({ text }) => getStatusValue(text)
    }
  ]
}

export function getMeetingActionColumns(): BasicColumn {
  return {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 200
    // slots: { customRender: 'action' }
  }
}

export function getMeetingFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    model: {
      queryMode: 'id',
      value: ''
    },
    schemas: [
      {
        field: `queryMode`,
        label: `查询模式`,
        component: 'Select',
        defaultValue: 'id',
        componentProps: {
          options: [
            { label: 'ID', value: 'id' },
            { label: '楼名', value: 'buildName' }
          ]
        },
        colProps: {
          xl: 12,
          xxl: 8
        }
      },
      {
        field: `value`,
        label: `值`,
        component: 'Input',
        componentProps: ({ formModel }) => {
          return {
            placeholder: formModel?.queryMode === 'id' ? '请输入数字ID' : '请输入楼名',
            maxlength: 32
          }
        },
        dynamicRules({ model }) {
          if (model?.queryMode === 'id') {
            return [
              {
                validator: (_, value) => {
                  if (isNaN(Number(value))) {
                    return Promise.reject('请输入数字！')
                  }
                  if (value.length > 16) {
                    return Promise.reject('输入长度不能超过16！')
                  }
                  return Promise.resolve()
                },
                trigger: 'change'
              }
            ]
          } else {
            return [{ required: true, message: '请输入楼名', trigger: 'blur' }]
          }
        },
        colProps: {
          xl: 12,
          xxl: 8
        }
      }
    ]
  }
}

export function meetingFormSchema(): FormSchema[] {
  return [
    {
      field: '[startTime, endTime]',
      label: '会议时间',
      component: 'RangePicker',
      required: true,
      componentProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
        placeholder: ['开始时间', '结束时间'],
        showTime: { format: 'HH:mm:ss' }
      }
    },
    {
      field: 'meetingTopic',
      label: '会议主题',
      component: 'InputTextArea',
      required: false
    }
  ]
}
