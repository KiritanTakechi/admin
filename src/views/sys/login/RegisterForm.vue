<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="account" class="enter-x">
        <Input class="fix-auto-fill" size="large" v-model:value="formData.account" :placeholder="t('sys.login.userName')" />
      </FormItem>
      <FormItem name="password" class="enter-x">
        <StrengthMeter size="large" v-model:value="formData.password" :placeholder="t('sys.login.password')" />
      </FormItem>
      <FormItem name="confirmPassword" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.confirmPassword"
          :placeholder="t('sys.login.confirmPassword')"
        />
      </FormItem>

      <Button type="primary" class="enter-x" size="large" block @click="handleRegister" :loading="loading">
        {{ t('sys.login.registerButton') }}
      </Button>
      <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </Button>
    </Form>
  </template>
</template>
<script lang="ts" setup>
import { reactive, ref, unref, computed } from 'vue'
import LoginFormTitle from './LoginFormTitle.vue'
import { Form, Input, Button } from 'ant-design-vue'
import { StrengthMeter } from '@/components/StrengthMeter'
import { useI18n } from '@/hooks/web/useI18n'
import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin'
import { useMessage } from '@/hooks/web/useMessage'
import { useDesign } from '@/hooks/web/useDesign'
import { useUserStore } from '@/store/modules/user'

const FormItem = Form.Item
const InputPassword = Input.Password
const { t } = useI18n()
const { handleBackLogin, getLoginState } = useLoginState()

const formRef = ref()
const loading = ref(false)

const formData = reactive({
  account: '',
  password: '',
  confirmPassword: '',
  mobile: '',
  sms: '',
  policy: false
})

const { getFormRules } = useFormRules(formData)
const { validForm } = useFormValid(formRef)
const { notification, createErrorModal } = useMessage()
const { prefixCls } = useDesign('login')
const userStore = useUserStore()

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER)

async function handleRegister() {
  const data = await validForm()
  if (!data) return
  try {
    loading.value = true
    const userInfo = await userStore.register({
      password: data.password,
      username: data.account,
      mode: 'none' //不要默认的错误提示
    })
    if (userInfo) {
      notification.success({
        message: t('sys.login.registerSuccessTitle'),
        description: `${t('sys.login.registerSuccessDesc')}: ${userInfo.realName}`,
        duration: 3
      })
    }
  } catch (error) {
    createErrorModal({
      title: t('sys.api.errorTip'),
      content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
      getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body
    })
  } finally {
    loading.value = false
  }
}
</script>
