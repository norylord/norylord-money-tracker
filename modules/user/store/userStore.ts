import {defineStore} from 'pinia'
import type {TPaymentType} from "~/modules/payment/entity/payment";
import type {TCalendarDay, TCalendarGrid} from "~/modules/calendar/entity/calendar";

export interface IUserStore {
    paymentsType: TPaymentType[],
    months: TCalendarGrid[]
    currentDay: TCalendarDay
    selectedYear: number,
    selectedMonth: number
}

export const useUserStore = defineStore({
    id: 'feedsCreateModal',
    state: (): IUserStore => ({
        paymentsType: [],
        months: [],
        currentDay: {},
        selectedYear: new Date().getFullYear(),
        selectedMonth: new Date().getMonth()
    }),
    actions: {
        addMonth(newMonth: TCalendarGrid) {
            this.months.push(newMonth)
        },
    },
    getters: {
        getCurrentMonth(state) {
            return state.months.filter(month => month.id === state.selectedMonth + '-' + state.selectedYear)[0]
        }
    }
})
