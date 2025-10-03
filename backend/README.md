# B-FIT Backend (Express + MongoDB)

Run locally

- Copy .env.example to .env and fill values
- Start MongoDB:
  - brew services start mongodb-community@7.0
  - OR: docker-compose up -d
- Install deps: npm i
- Dev: npm run dev
- Prod: npm start
- Health: GET http://localhost:5000/api/health

Key endpoints

- Auth: POST /api/auth/register, POST /api/auth/login, GET /api/auth/me
- Foods: GET /api/foods?q=oats
- Exercises: GET /api/exercises?q=run
- Logs (date=YYYY-MM-DD):
  - GET /api/logs/:date
  - POST /api/logs/:date/water { amount }
  - POST /api/logs/:date/foods { name, quantity, grams, calories, protein, carbs, fat, fiber }
  - DELETE /api/logs/:date/foods/:entryId
  - POST /api/logs/:date/workouts { type, durationMin, calories }
  - DELETE /api/logs/:date/workouts/:entryId
- Goals: GET /api/goals, PUT /api/goals
- Users: GET /api/users/me, PATCH /api/users/me

Optional integrations

- src/integrations/nutrition.client.js
- src/integrations/usda.client.js

Seed data (optional)

- npm run seed:foods
- npm run seed:exercises
