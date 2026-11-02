require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 5000;

app.get('/reauth', (_req, res) => {
  // clear in-memory and environment tokens so the next flow is fresh
  delete process.env.STRAVA_ACCESS_TOKEN;
  delete process.env.STRAVA_REFRESH_TOKEN;
  delete process.env.STRAVA_TOKEN_EXPIRES_AT;
  console.log('cleared stored Strava tokens; redirecting to /auth/strava');
  res.redirect('/auth/strava');
});

// Route to fetch athlete activities
app.get('/activities', async (req, res) => {
  try {
    const response = await axios.get(
      'https://www.strava.com/api/v3/athlete/activities',
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAVA_ACCESS_TOKEN}`
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    // log underlying Strava error for debugging
    console.error('Strava fetch error:',
      error.response ? error.response.data : error.message);
    // if we want the frontend to gracefully render nothing we could send []
    res.status(500).json({ error: 'Error fetching activities' });
  }
});


const query  = require('querystring');

app.get('/auth/strava', (_req, res) => {
  const params = query.stringify({
    client_id: process.env.STRAVA_CLIENT_ID,
    response_type: 'code',
    redirect_uri: process.env.STRAVA_REDIRECT_URI,
    // request the wide activity scope; approval_prompt ensures user can re-authorize
    scope: 'activity:read_all,profile:read_all',
    approval_prompt: 'force'
  });
  res.redirect(`https://www.strava.com/oauth/authorize?${params}`);
});

app.get('/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const tokenRes = await axios.post(
      'https://www.strava.com/oauth/token',
      query.stringify({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code'
      })
    );
    const { access_token, refresh_token, expires_at, scope } = tokenRes.data;
    console.log('received token with scope', scope);
    // store them someplace persistent – DB, file, env, etc.
    process.env.STRAVA_ACCESS_TOKEN = access_token;
    process.env.STRAVA_REFRESH_TOKEN = refresh_token;
    process.env.STRAVA_TOKEN_EXPIRES_AT = expires_at;
    const redirectTo = process.env.FRONTEND_URL || 'http://localhost:3000';
    console.log('authorization complete — redirecting browser to', redirectTo);
    res.redirect(redirectTo);
  } catch (err) {
    console.error('OAuth callback error:',
      err.response ? `${err.response.status} ${JSON.stringify(err.response.data)}` : err.message);
    res.status(500).send('Authorization failed');
  }
});
app.get('/athlete', async (_req, res) => {
  try {
    const r = await axios.get('https://www.strava.com/api/v3/athlete', {
      headers: { Authorization: `Bearer ${process.env.STRAVA_ACCESS_TOKEN}` }
    });
    res.json(r.data);
  } catch (e) {
    res.status(500).json({ error: 'could not fetch athlete' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

async function refresh() {
  if (Date.now() / 1000 > process.env.STRAVA_TOKEN_EXPIRES_AT - 60) {
    const r = await axios.post('https://www.strava.com/oauth/token', query.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: process.env.STRAVA_REFRESH_TOKEN
    }));
    process.env.STRAVA_ACCESS_TOKEN = r.data.access_token;
    process.env.STRAVA_REFRESH_TOKEN = r.data.refresh_token;
    process.env.STRAVA_TOKEN_EXPIRES_AT = r.data.expires_at;
  }
}
setInterval(refresh, 10 * 60 * 1000);