# Mini Issue Tracker Backend

This project provides the REST API for the Mini Issue Tracker. It stores issues in MongoDB and is designed to work with the React frontend running on port 5173.

## Technologies

- Node.js and Express.js
- MongoDB with Mongoose
- CORS
- dotenv

## Installation

From the `backend` folder, install the dependencies:

```bash
npm install
```

## Environment variables

The `.env` file contains:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/issue_tracker
```

Do not commit `.env` to Git.

## Start the server

Make sure MongoDB is running, then use either command:

```bash
npm start
npm run dev
```

The API runs at `http://localhost:5000`.

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/issues` | Get all issues |
| GET | `/api/issues/:id` | Get one issue |
| POST | `/api/issues` | Create an issue |
| PUT | `/api/issues/:id` | Update an issue |
| DELETE | `/api/issues/:id` | Delete an issue |

The root endpoint `GET /` returns `Issue Tracker API`.

### Create request body

```json
{
  "title": "Navbar broken",
  "description": "Navbar overlaps on mobile"
}
```

New issues receive the status `Open`.

### Update request body

```json
{
  "title": "Navbar broken",
  "description": "Navbar overlaps on mobile",
  "status": "In Progress"
}
```

Allowed statuses are `Open`, `In Progress`, and `Closed`.

## Expected status codes

- `200` for successful GET, PUT, and DELETE requests
- `201` for a successful POST request
- `400` for invalid request data
- `404` when an issue does not exist
- `500` for unexpected server or database errors