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
          width: ref.current ? ref.current.offsetWidth : 0,
          height: ref.current ? ref.current.offsetHeight : 0,
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
