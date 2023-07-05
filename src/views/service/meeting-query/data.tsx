import { BasicColumn } from '/@/components/Table/src/types/table'
import { FormProps } from '/@/components/Table'
import { StatusEnum } from '@/enums/tableEnum'

const statusValueMap = {
  [StatusEnum.APPROVED]: '同意',
  [StatusEnum.REJECTED]: '拒绝',
  [StatusEnum.REVIEWING]: '审核中',
  [StatusEnum.FREE]: '空闲'
}
export function getMeetingColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 150
    },
    {
      title: '楼名',
      dataIndex: 'buildName',
      fixed: 'left',
      width: 200
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
      customRender: ({ text }) => statusValueMap[text]
    }
  ]
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
