import { useState, useEffect } from 'react';

function useObjectSize(myRef: React.MutableRefObject<any>) {
  const [objectSize, setObjectSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setObjectSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [myRef]);

  return objectSize;
}

export default useObjectSize;
