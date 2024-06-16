import React, {
  Dispatch,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

const endOfDay = new Date();
endOfDay.setHours(23, 59, 59, 999);

const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

type DateContextType = {
  setStartDate: Dispatch<React.SetStateAction<Date>>;
  setEndDate: Dispatch<React.SetStateAction<Date>>;
  startDate: Date;
  endDate: Date;
};

const DateContext = createContext<DateContextType>({
  setStartDate: () => {},
  setEndDate: () => {},
  startDate: new Date(),
  endDate: new Date(),
});

const useDate = () => useContext(DateContext);

export const DateProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const [startDate, setStartDate] = useState(startOfToday);
  const [endDate, setEndDate] = useState(endOfDay);

  const valuedate = useMemo(
    () => ({startDate, setStartDate, endDate, setEndDate}),
    [startDate, endDate],
  );

  return (
    <DateContext.Provider value={valuedate}>{children}</DateContext.Provider>
  );
};

export {useDate, DateContext};
