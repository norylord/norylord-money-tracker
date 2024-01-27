type TCalendarGrid = {
    selectedMonth: string | number,
    selectedYear: string | number,
}

export const useCalendarGrid = (grid: TCalendarGrid) => {
    const weekDays = ['Понедельник', "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
    const {selectedMonth, selectedYear} = toRefs(grid)

    const calendar = computed(() => {
        return [...previousMonthDays.value, ...currentMonthDays.value, ...nextMonthDays.value]
    })

    const daysInMonth = (month: number) => {
        return new Date(selectedYear.value, month, 0).getDate();
    }

    const createDay = (isCurrentMonth: boolean, day: number) => {
        return {
            isCurrentMonth,
            day,
            payments: []
        }
    }

    const previousMonthDays = computed(() => {
        let firstDayOfNextMonth = new Date(selectedYear.value, selectedMonth, 1).getDay()
        let difference = daysInMonth(selectedMonth.value) - firstDayOfNextMonth + 1
        const prevMonthDays = []
        for (let i = daysInMonth(selectedMonth.value); i > difference; i--) {
            prevMonthDays.unshift(createDay(false, i))
        }
        return prevMonthDays
    })
    const currentMonthDays = computed(() => {
        const currMonthDays = []
        for (let i = 1; i <= daysInMonth(selectedMonth.value + 1); i++) {
            currMonthDays.push(createDay(true, i))
        }
        return currMonthDays
    })
    const nextMonthDays = computed(() => {
        const nextMonthDays = []
        for (let i = 1; i <= 35 - currentMonthDays.value.length + previousMonthDays.value.length; i++) {
            nextMonthDays.push(createDay(false, i))
        }
        return nextMonthDays
    })
    return {calendar, weekDays}
}