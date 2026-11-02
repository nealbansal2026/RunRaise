# RunRaise

RunRaise is a web application designed to help Cross Country teams raise funds by showcasing their athletes' running progress. By connecting to Strava, the application retrieves activity data and presents it through an interactive dashboard.

## Features
### NOTE: STRAVA HAS DISCONTINUED API USE FOR FREE USERS, THUS ENDING RUNRAISE'S API FUNCTIONALITY
- **Strava Integration:** Connect a Strava account to retrieve athlete profiles and running activities.
- **Activity Dashboard:** View recent running activities, including distance, pace, date, and elevation.
- **Team Statistics:** Visualize total team mileage over time and compare mileage between athletes.
- **Interactive Website:** Navigate between the home page, about page, contact page, and team dashboard.

## Technologies Used

- React
- JavaScript
- Node.js
- Express
- Strava API
- Recharts
- Axios

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm
- A [Strava API application](https://www.strava.com/settings/api)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nealbansal2026/RunRaise-from-coPilot.git
   ```

2. Navigate to the project directory:

   ```bash
   cd RunRaise-from-coPilot/runraise
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Configuration

Create a `.env` file in the project directory and add your Strava API credentials:

```env
STRAVA_CLIENT_ID=your_client_id
STRAVA_CLIENT_SECRET=your_client_secret
STRAVA_REDIRECT_URI=http://localhost:5000/callback
FRONTEND_URL=http://localhost:3000
```

### Running the Application

Start the React frontend:

```bash
npm start
```

In a separate terminal, start the Express backend:

```bash
npm run server
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Once the application is running, select **Connect with Strava** to authorize access to your activity data.

## Future Improvements

- Support for multiple athlete accounts.
- Additional team performance statistics and visualizations.
- Expanded fundraising and donation functionality.
