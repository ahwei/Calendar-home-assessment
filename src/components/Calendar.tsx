import { useCalender } from '@/CalenderConext';
import dayjs, { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';
import { ZoomLevel } from '../types/calendar';
import CalendarGrid from './CalendarGrid';
import CalendarHeader from './CalendarHeader';

interface CalendarProps {
  primaryColor?: string;
  secondaryColor?: string;
}

const Calendar = ({
  primaryColor = 'bg-mint-500',
  secondaryColor = 'bg-mint-50',
}: CalendarProps) => {
  const { selectedDate, setSelectedDate } = useCalender();

  const [currentDate, setCurrentDate] = useState<Dayjs>(
    selectedDate || dayjs(),
  );
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>(ZoomLevel.Day);

  const displayDays = useMemo(() => {
    if (zoomLevel !== ZoomLevel.Day) return [];
    const startOfMonth: Dayjs = currentDate.startOf('month').startOf('week');
    const endOfMonth: Dayjs = currentDate.endOf('month').endOf('week');

    const days: Dayjs[] = [];
    let day = startOfMonth;
    while (day.isBefore(endOfMonth) || day.isSame(endOfMonth, 'day')) {
      days.push(day);
      day = day.add(1, 'day');
    }
    return days;
  }, [currentDate, zoomLevel]);

  const handleHeaderClick = () => {
    if (zoomLevel === ZoomLevel.Day) setZoomLevel(ZoomLevel.Month);
    else if (zoomLevel === ZoomLevel.Month) setZoomLevel(ZoomLevel.Year);
    else if (zoomLevel === ZoomLevel.Year) setZoomLevel(ZoomLevel.MultiYear);
    else setZoomLevel(ZoomLevel.Day);
  };

  const handlePrev = () => {
    if (zoomLevel === ZoomLevel.Day) {
      setCurrentDate((prev) => prev.subtract(1, 'month'));
    } else if (zoomLevel === ZoomLevel.Month) {
      setCurrentDate((prev) => prev.subtract(1, 'year'));
    } else if (zoomLevel === ZoomLevel.Year) {
      setCurrentDate((prev) => prev.subtract(10, 'year'));
    } else if (zoomLevel === ZoomLevel.MultiYear) {
      setCurrentDate((prev) => prev.subtract(300, 'year'));
    }
  };

  const handleNext = () => {
    if (zoomLevel === ZoomLevel.Day) {
      setCurrentDate((prev) => prev.add(1, 'month'));
    } else if (zoomLevel === ZoomLevel.Month) {
      setCurrentDate((prev) => prev.add(1, 'year'));
    } else if (zoomLevel === ZoomLevel.Year) {
      setCurrentDate((prev) => prev.add(10, 'year'));
    } else if (zoomLevel === ZoomLevel.MultiYear) {
      setCurrentDate((prev) => prev.add(300, 'year'));
    }
  };

  const handleDayClick = (date: Dayjs) => {
    if (zoomLevel === ZoomLevel.Day) setSelectedDate?.(date);
  };

  const handleMonthSelect = (month: number) => {
    setCurrentDate(currentDate.year(currentDate.year()).month(month - 1));
    setZoomLevel(ZoomLevel.Day);
  };

  const handleYearSelect = (year: number) => {
    setCurrentDate(currentDate.year(year));
    setZoomLevel(ZoomLevel.Month);
  };

  const handleMultiYearSelect = (year: number) => {
    setCurrentDate(currentDate.year(year));
    setZoomLevel(ZoomLevel.Year);
  };

  const getHeaderLabel = () => {
    if (zoomLevel === ZoomLevel.Day) return currentDate.format('YYYY-MM');
    if (zoomLevel === ZoomLevel.Month) return currentDate.format('YYYY');
    if (zoomLevel === ZoomLevel.Year) {
      const startDecade = Math.floor(currentDate.year() / 10) * 10;
      return `${startDecade}-${startDecade + 9}`;
    }

    const base = currentDate.year() - (currentDate.year() % 300);
    return `${base}-${base + 299}`;
  };

  return (
    <div className="w-[300px] mx-auto p-2 bg-white rounded-lg shadow-sm">
      <CalendarHeader
        headerLabel={getHeaderLabel()}
        onPrev={handlePrev}
        onNext={handleNext}
        onHeaderClick={handleHeaderClick}
      />

      <CalendarGrid
        state={{
          zoomLevel,
          currentDate,
          selectedDate,
          primaryColor,
          secondaryColor,
          displayDays,
        }}
        actions={{
          onDayClick: handleDayClick,
          onMonthSelect: handleMonthSelect,
          onYearSelect: handleYearSelect,
          onMultiYearSelect: handleMultiYearSelect,
        }}
      />
    </div>
  );
};

export default Calendar;
