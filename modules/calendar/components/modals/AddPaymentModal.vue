<template>
  <div class="add-payment-modal">
    <h4>Список платежей:</h4>
    <ul class="add-payment-modal__payments">
      <li
        v-for="payment of userStore.currentDay.payments"
        :key="payment.id"
        @click="removePayment(payment.id)"
      >
        <span :style="{color: getPaymentColor(payment.type.id)}">Тип платежа: {{ getPaymentTitle(payment.type.id)
        }} </span>|
        Сумма:
        {{ Number(payment.sum).toLocaleString("ru", {
          style: "currency",
          currency: "rub",
        })
        }}
      </li>
    </ul>

    <h4>Добавить платеж</h4>
    <div class="add-payment-modal__inputs">
      <div class="add-payment-modal__inputs-chips">
        <ui-chip
          v-for="paymentType of userStore.paymentsType"
          :key="paymentType.id"
          :color="paymentType.color"
          :is-active="paymentType.id === newPayment.selectedPayment"
          :text="paymentType.title"
          @click="newPayment.selectedPayment = paymentType.id"
        />
      </div>
      <ui-input
        v-model="newPayment.sum"
        label="Введите сумму"
        type="number"
      />
      <ui-button
        class="add-payment-modal__submit"
        @click="addPayment"
      >
        Добавить
      </ui-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import UiInput from "~/core/components/ui/ui-input.vue";
import UiButton from "~/core/components/ui/ui-button.vue";
import Payment from "~/modules/payment/model/Payment";
import PaymentType from "~/modules/payment/model/PaymentType";
import UiSelect from "~/core/components/ui/ui-select.vue";
import {useUserStore} from "~/modules/user/store/userStore";
import payment from "~/modules/payment/model/Payment";
import UiChip from "~/core/components/ui/ui-chip.vue";


const newPayment = reactive({
  sum: null,
  selectedPayment: null
})

const addPayment = () => {
  if (!newPayment.selectedPayment || !newPayment.sum) return;
  const getPayment = userStore.paymentsType.filter(item => item.id == newPayment.selectedPayment)[0]
  const payment = new Payment(newPayment.sum, getPayment)
  userStore.currentDay.payments.push(payment)
}
const removePayment = (paymentId: any) => {
  userStore.currentDay.payments = userStore.currentDay.payments.filter(item => item.id !== paymentId)
}

const userStore = useUserStore()
const avaliablePayments = computed(() => {
  return userStore.paymentsType.map(payment => {
    return {title: payment.title, value: payment.id}
  })
})

const getPaymentTitle = (paymentTypeId: number) => {
  return userStore.paymentsType.filter(item => item.id === paymentTypeId)[0].title
}
const getPaymentColor = (paymentTypeId: number) => {
  console.log(paymentTypeId)
  return userStore.paymentsType.filter(item => item.id === paymentTypeId)[0].color
}
</script>

<style lang='scss'>
.add-payment-modal {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__payments {
    margin-left: 32px;
  }

  &__inputs {
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 500px;

    &-chips {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
  }

  &__submit {
    align-self: start;
  }
}
</style>