import React from 'react';

function Timer() {
  const [currentTime, setCurrentTime] = useState(1);

  useEffect(() => {
    fetch('/api/time')
      .then((res) => res.json())
      .then((data) => {
        setCurrentTime(data.time);
      });
  }, []);
  return (
    <div>
      <p>The time is: {currentTime} </p>
    </div>
  );
}

export default Timer;
