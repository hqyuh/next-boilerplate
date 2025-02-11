'use client';

import { useEffect, useState } from 'react';

const withClientOnly = (WrapperComponent: React.ComponentType) => {
  const Component = () => {
    const [isMount, setIsMount] = useState<boolean>(false);

    useEffect(() => {
      setIsMount(true);
    }, []);

    if (!isMount) {
      return null;
    }

    return <WrapperComponent />;
  };

  return Component;
};

export default withClientOnly;
