import {useState} from 'react';
import {calculateDays} from '../../modules/useDate';
import {useNavigation} from '@react-navigation/native';

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

export function useNavigateToAddDetail() {
  const navigation = useNavigation();

  const navigateToAddDetail = () => {
    navigation.navigate('addDetail');
  };

  return {navigateToAddDetail};
}
