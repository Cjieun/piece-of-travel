import {useState} from 'react';

export function useDetail() {
  const [showKebab, setShowKebab] = useState(false);

  const toggleKebab = () => {
    setShowKebab(prev => !prev);
  };

  return {showKebab, toggleKebab};
}
