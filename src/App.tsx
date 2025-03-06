import Calendar from '@/components/Calendar';
import DatePicker from '@/components/DatePicker/DatePicker';
import dayjs from 'dayjs';
import { useState } from 'react';

const App = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleCalendarSelect = (selectedDate: dayjs.Dayjs) => {
    setDate(selectedDate.toDate());
  };

  const handlePickerChange = (selectedDate: Date) => {
    setDate(selectedDate);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          <div className="w-full md:w-1/2 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-center mb-4">
              Calendar Component
            </h2>
            <div className="flex flex-col items-center">
              <Calendar date={date} onSelect={handleCalendarSelect} />
              {date && (
                <div className="mt-4 text-center text-gray-700">
                  Selected Date: {dayjs(date).format('YYYY-MM-DD')}
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/2 max-w-md mx-auto mt-8 md:mt-0">
            <h2 className="text-xl font-semibold text-center mb-4">
              DatePicker Component
            </h2>
            <div className="flex flex-col items-center">
              <div className="w-full max-w-xs">
                <DatePicker
                  value={date}
                  onChange={handlePickerChange}
                  primaryColor="bg-blue-500"
                  secondaryColor="bg-blue-50"
                  placeholder="Select a date..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
