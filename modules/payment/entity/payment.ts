export type  TPayment = {
    id: number
    date: string,
    comment: string,
    sum: number,
    type: TPaymentType,
}
export type TPaymentType = {
    color: string,
    title: string,
}