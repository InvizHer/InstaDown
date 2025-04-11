# Deploying to Render

1. Create a new Node.js project on [https://render.com](https://render.com).
2. Connect your GitHub repo with this project.
3. Set build command: `npm install`
4. Set start command: `node backend/server.js`
5. Add "Web Service" and select root directory.
6. In your frontend (public), make sure to change API call to deployed backend URL.

Example:
```javascript
// Replace this in script.js
const res = await fetch('https://your-backend-url.onrender.com/api/fetch', {
```