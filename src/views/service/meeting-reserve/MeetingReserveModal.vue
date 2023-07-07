<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    {{ content }}
  </BasicModal>
</template>
<script lang="ts" setup name="MeetingReserveModal">
import { ref, computed } from 'vue'
import { BasicModal, useModalInner } from '@/components/Modal'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { useDesign } from '@/hooks/web/useDesign'
import { revokeMeetingApi } from '@/api/service/revokeMeeting'

const emit = defineEmits(['success', 'register'])
const reserveId = ref(0)
const content = ref('')

const { t } = useI18n()
const { createErrorModal } = useMessage()
const { prefixCls } = useDesign('createMeeting')

const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  reserveId.value = data?.reserveId

  content.value = '确定撤销吗？'
  setModalProps({ confirmLoading: false })
})

const getTitle = computed(() => '撤销会议室')

async function handleSubmit() {
  try {
    setModalProps({ confirmLoading: true })
    // @ts-ignore
    await revokeMeetingApi({ reserveId: reserveId.value })
    closeModal()
    emit('success', { values: { id: reserveId.value } })
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
