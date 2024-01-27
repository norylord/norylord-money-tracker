import type {Store} from "pinia";
import type {IUserStore} from "~/modules/user/store/userStore";
import type Payment from "~/modules/payment/model/Payment";
import type {TPayment} from "~/modules/payment/entity/payment";

interface IPaymentsService {
    store: IUserStore

    deletePaymentFromCurrentDay(paymentId: number): void

    addPaymentToCurrentDay(payment: Payment): void
}

export class PaymentsService implements IPaymentsService {

    constructor(private store: IUserStore) {
    }

    getPaymentsType = () => {
        return this.store.paymentsType
    }
    getCurrentDay = () => {
        return this.store.currentDay
    }
    addPaymentToCurrentDay = (payment: TPayment) => {
        this.store.currentDay.payments.push(payment)
    }
    deletePaymentFromCurrentDay = (paymentId: number) => {
        this.store.currentDay.payments = this.store.currentDay.payments.filter(v => v.id !== paymentId)
    }
    removePaymentFromCurrentDay = (paymentId: number) => {
        this.store.currentDay.payments = this.store.currentDay.payments.filter(item => item.id !== paymentId)
    }
    getAvailablePayments = (paymentId: number) => {
        this.store.currentDay.payments = this.store.currentDay.payments.filter(item => item.id !== paymentId)
    }

    getPayment = (paymentTypeId: number) => {
        return this.store.paymentsType.filter(item => item.id === paymentTypeId)[0]
    }
}

