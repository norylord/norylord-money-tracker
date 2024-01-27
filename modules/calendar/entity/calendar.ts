import type {TPayment} from "~/modules/payment/entity/payment";

export type TCalendarGrid = {
    days: TCalendarDay[]
    id: string
}
export type TCalendarDay = {
    isCurrentMonth: boolean,
    day: number,
    payments: TPayment[]
}