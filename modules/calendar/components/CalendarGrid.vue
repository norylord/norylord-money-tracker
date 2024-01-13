<template>
  <div class="calendar-grid">
    <div
      v-for="weekday of weekDays"
      :key="weekday"
      class="calendar-grid__weekday"
    >
      {{ checkWidth ? weekday.slice(0, 1) : weekday }}
    </div>
    <CalendarDayComponent
      v-for="(day, index) of currentMonthDays ?? []"
      :key="index"
      :day="day"
    />
  </div>
</template>

<script lang="ts" setup>
import CalendarDayComponent from "~/modules/calendar/components/CalendarDayComponent.vue";
import CalendarDay from "~/modules/calendar/model/CalendarDay";
import {useUserStore} from "~/modules/user/store/userStore";
import CalendarGrid from "~/modules/calendar/model/CalendarGrid";

interface IProps {
  selectedYear: number
  selectedMonth: number
}

const props = defineProps<IProps>()

const userStore = useUserStore()

const weekDays = ['Понедельник', "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]

const checkWidth = computed(() => {
  if (process.client) {
    return window.innerWidth < 700
  }
})


const daysInMonth = (month: number) => {
  return new Date(props.selectedYear, month, 0).getDate();
}

const monthDaysCount = ref(0)
const calculatePreviousMonthDays = () => {
  let firstDayOfNextMonth = new Date(props.selectedYear, props.selectedMonth, 1).getDay()
  let difference = daysInMonth(props.selectedMonth) - firstDayOfNextMonth + 1
  const prevMonthDays = []
  for (let i = daysInMonth(props.selectedMonth); i > difference; i--) {
    prevMonthDays.unshift(new CalendarDay(false, i))
  }
  monthDaysCount.value += prevMonthDays.length
  return prevMonthDays
}
const calculateCurrentMonthDays = () => {
  const currMonthDays = []
  for (let i = 1; i <= daysInMonth(props.selectedMonth + 1); i++) {
    currMonthDays.push(new CalendarDay(true, i))
  }
  monthDaysCount.value += currMonthDays.length
  return currMonthDays
}
const calculateNextMonthDays = () => {
  const nextMonthDays = []
  console.log(monthDaysCount.value)
  for (let i = 1; i <= 35 - monthDaysCount.value; i++) {
    nextMonthDays.push(new CalendarDay(false, i))
  }
  monthDaysCount.value = 0
  return nextMonthDays
}

watch(() => props.selectedMonth, () => {
  if (!userStore.months.filter(month => month.id === props.selectedMonth + '-' + props.selectedYear).length) {
    userStore.months.push(
        new CalendarGrid(
            props.selectedMonth,
            props.selectedYear,
            calculatePreviousMonthDays(),
            calculateCurrentMonthDays(),
            calculateNextMonthDays())
    )
  }
})

onMounted(() => {
  if (!userStore.months.filter(month => month.id === props.selectedMonth + '-' + props.selectedYear).length) {
    userStore.months.push(
        new CalendarGrid(
            props.selectedMonth,
            props.selectedYear,
            calculatePreviousMonthDays(),
            calculateCurrentMonthDays(),
            calculateNextMonthDays())
    )
  }
})

const currentMonthDays = computed(() => {
  if (userStore.getCurrentMonth)
    return userStore.getCurrentMonth.days
  return []
})


</script>

<style lang='scss'>
.calendar-grid {
  width: 100%;
  margin: 0 auto;
  padding: 0 clamp(12px, 1vw, 32px);
  display: grid;
  grid: 30px repeat(5, 1fr) / repeat(7, 1fr);
  gap: 4px;
  background: transparent;
  border-radius: 16px;

  &__weekday {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
  }
}

@media screen and (max-width: 700px) {
  .calendar-grid {
    &__weekday {
      font-size: 36px;
    }
  }
}
</style>