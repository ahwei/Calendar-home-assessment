import { ZoomLevel } from '@/types/calendar';
import dayjs, { Dayjs } from 'dayjs';

interface CalendarGridState {
  zoomLevel: ZoomLevel;
  currentDate: Dayjs;
  selectedDate?: Dayjs;
  primaryColor: string;
  secondaryColor: string;
  displayDays: Dayjs[];
}

interface CalendarGridActions {
  onDayClick: (date: Dayjs) => void;
  onMonthSelect: (month: number) => void;
  onYearSelect: (year: number) => void;
}

interface CalendarGridProps {
  state: CalendarGridState;
  actions: CalendarGridActions;
}

const CalendarGrid = ({ state, actions }: CalendarGridProps) => {
  const { zoomLevel, currentDate, selectedDate, primaryColor, displayDays } =
    state;
  const { onDayClick, onMonthSelect, onYearSelect } = actions;

  if (zoomLevel === ZoomLevel.Day) {
    return (
      <>
        <div className="grid grid-cols-7 text-sm font-medium text-gray-600 mb-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="text-center py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {displayDays.map((day) => (
            <div
              key={day.format('YYYY-MM-DD')}
              onClick={() => onDayClick(day)}
              className={`
                aspect-square flex items-center justify-center rounded-full
                transition-colors duration-200 cursor-pointer
                ${
                  selectedDate?.isSame(day, 'day')
                    ? `${primaryColor} text-white font-medium`
                    : day.isSame(dayjs(), 'day')
                    ? `text-red-500 font-medium`
                    : day.isSame(currentDate, 'month')
                    ? 'hover:bg-gray-100'
                    : 'text-gray-400 hover:bg-gray-50'
                }
              `}
            >
              {day.date()}
            </div>
          ))}
        </div>
      </>
    );
  }

  if (zoomLevel === ZoomLevel.Month) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return (
      <div className="grid grid-cols-4 gap-4 text-xs">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
          <div
            key={m}
            onClick={() => onMonthSelect(m)}
            className={`py-2 text-center rounded-lg cursor-pointer transition-colors duration-200 ${
              m === currentDate.month() + 1
                ? `${primaryColor} text-white font-medium`
                : 'hover:bg-gray-100'
            }`}
          >
            {monthNames[m - 1]}
          </div>
        ))}
      </div>
    );
  }

  if (zoomLevel === ZoomLevel.Year) {
    const startDecade = Math.floor(currentDate.year() / 10) * 10;
    return (
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 10 }, (_, i) => startDecade + i).map((yr) => (
          <div
            key={yr}
            onClick={() => onYearSelect(yr)}
            className={`py-2 text-center rounded-lg cursor-pointer transition-colors duration-200 ${
              yr === currentDate.year()
                ? `${primaryColor} text-white font-medium`
                : 'hover:bg-gray-100'
            }`}
          >
            {yr}
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default CalendarGrid;
