import Calendar from '@/components/Calendar';
import dayjs from 'dayjs';
import { useState } from 'react';

const App = () => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | undefined>();

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <Calendar date={selectedDate?.toDate()} onSelect={setSelectedDate} />
        {selectedDate && (
          <div className="mt-6 text-center text-gray-700">
            Selected Date: {selectedDate.format('YYYY-MM-DD')}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
