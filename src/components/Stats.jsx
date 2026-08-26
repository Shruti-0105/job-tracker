function Stats({ applications }) {

  const total = applications.length;

  const applied = applications.filter(
    (app) => app.status === "Applied"
  ).length;

  const shortlisted = applications.filter(
    (app) => app.status === "Shortlisted"
  ).length;

  const interviews = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const selected = applications.filter(
    (app) => app.status === "Selected"
  ).length;

  const rejected = applications.filter(
    (app) => app.status === "Rejected"
  ).length;


  const stats = [
    {
      title: "Total",
      value: total,
      icon: "📋",
      className: "total"
    },
    {
      title: "Applied",
      value: applied,
      icon: "📤",
      className: "applied"
    },
    {
      title: "Shortlisted",
      value: shortlisted,
      icon: "⭐",
      className: "shortlisted"
    },
    {
      title: "Interviews",
      value: interviews,
      icon: "🎯",
      className: "interview"
    },
    {
      title: "Selected",
      value: selected,
      icon: "🎉",
      className: "selected"
    },
    {
      title: "Rejected",
      value: rejected,
      icon: "✕",
      className: "rejected"
    }
  ];


  return (
    <div className="stats">

      {stats.map((stat) => (

        <div
          className={`stat-card ${stat.className}`}
          key={stat.title}
        >

          <div className="stat-top">

            <span className="stat-icon">
              {stat.icon}
            </span>

            <span className="stat-title">
              {stat.title}
            </span>

          </div>

          <h2>{stat.value}</h2>

        </div>

      ))}

    </div>
  );
}

export default Stats;