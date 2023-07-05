import { BasicColumn } from '/@/components/Table/src/types/table'
import { FormProps, FormSchema } from '/@/components/Table'
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 200
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 150,
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' }
      ]
    },
    {
      title: '地址',
      dataIndex: 'address'
    },
    {
      title: '编号',
      dataIndex: 'no',
      width: 150,
      sorter: true,
      defaultHidden: true
    },
    {
      title: '开始时间',
      width: 150,
      sorter: true,
      dataIndex: 'beginTime'
    },
    {
      title: '结束时间',
      width: 150,
      sorter: true,
      dataIndex: 'endTime'
    }
  ]
}

export const getAdvanceSchema = (itemNumber = 6): FormSchema[] => {
  const arr: any = []
  for (let index = 0; index < itemNumber; index++) {
    arr.push({
      field: `field${index}`,
      label: `字段${index}`,
      component: 'Input',
      colProps: {
        xl: 12,
        xxl: 8
      }
    })
  }
  return arr
}
export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      ...getAdvanceSchema(5),
      {
        field: `field11`,
        label: `Slot示例`,
        component: 'Select',
        slot: 'custom',
        colProps: {
          xl: 12,
          xxl: 8
        }
      }
    ]
  }
}
