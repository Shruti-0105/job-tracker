function ApplicationCard({
  application,
  onDelete,
  onEdit,
  deletingId
}) {

  const companyInitial =
    application.company
      ? application.company.charAt(0).toUpperCase()
      : "?";

  return (

    <div
      className={`application-card ${
        application.important
          ? "important-card"
          : ""
      }`}
    >

      {/* COMPANY */}

      <div className="company-section">

        <div className="company-icon">
          {companyInitial}
        </div>

        <div className="company-info">

          <div className="company-title-row">

            <h3>
              {application.company}
            </h3>

            {application.important && (

              <span
                className="important-star"
                title="Important application"
              >
                ★
              </span>

            )}

          </div>

          <p className="role">
            {application.role}
          </p>

          <p className="location">
            📍 {application.location}
          </p>

        </div>

      </div>


      {/* APPLICATION DETAILS */}

      <div className="application-details">

        <div className="badges">

          <span className="type-badge">
            {application.type}
          </span>

          <span
            className={`status-badge ${application.status.toLowerCase()}`}
          >
            {application.status}
          </span>

        </div>

        <p className="date">
          Applied on {application.date}
        </p>


        {/* INTERVIEW DATE */}

        {application.interviewDate && (

          <p className="interview-date">
            📅 Interview: {application.interviewDate}
          </p>

        )}

      </div>


      {/* ACTIONS */}

      <div className="card-actions">

        {application.link && (

          <a
            href={application.link}
            target="_blank"
            rel="noreferrer"
            className="view-link"
          >
            View Job ↗
          </a>

        )}

        <button
          className="edit-btn"
          onClick={() =>
            onEdit(application)
          }
          disabled={deletingId === application.id}
        >
          Edit
        </button>


        <button
          className="delete-btn"
          onClick={() =>
            onDelete(application.id)
          }
          disabled={deletingId === application.id}
        >
          {deletingId === application.id
            ? "Deleting..."
            : "Delete"}
        </button>

      </div>


      {/* NOTES */}

      {application.notes && (

        <div className="notes">

          <span className="notes-label">
            📝 Notes
          </span>

          <p>
            {application.notes}
          </p>

        </div>

      )}

    </div>

  );

}

export default ApplicationCard;