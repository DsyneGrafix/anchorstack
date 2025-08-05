// src/server.ts
import express from 'express';
const app = express();
app.get('/', (_, res) => {
    res.send('✅ AnchorStack API is working!');
});
app.listen(3001, () => {
    console.log('🚀 Server running at http://localhost:3001');
});
