import { useEffect, useState } from 'react';

const TEN_MINUTES_IN_SECONDS = 10 * 60;
const DEADLINE_STORAGE_KEY = 'guild-breaker:countdown-deadline';

function formatSecondsAsClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Reads (or creates) the contest deadline from localStorage so refreshing
 * the page doesn't give anyone extra time. Nice try though.
 */
function getOrCreateDeadline(): number {
  const storedDeadline = localStorage.getItem(DEADLINE_STORAGE_KEY);
  const parsedDeadline = storedDeadline ? Number(storedDeadline) : NaN;

  if (!Number.isNaN(parsedDeadline) && parsedDeadline > Date.now()) {
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
 * ⏰ CONTEST CLOCK ⏰
 * Counts down from 10 minutes the moment the app loads.
 * No pausing, no mercy, no extensions for "just one more bug fix".
 * Deadline lives in localStorage so refreshing won't buy you more time.
 */
function CountdownTimer() {
  const [deadline] = useState(getOrCreateDeadline);
  const [secondsRemaining, setSecondsRemaining] = useState(() => getSecondsRemaining(deadline));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsRemaining(getSecondsRemaining(deadline));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [deadline]);

  const isTimeUp = secondsRemaining === 0;
  const isPanicMode = secondsRemaining <= 60 && !isTimeUp;

  return (
    <div className={`countdown-timer${isPanicMode ? ' countdown-timer--panic' : ''}`}>
      {isTimeUp ? (
        <span>⏱️ TIME'S UP — hands off the keyboard (or don't, we're not the police)</span>
      ) : (
        <span>⏱️ {formatSecondsAsClock(secondsRemaining)} remaining to commit crimes</span>
      )}
    </div>
  );
}

export default CountdownTimer;

