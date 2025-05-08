import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);

      if (el) {
        // Option 1: More control — scroll to position with offset
        const yOffset = -90; // adjust this offset based on your fixed header height
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [hash]);

  return null;
};

export default ScrollToHash;
