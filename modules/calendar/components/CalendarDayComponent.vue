<template>
  <div
    :class="!day.isCurrentMonth ? 'calendar-day--previous' : ''"
    class="calendar-day"
  >
    <div
      :class="!day.isCurrentMonth ? 'calendar-day-date--previous' : ''"
      class="calendar-day-date"
      @click="handleClickOnDay(day)"
    >
      <p
        class="calendar-day-date__day"
        v-text="day.day"
      />
    </div>
    <div class="calendar-day__notion-container">
      <div
        v-for="payment of getDayPaymentsColors"
        :key="payment"
        :style="{background: payment}"
        class="calendar-day__notion"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useModal} from "~/modules/modal/composables/useModal";
import {useUserStore} from "~/modules/user/store/userStore";
import {DayService} from "~/modules/calendar/services/dayService";
import type {TCalendarDay} from "~/modules/calendar/entity/calendar";

const userStore = useUserStore()
const dayService = new DayService(userStore)

interface IProps {
  day: TCalendarDay
}

const props = defineProps<IProps>()

const {openAddPaymentModal} = useModal()

const handleClickOnDay = () => {
  if (!props.day.isCurrentMonth) return
  dayService.setCurrentDay(props.day)
  openAddPaymentModal()
}

const getDayPaymentsColors = computed(() => {
  const colors: string[] = []
  props.day.payments.forEach(item => {
    if (!colors.includes(item.type.color)) {
      colors.push(item.type.color)
    }
  })
  return colors
})
</script>

<style lang='scss'>
.calendar-day {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  font-weight: 300;

  &-date {
    width: 100%;
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    transition: .2s ease-in-out all;
    user-select: none;

    &__day {
      font-size: clamp(24px, 2vw, 32px);
    }

    &--previous {
      background: transparent;
      font-weight: 400;
      cursor: default;

      &:hover {
        transform: none;
      }
    }

    &:hover {
      transform: scale(1.2);
    }
  }

  &--previous {
    opacity: .3;
  }

  &__notion {
    width: 6px;
    height: 6px;
    border-radius: 999px;

    &-container {
      position: absolute;
      bottom: 25%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }
  }
}

</style>