<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <template v-if="!isDelete">
      <BasicForm @register="registerForm" style="height: 40svh" />
    </template>
    <template v-else>
      {{ content }}
    </template>
  </BasicModal>
</template>
<script lang="ts" setup name="MeetingManageModal">
import { ref, computed, unref } from 'vue'
import { BasicModal, useModalInner } from '@/components/Modal'
import { BasicForm, useForm } from '@/components/Form'
import { meetingFormSchema } from './meeting.data'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { useDesign } from '@/hooks/web/useDesign'
import { createMeetingApi } from '@/api/service/createMeeting'
import { updateMeetingApi } from '@/api/service/updateMeeting'
import { deleteMeetingApi } from '@/api/service/deleteMeeting'

const emit = defineEmits(['success', 'register'])
const isUpdate = ref(false)
const isDelete = ref(false)
const rowId = ref(0)
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
  setModalProps({ confirmLoading: false })
  isUpdate.value = data?.isUpdate
  isDelete.value = data?.isDelete
  rowId.value = data.record.id
  if (!unref(isUpdate) && !unref(isDelete)) {
    resetFields()
  } else if (unref(isUpdate)) {
    setFieldsValue({
      ...data.record
    })
  } else if (unref(isDelete)) {
    content.value = '确定删除吗？'
  }
  updateSchema([])
})

const getTitle = computed(() => (unref(isUpdate) ? '编辑会议室' : unref(isDelete) ? '删除会议室' : '新增会议室'))

async function handleSubmit() {
  const values = await validate()
  if (!values && !unref(isDelete)) return
  try {
    setModalProps({ confirmLoading: true })
    //api
    if (unref(isUpdate)) {
      await updateMeetingApi({ ...values, oldId: rowId.value })
    } else if (unref(isDelete)) {
      // @ts-ignore
      await deleteMeetingApi({ id: rowId.value })
    } else {
      await createMeetingApi(values)
    }
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
