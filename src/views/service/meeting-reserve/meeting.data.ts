import { BasicColumn } from '@/components/Table/src/types/table'
import { FormSchema } from '@/components/Table'

export function getMeetingColumns(): BasicColumn[] {
  return [
    {
      title: '预约ID',
      dataIndex: 'reserveId',
      fixed: 'left'
    },
    {
      title: '会议室ID',
      dataIndex: 'roomId'
    },
    {
      title: '楼名',
      dataIndex: 'buildName'
    },
    {
      title: '楼层',
      dataIndex: 'floor'
    },
    {
      title: '开始时间',
      dataIndex: 'startTime'
    },
    {
      title: '结束时间',
      dataIndex: 'endTime'
    },
    {
      title: '会议主题',
      dataIndex: 'meetingTopic'
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
