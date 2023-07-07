<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" style="height: 40svh" />
  </BasicModal>
</template>
<script lang="ts" setup name="MeetingQueryModal">
import { ref, computed, unref } from 'vue'
import { BasicModal, useModalInner } from '@/components/Modal'
import { BasicForm, useForm } from '@/components/Form'
import { meetingFormSchema } from './meeting.data'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { useDesign } from '@/hooks/web/useDesign'
import { reserveMeetingApi } from '@/api/service/reserveMeeting'

const emit = defineEmits(['success', 'register'])
const isUpdate = ref(true)
const roomId = ref(0)
const rowId = ref('')

const { t } = useI18n()
const { createErrorModal } = useMessage()
const { prefixCls } = useDesign('createMeeting')

const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
  labelWidth: 100,
  baseColProps: { span: 24 },
  schemas: meetingFormSchema(),
  showActionButtonGroup: false,
  actionColOptions: {
    span: 23
  }
})

const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  resetFields()
  setModalProps({ confirmLoading: false })
  isUpdate.value = !!data?.isUpdate
  roomId.value = data?.roomId

  if (unref(isUpdate)) {
    rowId.value = data.record.id
    setFieldsValue({
      ...data.record
    })
  }
  updateSchema([])
})

const getTitle = computed(() => (!unref(isUpdate) ? '预约会议室' : '撤销会议室'))

async function handleSubmit() {
  const data = await validate()
  let { ['[startTime, endTime]']: timeRange, ...rest } = data
  let [proxyStartTime, proxyEndTime] = timeRange || []
  let startTime = proxyStartTime.$d
  let endTime = proxyEndTime.$d
  let values = { ...rest, startTime, endTime }
  values.roomId = roomId.value
  //console.log(values)
  if (!values) return
  try {
    setModalProps({ confirmLoading: true })
    //api
    await reserveMeetingApi(values)
    closeModal()
    emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } })
  } catch (error) {
    createErrorModal({
      title: t('sys.api.errorTip'),
      content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
      getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body
    })
  } finally {
    setModalProps({ confirmLoading: false })
  }
}
</script>
