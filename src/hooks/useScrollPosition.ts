import { useLayoutEffect, useState } from 'react';

function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useLayoutEffect(() => {
    function updatePosition() {
      setScrollPosition(window.pageYOffset);
    }

    window.addEventListener('scroll', updatePosition);
    updatePosition();

    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
}

export default useScrollPosition;
