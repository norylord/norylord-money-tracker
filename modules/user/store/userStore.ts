import {defineStore} from 'pinia'

import type PaymentType from "~/modules/payment/model/PaymentType";
import type CalendarGrid from "~/modules/calendar/model/CalendarGrid";
import type CalendarDay from "~/modules/calendar/model/CalendarDay";

interface IStore {
    paymentsType: PaymentType[],
    months: CalendarGrid[]
    currentDay: CalendarDay
    selectedYear: number,
    selectedMonth: number
}

export const useUserStore = defineStore({
    id: 'feedsCreateModal',
    state: (): IStore => ({
        paymentsType: [],
        months: [],
        currentDay: {},
        selectedYear: new Date().getFullYear(),
        selectedMonth: new Date().getMonth()
    }),
    actions: {},
    getters: {
        getCurrentMonth(state) {
            return state.months.filter(month => month.id === state.selectedMonth + '-' + state.selectedYear)[0]
        }
    }
})
