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




import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


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


// Navigation component with client-side routing
const NavBar = () => (
  <nav style={styles.nav}>
    <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>RunRaise</div>
    <div>
      <Link to="/" style={styles.navLink}>Home</Link>
      <Link to="/about" style={styles.navLink}>About</Link>
      <Link to="/contact" style={styles.navLink}>Contact</Link>
    </div>
  </nav>
);


// Hero section component
const HeroSection = () => (
  <section style={styles.hero}>
    <h1>Welcome to RunRaise</h1>
    <p>A fundraising website powered by your local Cross Country team</p>
    <button style={styles.buttonPrimary}>Get Started</button>
    <button style={styles.buttonSecondary}>Learn More</button>
  </section>
);


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


// Footer component
const Footer = () => (
  <footer style={styles.footer}>
    <p>&copy; 2026 RunRaise. All rights reserved.</p>
  </footer>
);


// Main App component with routing
const App = () => (
  <Router>
    <div style={styles.app}>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
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
      </Routes>
      <Footer />
    </div>
  </Router>
);


export default App;






