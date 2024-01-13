import Payment from "~/modules/payment/model/Payment";

interface ICalendarDay {
    isCurrentMonth: boolean,
    day: number,
    payments: Payment[]

    deletePayment(paymentId: number): void

    addPayment(payment: Payment): void
}

class CalendarDay implements ICalendarDay {
    isCurrentMonth: boolean
    day: number
    payments: Payment[]


    constructor(isCurrentMonth: boolean, day: number) {
        this.day = day
        this.isCurrentMonth = isCurrentMonth
        this.payments = []
    }

    public deletePayment(paymentId: number) {
        this.payments = this.payments.filter(payment => payment.id !== paymentId)
    }

    public addPayment(payment: Payment) {
        this.payments.push(payment)
    }
}

export default CalendarDay