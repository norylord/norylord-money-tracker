import PaymentType from "~/modules/payment/model/PaymentType";

interface IPayment {
    id: number
    date: string,
    sum: number,
    type: PaymentType,
}

class Payment implements IPayment {
    id: number
    date: string
    sum: number
    type: PaymentType

    constructor(sum: number, type: PaymentType) {
        this.id = Date.now()
        this.date = new Date().getDate().toLocaleString()
        this.sum = sum
        this.type = type
    }
}

export default Payment