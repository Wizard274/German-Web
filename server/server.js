import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`🚀 LinguaAI Server running on http://localhost:${PORT}`);
  console.log(`🎧 Audio static endpoint: http://localhost:${PORT}/audio`);
  console.log(`=================================================\n`);
});
