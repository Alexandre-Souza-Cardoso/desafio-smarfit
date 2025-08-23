import { Injectable } from '@angular/core';
import { Location } from '../types/location.interface';

const OPENING_HOURS = {
  morning: {
    first: '06',
    last: '12'
  },
  afternoon: {
    first: '12',
    last: '18'
  },
  night: {
    first: '18',
    last: '23'
  }
};

type HOUR_INDEXES = 'morning' | 'afternoon' | 'night';

@Injectable({
  providedIn: 'root'
})
export class FilterUnitsService {

  constructor() { }
  transformWeekday(weekday: number): string {
    switch (weekday) {
      case 0:
        return 'Dom.';
      case 6:
        return 'Sáb.';
      default:
        return 'Seg. à Sex.';
    }
  }

  filterUnits(unit: Location, open_hour: string, close_hour: string): boolean {
    if (!unit.schedules) return true;

    const openHourFilter = parseInt(open_hour, 10);
    const closeHourFilter = parseInt(close_hour, 10);
    const todaysWeekday = this.transformWeekday(new Date().getDay());

    for (const schedule of unit.schedules) {
      const scheduleHour = schedule.hour;
      const scheduleWeekday = schedule.weekdays;

      if (todaysWeekday === scheduleWeekday && scheduleHour !== 'Fechada') {
        const [unitOpenHour, unitCloseHour] = scheduleHour.split(' às ');
        const unitOpenHourInt = parseInt(unitOpenHour.replace('h', ''), 10);
        const unitCloseHourInt = parseInt(unitCloseHour.replace('h', ''), 10);

        if (unitOpenHourInt <= openHourFilter && unitCloseHourInt >= closeHourFilter) {
          return true;
        }
      }
    }
    return false;
  }

  filter(results: Location[], showClosed: boolean, hour: string ){
    let intermediateResults = results;

    if (!showClosed) {
      intermediateResults = results.filter(location => location.opened === true);
    }
    if (hour) {
      const openHour = OPENING_HOURS[hour as HOUR_INDEXES].first;
      const closeHour = OPENING_HOURS[hour as HOUR_INDEXES].last;
      return intermediateResults.filter(location => this.filterUnits(location, openHour, closeHour));
    } else {
      return intermediateResults;
    }
  }
}
