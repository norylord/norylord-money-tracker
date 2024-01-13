import type CalendarDay from "~/modules/calendar/model/CalendarDay";

const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
]

interface ICalendarGrid {
    days: CalendarDay[]
    id: string
}

class CalendarGrid implements ICalendarGrid {
    days: CalendarDay[]
    id: string

    constructor(month: string | number, year: string | number, previousDays: CalendarDay[], currentDays: CalendarDay[], nextDays: CalendarDay[]) {
        this.id = month + '-' + year
        this.days = [...previousDays, ...currentDays, ...nextDays];
    }

}

export default CalendarGrid