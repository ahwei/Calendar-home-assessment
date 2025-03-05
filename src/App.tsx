import Calendar from '@/components/Calendar';
import { CalenderProvider, useCalender } from './CalenderConext';

const CalendarContent = () => {
  const { selectedDate } = useCalender();

  return (
    <div className="container mx-auto px-4">
      <Calendar />
      {selectedDate && (
        <div className="mt-6 text-center text-gray-700">
          Selected Date: {selectedDate.format('YYYY-MM-DD')}
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <CalenderProvider>
      <div className="min-h-screen bg-gray-100 py-12">
        <CalendarContent />
      </div>
    </CalenderProvider>
  );
};

export default App;
