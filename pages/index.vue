<template>
  <div class="calendar">
    <div class="calendar__header">
      <h1 class="calendar__header-month">
        {{ currentMonthName }} <span class="calendar__header-year">{{ userStore.selectedYear }}</span>
      </h1>
      <p>
        Траты в текущем месяце: {{ monthPaymentsSum.toLocaleString("ru", {
          style: "currency",
          currency: "rub",
        }) }}
      </p>
      <div class="calendar__header-actions">
        <ui-button
          :icon="darkMode ? 'sun' : 'moon'"
          @click="toggleTheme"
        />
        <ui-button
          icon="settings"
          @click="openCreatePaymentTypeModal"
        />
        <ui-button @click="userStore.selectedMonth -= 1">
          &laquo;
        </ui-button>
        <ui-button @click="userStore.selectedMonth += 1">
          &raquo;
        </ui-button>
      </div>
    </div>
    <CalendarGrid
      :selected-month="userStore.selectedMonth"
      :selected-year=" userStore.selectedYear"
    />
    <CustomModal title="Добавление трат" />
  </div>
</template>

<script lang="ts" setup>
import CalendarGrid from "~/modules/calendar/components/CalendarGrid.vue";
import UiButton from "~/core/components/ui/ui-button.vue";
import CustomModal from "~/modules/modal/components/CustomModal.vue";
import {useTheme} from "~/composables/useTheme";
import {useModal} from "~/modules/modal/composables/useModal";
import {useUserStore} from "~/modules/user/store/userStore";

const userStore = useUserStore()

const date = ref(new Date(userStore.selectedYear, userStore.selectedMonth));  // 2009-11-10
const currentMonthName = ref(date.value.toLocaleString('default', {month: 'long'}));

watch(() => userStore.selectedMonth, () => {
  if (userStore.selectedMonth === 12) {
    userStore.selectedYear += 1
    userStore.selectedMonth = 0
  } else if (userStore.selectedMonth === -1) {
    userStore.selectedMonth = 11
    userStore.selectedYear -= 1
  }
  const date = new Date(userStore.selectedYear, userStore.selectedMonth)
  currentMonthName.value = date.toLocaleString('default', {month: "long"})
})

const {toggleTheme, darkMode} = useTheme()

const {openCreatePaymentTypeModal} = useModal()

onMounted(() => {
  if (process.client) {
    if (!JSON.parse(localStorage.getItem('darkMode') as string)) toggleTheme()
    if (JSON.parse(localStorage.getItem('userPaymentsTypes') as string)) userStore.paymentsType = JSON.parse(localStorage.getItem('userPaymentsTypes') as string)
    if (JSON.parse(localStorage.getItem('userMonths') as string)) userStore.months = JSON.parse(localStorage.getItem('userMonths') as string)
  }
})

watch(() => userStore.months, () => {
  localStorage.setItem('userMonths', JSON.stringify(userStore.months))
}, {deep: true})

const monthPaymentsSum = computed(() => {
  let result = 0
  if (userStore.getCurrentMonth)
    userStore.getCurrentMonth.days.forEach(day => {
      day.payments.forEach(payment => result += Number(payment.sum))
    })
  return result
})
</script>

<style lang='scss'>
.calendar {
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content 1fr;
  height: 100%;

  &__header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
    padding: 12px 32px;
    align-items: center;
    background: transparent;
    border-radius: 16px;
    margin-bottom: 24px;

    &-month {
      &:first-letter {
        text-transform: uppercase;
      }
    }

    &-year {
      opacity: 0.3;
      font-weight: 400;
    }

    &-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    &-settings {
      padding: 9px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      background: $text-primary;
    }
  }
}
</style>