import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import Calendar from '../Calendar/Calendar';

interface DatePickerProps {
  value?: Date | string;
  onChange?: (date: Date) => void;
  placeholder?: string;
}

const DatePicker = ({
  value,
  onChange,
  placeholder = 'Select a date',
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined,
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleDateSelect = (date: Dayjs) => {
    const newDate = date.toDate();
    setSelectedDate(newDate);
    setIsOpen(false);
    onChange?.(newDate);
  };

  const handleInputClick = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
    }
  }, [value]);

  return (
    <div className="relative" ref={wrapperRef}>
      <input
        type="text"
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
        placeholder={placeholder}
        value={selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : ''}
        onClick={handleInputClick}
        readOnly
      />

      {isOpen && (
        <div className="absolute z-10 mt-1">
          <Calendar date={selectedDate} onSelect={handleDateSelect} />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
