<template>
  <div
    id="calendar-grid"
    class="calendar-grid"
  >
    <div
      v-for="weekday of weekDays"
      :key="weekday"
      class="calendar-grid__weekday"
    >
      {{ checkWidth ? weekday.slice(0, 1) : weekday }}
    </div>
    <CalendarDayComponent
      v-for="(day, index) of calendar ?? []"
      :key="index"
      :day="day"
    />
  </div>
</template>

<script lang="ts" setup>
import {useCalendarGrid} from "~/modules/calendar/composables/useCalendarGrid";
import CalendarDayComponent from "~/modules/calendar/components/CalendarDayComponent.vue";

interface IProps {
  selectedYear: number
  selectedMonth: number
}

const props = defineProps<IProps>()

const checkWidth = computed(() => {
  if (process.client) {
    return window.innerWidth < 700
  }
})

const {calendar, weekDays} = useCalendarGrid(props)
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