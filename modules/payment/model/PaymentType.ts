type TPaymentType = {
    color: string,
    title: string,
}

class PaymentType implements TPaymentType {
    color: string
    title: string
    id: number

    constructor(color: string, title: string) {
        this.id = Date.now()
        this.color = color
        this.title = title
    }

    getTitle() {
        return this.title
    }
}

export default PaymentType