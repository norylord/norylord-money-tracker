import {addPaymentModalScheme, createPaymentTypeModal} from "~/modules/modal/schemes/modalSchemes";
import type CalendarDay from "~/modules/calendar/model/CalendarDay";
import type {ShallowRef} from "vue";

interface IModalScheme {
    title: string,
    component: any
}

const isActive = ref(false)
const currentScheme = ref<IModalScheme>({title: '', component: null})

export const useModal = () => {

    const openAddPaymentModal = () => {
        isActive.value = true
        currentScheme.value = addPaymentModalScheme as IModalScheme
    }
    const openCreatePaymentTypeModal = () => {
        isActive.value = true
        currentScheme.value = createPaymentTypeModal
    }
    const toggleModal = () => {
        isActive.value = !isActive.value
    }

    return {
        isActive,
        currentScheme,

        openCreatePaymentTypeModal,
        openAddPaymentModal,
        toggleModal,
    }
}