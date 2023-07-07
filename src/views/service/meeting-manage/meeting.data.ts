import { BasicColumn } from '@/components/Table/src/types/table'
import { FormProps, FormSchema } from '@/components/Table'

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
    }
  ]
}

export function getMeetingActionColumns(): BasicColumn {
  return {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 200
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
      field: 'id',
      label: 'ID',
      component: 'InputNumber',
      componentProps: () => {
        return {
          placeholder: '请输入（无输入则自增）',
          maxlength: 32
        }
      },
      dynamicRules() {
        return [
          {
            required: false,
            validator: (_, value) => {
              if (!value) {
                return Promise.resolve()
              }
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
      }
    },
    {
      field: 'buildName',
      label: '楼名',
      component: 'Input',
      required: true,
      componentProps: () => {
        return {
          maxlength: 32
        }
      }
      /* dynamicRules() {
        return [
          {
            required: true,
            validator: (_, value) => {
              if (value.length > 16) {
                return Promise.reject('输入长度不能超过16！')
              }
              return Promise.resolve()
            },
            trigger: 'change'
          }
        ]
      } */
    },
    {
      field: 'floor',
      label: '楼层',
      component: 'InputNumber',
      required: true,
      componentProps: () => {
        return {
          maxlength: 32
        }
      },
      dynamicRules() {
        return [
          {
            required: true,
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
      }
    },
    {
      field: 'area',
      label: '面积',
      component: 'InputNumber',
      required: true,
      componentProps: () => {
        return {
          maxlength: 32
        }
      },
      dynamicRules() {
        return [
          {
            required: true,
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
      }
    },
    {
      field: 'capacity',
      label: '座位数',
      component: 'InputNumber',
      required: true,
      componentProps: () => {
        return {
          maxlength: 32
        }
      },
      dynamicRules() {
        return [
          {
            required: true,
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
      }
    }
  ]
}
