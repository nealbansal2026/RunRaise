/*
You are building a modern, aesthetic sample webpage using React.


Create a small multi-section website with the following qualities:


GENERAL
- Clean, modern, minimal UI (SaaS / portfolio style)
- Responsive layout (desktop + mobile)
- No external UI libraries (use basic CSS or utility classes if present)
- Dark theme with neutral tones and one subtle blue accent color and subtle gradients
- Clear visual hierarchy: navigation → page title → key metrics → details
- Dense but readable layout (information-rich, not sparse)
- Consistent spacing, alignment, and typography


STRUCTURE
- A top navigation bar with links (Home, About, Contact)
- App name/logo at the top
- A main layout component shared across pages
- A hero section with a headline, short description, and primary + secondary call-to-action buttons
- A features or highlights section using cards
- A simple interactive section (FAQ accordion, toggle, or expandable cards)
- A footer with minimal text


BEHAVIOR
- Navigation should be client-side (no full page reloads)
- Subtle hover and focus states for all interactive elements
- No large animations; micro-interactions only
- Responsive behavior:
  - Sidebar collapses or stacks on smaller screens
- Avoid layout shift or horizontal overflow issues
- Code should be beginner-readable and well-organized


CODE STYLE
- Use functional React components and hooks
- Keep code readable and beginner-friendly
- Minimal external dependencies (React Router OK)
- Ensure code is well-commented in every key area
- Use functional components
- Keep everything in a small number of files (App.jsx + components)
- Prefer clarity over cleverness


TECHNICAL EXPECTATIONS
- Avoid hard-coded magic numbers where possible (placeholder data is fine, ensure it is commented)
- Use semantic HTML
- Ensure accessibility basics (labels, focus states)


GOAL
The result should feel like a polished demo or starter template that looks intentional and professional, not a tutorial toy.


*/


import React from 'react';
import Footer from './components/Footer';
import Name from './components/Name';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LineChart, Line, BarChart,
  Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


// Basic CSS styles for dark theme and layout
//TODO: make buttons more appealing, improve gradients, shadows, and hover effect

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#121212',
    color: '#E0E0E0',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    borderBottom: '1px solid #333',
  },
  navLink: {
    color: '#E0E0E0',
    textDecoration: 'none',
    marginLeft: '1rem',
  },
  hero: {
    padding: '4rem 2rem',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #1e1e1e, #2c2c2c)',
  },
  buttonPrimary: {
    backgroundColor: '#2979ff',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    margin: '0.5rem',
    cursor: 'pointer',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    color: '#2979ff',
    border: '2px solid #2979ff',
    padding: '0.75rem 1.5rem',
    margin: '0.5rem',
    cursor: 'pointer',
  },
  features: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '2rem',
    flexWrap: 'wrap',
  },
  featureCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: '8px',
    padding: '1rem',
    margin: '1rem',
    flex: '1 1 200px',
    maxWidth: '300px',
  },
  faqSection: {
    padding: '2rem',
  },
  faqItem: {
    backgroundColor: '#1e1e1e',
    borderRadius: '8px',
    margin: '0.5rem 0',
    padding: '1rem',
    cursor: 'pointer',
  },
  footer: {
    textAlign: 'center',
    padding: '1rem',
    borderTop: '1px solid #333',
    marginTop: 'auto',
  },
};

// Helper to get the Sunday of a given week
const getWeekSunday = (dateString) => {
  const date = new Date(dateString);
  const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return new Date(date.getTime() - dayOfWeek * millisecondsPerDay);
};

// Helper to get ISO week number
const getWeekNumber = (dateString) => {
  const date = new Date(dateString);
  const firstJan = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - firstJan) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + firstJan.getDay() + 1) / 7);
};

//Table component

const ActivityTable = ({ activities }) => (
  <section style={{ padding: '2rem' }}>
    <h2>Recent Activities</h2>

    {activities.length === 0 ? (
      <p style={{ color: '#aaa' }}>No activities found.</p>
    ) : (
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '1rem',
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <thead style={{ backgroundColor: '#222' }}>
          <tr>
            {['Athlete', 'Date', 'Type', 'Miles', 'Pace', 'Elevation (ft)'].map((heading) => (
              <th key={heading} style={tableCell}>{heading}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {activities.map((activity, index) => (
            <tr
              key={activity.id}
              style={{
                backgroundColor: index % 2 === 0 ? '#1a1a1a' : '#161616'
              }}
            >
              <td style={tableCell}>{activity.athlete}</td>
              <td style={tableCell}>{activity.date}</td>
              <td style={tableCell}>{activity.type}</td>
              <td style={tableCell}>{activity.distance}</td>
              <td style={tableCell}>{activity.pace}</td>
              <td style={tableCell}>{activity.elevation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </section>
);

const tableCell = {
  padding: '0.75rem',
  textAlign: 'left',
  borderBottom: '1px solid #333',
  color: '#E0E0E0',
};


// mileage graph by week
const WeeklyMileageGraph = ({ data }) => (
  <section style={{ padding: '2rem' }}>
    <h2>Total Team Miles Per Week</h2>

    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid stroke="#333" />
          <XAxis dataKey="week" stroke="#E0E0E0" />
          <YAxis stroke="#E0E0E0" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="miles"
            stroke="#2979ff"
            strokeWidth={3}
            dot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </section>
);


// Graph component
const TeamMileageGraph = ({ data }) => (
  <section style={{ padding: '2rem' }}>
    <h2>Total Miles Per Athlete</h2>

    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data} barSize={50}>
          <CartesianGrid stroke="#333" />
          <XAxis dataKey="name" stroke="#E0E0E0" />
          <YAxis stroke="#E0E0E0" />
          <Tooltip />
          <Bar
            dataKey="miles"
            fill="#2979ff"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </section>
);


// Navigation component with client-side routing
const NavBar = ({ profile, authLoading }) => (
  <nav style={styles.nav}>
    <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>RunRaise</div>
    <div>
      <Link to="/" style={styles.navLink}>Home</Link>
      <Link to="/about" style={styles.navLink}>About</Link>
      <Link to="/contact" style={styles.navLink}>Contact</Link>
      <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
    </div>
    <div>
      {!authLoading && (
        profile ? (
          <span style={{ marginLeft: '1rem', display: 'inline-flex', alignItems: 'center' }}>
            <img
              src={profile.profile}
              alt={profile.firstname}
              style={{ width: 24, height: 24, borderRadius: '50%' }}
            />
            <span style={{ marginLeft: '0.5rem', color: '#E0E0E0' }}>{profile.firstname}</span>
          </span>
        ) : (
          // navigation must go to the backend directly; CRA proxy does *not* forward browser navigations
          <a href="http://localhost:5000/auth/strava" style={styles.navLink}>Connect Strava</a>
        )
      )}
    </div>
  </nav>
);


// Hero section component
const HeroSection = ({ profile, authLoading }) => {
  const [hovered, setHovered] = React.useState(null);

  const primaryHover = hovered === 'primary';
  const secondaryHover = hovered === 'secondary';

  return (
    <section style={styles.hero}>
      <h1>Welcome to RunRaise</h1>
      <p>A fundraising website powered by your local Cross Country team</p>

      {!authLoading && !profile && (
        <a
          href="http://localhost:5000/auth/strava"
          style={{
            ...styles.buttonPrimary,
            textDecoration: 'none',
            display: 'inline-block',
            marginBottom: '1rem'
          }}
        >
          Connect with Strava
        </a>
      )}
      <Link
        to="/dashboard"
        style={{
          ...styles.buttonPrimary,
          textDecoration: 'none',
          display: 'inline-block',
          backgroundColor: primaryHover ? '#1565c0' : '#2979ff',
          transform: primaryHover ? 'scale(1.05)' : 'scale(1)',
          boxShadow: primaryHover
            ? '0 0 15px rgba(41, 121, 255, 0.6)'
            : 'none',
          transition: 'all 0.2s ease-in-out'
        }}
        onMouseEnter={() => setHovered('primary')}
        onMouseLeave={() => setHovered(null)}
      >
        View Progress
      </Link>

      <Link
        to="/about"
        style={{
          ...styles.buttonSecondary,
          textDecoration: 'none',
          display: 'inline-block',
          borderColor: secondaryHover ? '#ff5722' : '#2979ff',
          color: secondaryHover ? '#ff5722' : '#2979ff',
          transform: secondaryHover ? 'scale(1.05)' : 'scale(1)',
          boxShadow: secondaryHover
            ? '0 0 15px rgba(255, 87, 34, 0.6)'
            : 'none',
          transition: 'all 0.2s ease-in-out'
        }}
        onMouseEnter={() => setHovered('secondary')}
        onMouseLeave={() => setHovered(null)}
      >
        Learn More
      </Link>
    </section>
  );
};



// Features section component
const FeaturesSection = () => (
  <section style={styles.features}>
    {[1, 2, 3].map((feature) => (
      <div key={feature} style={styles.featureCard}>
        <h3>Feature {feature}</h3>
        <p>This is a brief description of feature {feature}.</p>
      </div>
    ))}
  </section>
);


// FAQ item component with toggle functionality
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);


  return (
    <div
      style={styles.faqItem}
      onClick={() => setIsOpen(!isOpen)}
      role="button"
      tabIndex={0}
      onKeyPress={() => setIsOpen(!isOpen)}
    >
      <h4>{question}</h4>
      {isOpen && <p>{answer}</p>}
    </div>
  );
}
// FAQ section component
const FAQSection = () => (
  <section style={styles.faqSection}>
    <h2>Frequently Asked Questions</h2>
    {[
      { question: 'What is RunRaise?', answer: 'Runraise is a website where you can view the progress of your local Cross Country athletes, and help support their team.' },
      { question: 'How do I view the data?', answer: 'Click the Get Started button in the landing page to begin.' },
      { question: 'Is RunRaise free to use?', answer: 'Yes, RunRaise is free to use and view.' },
    ].map((faq, index) => (
      <FAQItem key={index} question={faq.question} answer={faq.answer} />
    ))}
  </section>
);



// Main App component with routing and data logic
const App = () => {
  const [activities, setActivities] = React.useState([]);
  const [profile, setProfile] = React.useState(null);
  const [authLoading, setAuthLoading] = React.useState(true);

  // fetch Strava athlete profile (might be empty if not connected)
  React.useEffect(() => {
    fetch('/athlete')
      .then(res => {
        if (!res.ok) throw new Error('no profile');
        return res.json();
      })
      .then(data => setProfile(data))
      .catch(() => setProfile(null))
      .finally(() => setAuthLoading(false));
  }, []);

  React.useEffect(() => {
    fetch('/activities')
      .then(res => {
        if (!res.ok) {
          // attempt to parse error body and propagate
          return res.json().then(err => {
            throw new Error(err.error || 'network response was not ok');
          });
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setActivities(data);
        } else {
          console.warn('Expected activities array but got:', data);
          setActivities([]);
        }
      })
      .catch(err => {
        console.error('Failed to load activities', err);
        setActivities([]); // keep the UI from crashing
      });
  }, []);

  const formattedActivities = activities
    .filter(activity => {
      // only include running-related activities
      const runningTypes = ['Run', 'Walk', 'Trail Run', 'Virtual Run', 'Indoor Run'];
      return runningTypes.includes(activity.type);
    })
    .map(activity => {
      // calculate pace: minutes per mile = (moving_time in seconds / 60) / (distance in miles)
      const distanceInMiles = activity.distance / 1609.34;
      const movingTimeInMinutes = activity.moving_time / 60;
      const paceMinPerMile = distanceInMiles > 0 ? movingTimeInMinutes / distanceInMiles : 0;
      const paceMin = Math.floor(paceMinPerMile);
      const paceSec = Math.round((paceMinPerMile - paceMin) * 60);

      return {
        id: activity.id,
        athlete: activity.athlete?.firstname || 'Neal',
        date: activity.start_date.split('T')[0],
        type: activity.type,
        distance: distanceInMiles.toFixed(2), // meters → miles
        pace: `${paceMin}:${String(paceSec).padStart(2, '0')}`, // mm:ss format
        elevation: (activity.total_elevation_gain * 3.28084).toFixed(0) // meters → feet
      };
    });

  const weeklyMileage = Object.values(
    formattedActivities.reduce((acc, activity) => {
      const sunday = getWeekSunday(activity.date);
      const month = sunday.getMonth() + 1;
      const day = sunday.getDate();
      const year = sunday.getFullYear();
      const label = `week of ${month}/${day}/${year}`;

      if (!acc[label]) {
        acc[label] = { week: label, sundayDate: sunday, miles: 0 };
      }

      acc[label].miles += parseFloat(activity.distance);
      return acc;
    }, {})
  ).sort((a, b) => a.sundayDate - b.sundayDate); // sort chronologically by Sunday date

  const mileageByAthlete = Object.values(
    formattedActivities.reduce((acc, activity) => {
      if (!acc[activity.athlete]) {
        acc[activity.athlete] = { name: activity.athlete, miles: 0 };
      }
      acc[activity.athlete].miles += parseFloat(activity.distance);
      return acc;
    }, {})
  );

  return (
    <Router>
      <div style={styles.app}>
        <NavBar profile={profile} authLoading={authLoading} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection profile={profile} authLoading={authLoading} />
                <FeaturesSection />
                <FAQSection />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <section style={{ padding: '2rem' }}>
                <h2>About Us</h2>
                <p>RunRaise is an app built by a Cross Country athlete in order to help raise funds for his team.</p>
                <p>RunRaise is entirely homemade and seeks to utilize comminity funding to help support the team.</p>
                <p>By connecting to the Strava API, RunRaise is able to display the training data of students on the Cross Country team.</p>
              </section>
            }
          />
          <Route
            path="/contact"
            element={
              <section style={{ padding: '2rem' }}>
                <h2>Contact Us</h2>
                <p>For any inquiries, please contact the app's founder, Neal Bansal at nealbansal100@gmail.com.</p>
              </section>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <ActivityTable activities={formattedActivities} />
                <TeamMileageGraph data={mileageByAthlete} />
                <WeeklyMileageGraph data={weeklyMileage} />
              </>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;






