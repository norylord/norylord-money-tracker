<template>
  <div class="create-payment-type-modal">
    <h3>Список типов платежа:</h3>
    <ul class="create-payment-type-modal__list">
      <li
        v-for="paymentType of userStore.paymentsType"
        :key="paymentType.color"
        :style="{color: paymentType.color}"
        class="create-payment-type-modal__list-item"
      >
        {{ paymentType.title }}
      </li>
    </ul>
    <ui-input
      v-model="newPaymentTypeConfig.title"
      label="Введите название"
    />
    <ui-input
      v-model="newPaymentTypeConfig.color"
      type="color"
    />
    <ui-button @click="handleCreateNewPaymentType">
      Добавить
    </ui-button>
  </div>
</template>

<script lang="ts" setup>
import {useUserStore} from "~/modules/user/store/userStore";
import UiButton from "~/core/components/ui/ui-button.vue";
import UiInput from "~/core/components/ui/ui-input.vue";
import PaymentType from "~/modules/payment/model/PaymentType";
import paymentType from "~/modules/payment/model/PaymentType";

const newPaymentTypeConfig = ref({
  title: '',
  color: '',
})

const userStore = useUserStore()

const handleCreateNewPaymentType = () => {
  if (newPaymentTypeConfig.value.title === '' ||
      newPaymentTypeConfig.value.color === '') return
  const newPaymentType = new PaymentType(newPaymentTypeConfig.value.color, newPaymentTypeConfig.value.title)
  newPaymentTypeConfig.value.title = ''
  newPaymentTypeConfig.value.color = ''
  userStore.paymentsType.push(newPaymentType)
  localStorage.setItem('userPaymentsTypes', JSON.stringify(userStore.paymentsType))
}


</script>

<style lang='scss'>
.create-payment-type-modal {
  display: flex;
  gap: 20px;
  flex-direction: column;

  &__list {
    list-style: inside;

    &-item {
      list-style: inside;
    }
  }
}
</style>