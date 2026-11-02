
//Table component

const ActivityTable = () => (
  <section style={{ padding: '2rem' }}>
    <h2>Recent Activities</h2>

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
  </section>
);

const tableCell = {
  padding: '0.75rem',
  textAlign: 'left',
  borderBottom: '1px solid #333',
  color: '#E0E0E0',
};

