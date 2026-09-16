import { useEffect, useState } from 'react';

const TEN_MINUTES_IN_SECONDS = 10 * 60;
const DEADLINE_STORAGE_KEY = 'guild-breaker:countdown-deadline';

/**
 * Reads (or creates) the contest deadline from localStorage so refreshing
 * the page doesn't give anyone extra time. Once a deadline exists it is
 * never replaced, even after it has passed — time's up means time's up.
 */
function getOrCreateDeadline(): number {
  const storedDeadline = localStorage.getItem(DEADLINE_STORAGE_KEY);
  const parsedDeadline = storedDeadline ? Number(storedDeadline) : NaN;

  if (!Number.isNaN(parsedDeadline)) {
    return parsedDeadline;
  }

  const freshDeadline = Date.now() + TEN_MINUTES_IN_SECONDS * 1000;
  localStorage.setItem(DEADLINE_STORAGE_KEY, String(freshDeadline));
  return freshDeadline;
}

function getSecondsRemaining(deadline: number): number {
  return Math.max(Math.round((deadline - Date.now()) / 1000), 0);
}

/**
 * Shared countdown clock for the contest. Deadline lives in localStorage so
 * refreshing won't buy anyone more time, and every consumer of this hook
 * agrees on the same "time's up" moment.
 */
export function useCountdown() {
  const [deadline] = useState(getOrCreateDeadline);
  const [secondsRemaining, setSecondsRemaining] = useState(() => getSecondsRemaining(deadline));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsRemaining(getSecondsRemaining(deadline));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [deadline]);

  return {
    secondsRemaining,
    isTimeUp: secondsRemaining === 0,
  };
}
