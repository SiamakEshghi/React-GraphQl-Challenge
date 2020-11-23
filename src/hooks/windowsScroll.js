import React, { useState, useEffect } from 'react';

function useWindowScroll() {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleScroll() {
    const scrollTop =
      document.documentElement?.scrollTop || document.body.scrollTop;

    const scrollHeight =
      document.documentElement?.scrollHeight || document.body.scrollHeight;

    if (window.innerHeight + scrollTop + 50 >= scrollHeight) {
      return setIsScrolledToBottom(true);
    }

    setIsScrolledToBottom(false);
  }

  return { isScrolledToBottom };
}

export default useWindowScroll;
