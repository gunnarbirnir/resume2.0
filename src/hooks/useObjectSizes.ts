import { useState, useEffect } from 'react';

function useObjectSizes(myRefs: React.RefObject<any>[]) {
  const [objectSizes, setObjectSizes] = useState<
    {
      width: number;
      height: number;
    }[]
  >(myRefs.map((_) => ({ width: 0, height: 0 })));

  useEffect(() => {
    function handleResize() {
      const newSizes: { width: number; height: number }[] = [];
      myRefs.forEach((ref) =>
        newSizes.push({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        })
      );
      setObjectSizes(newSizes);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [myRefs]);

  return objectSizes;
}

export default useObjectSizes;
