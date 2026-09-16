import { useCountdown } from '../hooks/useCountdown';

function formatSecondsAsClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * ⏰ CONTEST CLOCK ⏰
 * Counts down from 10 minutes the moment the app loads.
 * No pausing, no mercy, no extensions for "just one more bug fix".
 * Deadline lives in localStorage so refreshing won't buy you more time.
 */
function CountdownTimer() {
  const { secondsRemaining, isTimeUp } = useCountdown();

  const isPanicMode = secondsRemaining <= 60 && !isTimeUp;

  return (
    <div className={`countdown-timer${isPanicMode ? ' countdown-timer--panic' : ''}`}>
      {isTimeUp ? (
        <span>⏱️ TIME'S UP — hands off the keyboard!!</span>
      ) : (
        <span>⏱️ {formatSecondsAsClock(secondsRemaining)} Remaining</span>
      )}
    </div>
  );
}

export default CountdownTimer;
