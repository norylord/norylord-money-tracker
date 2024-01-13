import AddPaymentModal from "~/modules/calendar/components/modals/AddPaymentModal.vue";
import CreatePaymentTypeModal from "~/modules/payment/modals/CreatePaymentTypeModal.vue";

export const addPaymentModalScheme = {
    component: AddPaymentModal,
    title: 'Добавление платежа',
    day: null
}
export const createPaymentTypeModal = {
    component: CreatePaymentTypeModal,
    title: 'Создание типа платежа',
}