import React, { useState, useEffect } from 'react';

const DateTimeDisplay: React.FC = () => {
  const [dateTime, setDateTime] = useState<string>(getFormattedDateTime());

  useEffect(() => {
    // Update every second (1000 milliseconds)
    const intervalId = setInterval(() => {
      setDateTime(getFormattedDateTime());
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  function getFormattedDateTime(): string {
    const currentDate = new Date();
    return currentDate.toLocaleString('en-US', {
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    });
  }

  return (
    <>
      {dateTime}
    </>
  );
};

export default DateTimeDisplay;
