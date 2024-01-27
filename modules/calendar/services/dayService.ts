import type {Store} from "pinia";
import type {IUserStore} from "~/modules/user/store/userStore";
import type Payment from "~/modules/payment/model/Payment";
import type {TCalendarDay} from "~/modules/calendar/entity/calendar";

interface IDayService {
    store: IUserStore

    setCurrentDay(day: TCalendarDay): void
}

export class DayService implements IDayService {

    constructor(private store: IUserStore) {
    }

    setCurrentDay(day: TCalendarDay) {
        this.store.currentDay = day
    }
}

