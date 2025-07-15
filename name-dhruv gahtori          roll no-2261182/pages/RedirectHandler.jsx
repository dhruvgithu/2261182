import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getUrl, addClick } from '../data/urlStore';
import { customLog } from '../utils/logger';

export default function RedirectHandler() {
  const { code } = useParams();

  useEffect(() => {
    const entry = getUrl(code);
    if (entry) {
      const now = new Date();
      if (now < new Date(entry.expiresAt)) {
        const source = document.referrer || 'direct';
        const location = 'India'; // Placeholder
        addClick(code, { timestamp: now, source, location });
        customLog('REDIRECT', 'Redirecting to long URL', { code });
        window.location.href = entry.originalUrl;
      } else {
        alert('Link has expired.');
      }
    } else {
      alert('Invalid short URL.');
    }
  }, [code]);

  return null;
}
