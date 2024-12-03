import {useState} from 'react';
import {calculateDays} from '../../modules/useDate';

export function useDetail() {
  const [showKebab, setShowKebab] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);

  const toggleKebab = () => {
    setShowKebab(prev => !prev);
  };

  const beginDate = '2024-10-14';
  const endDate = '2024-10-17';

  const daysCount = calculateDays(beginDate, endDate);

  const dayLabels = [];
  for (let i = 1; i <= daysCount; i++) {
    dayLabels.push(i);
  }

  return {showKebab, toggleKebab, dayLabels, selectedDay, setSelectedDay};
}
