{filteredEvents.map((activity, index) => (
    <div key={index}>
      <h3>Activity {index + 1}</h3>
      {activity && Object.keys(activity).map((key) => (
      <p key={key}>
      {key}: {activity[key]}
      </p>
      ))}
    </div>
     ))}