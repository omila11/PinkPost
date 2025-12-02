# Backend (Pink Post)

Quick start

- Copy `.env.example` to `.env` and fill values.
- Install dependencies: `npm install`
- Start server in development: `npm run dev` or `node server.js`

Docker

- Build: `docker build -t pinkpost-backend .`
- Run: `docker run -e MONGO_URI=... -p 3001:3001 pinkpost-backend`

Notes

- The main entry is `server.js`. API routes are in `routes/` and controllers in `controllers/`.
