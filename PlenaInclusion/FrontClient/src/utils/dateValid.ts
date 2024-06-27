export function areDatesValid(startDate: Date, endDate: Date): boolean {
    if (!startDate || !endDate) {
        return false;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    start.setSeconds(0, 0);
    end.setSeconds(0, 0);

    return start < end;
}
