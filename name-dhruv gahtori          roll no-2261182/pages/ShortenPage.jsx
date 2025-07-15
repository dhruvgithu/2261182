import { useState } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import { isValidUrl, isValidShortcode } from '../utils/validation';
import { saveUrl } from '../data/urlStore';
import { customLog } from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

export default function ShortenPage() {
  const [inputs, setInputs] = useState([{ url: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const temp = [...inputs];
    temp[index][field] = value;
    setInputs(temp);
  };

  const handleSubmit = () => {
    const newResults = [];
    for (let i = 0; i < inputs.length; i++) {
      const { url, validity, shortcode } = inputs[i];
      if (!isValidUrl(url)) {
        alert(`Invalid URL at row ${i + 1}`);
        return;
      }
      if (shortcode && !isValidShortcode(shortcode)) {
        alert(`Invalid shortcode at row ${i + 1}`);
        return;
      }

      const code = shortcode || uuidv4().slice(0, 6);
      const now = new Date();
      const expire = new Date(now.getTime() + (validity ? parseInt(validity) : 30) * 60000);

      saveUrl(code, {
        originalUrl: url,
        createdAt: now,
        expiresAt: expire,
        clicks: [],
      });

      newResults.push({ code, originalUrl: url, expiresAt: expire.toLocaleString() });
      customLog('INFO', 'URL shortened', { code, url });
    }
    setResults(newResults);
  };

  return (
    <Box p={4}>
      <Typography variant="h4">URL Shortener</Typography>
      {inputs.map((input, idx) => (
        <Grid key={idx} container spacing={2} mt={2}>
          <Grid item xs={5}><TextField label="Long URL" fullWidth onChange={(e) => handleChange(idx, 'url', e.target.value)} /></Grid>
          <Grid item xs={2}><TextField label="Validity (min)" type="number" onChange={(e) => handleChange(idx, 'validity', e.target.value)} /></Grid>
          <Grid item xs={3}><TextField label="Custom Shortcode (opt)" onChange={(e) => handleChange(idx, 'shortcode', e.target.value)} /></Grid>
        </Grid>
      ))}
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>Shorten URLs</Button>

      <Box mt={4}>
        {results.map((res) => (
          <Typography key={res.code}>
            Shortened: <a href={`/${res.code}`}>http://localhost:3000/{res.code}</a> (Expires: {res.expiresAt})
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
