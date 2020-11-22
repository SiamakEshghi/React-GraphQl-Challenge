import React, { useState, useEffect } from 'react';

function useWindowScroll() {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return setIsScrolledToBottom(false);
    setIsScrolledToBottom(true);
  }

  return { isScrolledToBottom };
}

export default useWindowScroll;
