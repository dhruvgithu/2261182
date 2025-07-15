import { getAllUrls } from '../data/urlStore';
import { Box, Typography } from '@mui/material';

export default function StatsPage() {
  const urls = getAllUrls();

  return (
    <Box p={4}>
      <Typography variant="h4">URL Statistics</Typography>
      {urls.map((u) => (
        <Box key={u.shortcode} mt={3}>
          <Typography><strong>Short:</strong> http://localhost:3000/{u.shortcode}</Typography>
          <Typography><strong>Original:</strong> {u.originalUrl}</Typography>
          <Typography><strong>Created:</strong> {new Date(u.createdAt).toLocaleString()}</Typography>
          <Typography><strong>Expires:</strong> {new Date(u.expiresAt).toLocaleString()}</Typography>
          <Typography><strong>Clicks:</strong> {u.clicks.length}</Typography>
          {u.clicks.map((c, idx) => (
            <Typography key={idx} variant="body2">Clicked from {c.source} at {new Date(c.timestamp).toLocaleString()} - Location: {c.location}</Typography>
          ))}
        </Box>
      ))}
    </Box>
  );
}
