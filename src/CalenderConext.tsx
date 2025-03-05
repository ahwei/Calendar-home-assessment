import { Dayjs } from 'dayjs';
import { createContext, ReactNode, useContext, useState } from 'react';

type CalenderContextType = {
  selectedDate: Dayjs | undefined;
  setSelectedDate: (date: Dayjs | undefined) => void;
};

export const CalenderContext = createContext<CalenderContextType | undefined>(
  undefined,
);

type CalenderProviderProps = {
  children: ReactNode;
};

export const CalenderProvider = ({ children }: CalenderProviderProps) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | undefined>();

  return (
    <CalenderContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </CalenderContext.Provider>
  );
};

export const useCalender = () => {
  const context = useContext(CalenderContext);
  if (!context) {
    throw new Error(
      'useCalenderContext must be used within a CalenderProvider',
    );
  }
  return context;
};
