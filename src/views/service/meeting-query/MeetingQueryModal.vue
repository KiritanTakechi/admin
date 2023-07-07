<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <template v-if="!isRevoke">
      <BasicForm @register="registerForm" style="height: 40svh" />
    </template>
    <template v-else>
      {{ content }}
    </template>
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
import { revokeMeetingApi } from '@/api/service/revokeMeeting'

const emit = defineEmits(['success', 'register'])
const isRevoke = ref(false)
const roomId = ref(0)
const content = ref('')

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
  isRevoke.value = !!data?.isRevoke
  roomId.value = data?.roomId

  if (unref(isRevoke)) {
    content.value = '确定撤销吗？'
  } else {
    resetFields()
    updateSchema([])
  }
  setModalProps({ confirmLoading: false })
})

const getTitle = computed(() => (!unref(isRevoke) ? '预约会议室' : '撤销会议室'))

async function handleSubmit() {
  let values
  if (unref(isRevoke)) {
  } else {
    const data = await validate()
    let { ['[startTime, endTime]']: timeRange, ...rest } = data
    let [proxyStartTime, proxyEndTime] = timeRange || []
    let startTime = proxyStartTime.$d
    let endTime = proxyEndTime.$d
    values = { ...rest, startTime, endTime }
    if (!values) return
  }
  try {
    setModalProps({ confirmLoading: true })
    //api
    if (unref(isRevoke)) {
      await revokeMeetingApi({ roomId: roomId.value })
    } else {
      await reserveMeetingApi({ ...values, roomId: roomId.value })
    }
    closeModal()
    emit('success', { isRevoke: unref(isRevoke), values: { ...values, id: roomId.value } })
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
