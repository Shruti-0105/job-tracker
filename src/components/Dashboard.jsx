import { useState } from "react";

import Stats from "./Stats";
import ApplicationCard from "./ApplicationCard";


function Dashboard({
  applications,
  onAdd,
  onDelete,
  onEdit,
  deletingId
}) {

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [importantFilter, setImportantFilter] =
    useState("All");


  const filteredApplications =
    applications.filter((application) => {

      const searchText =
        search.toLowerCase();


      const matchesSearch =
        application.company
          .toLowerCase()
          .includes(searchText) ||

        application.role
          .toLowerCase()
          .includes(searchText) ||

        application.location
          .toLowerCase()
          .includes(searchText);


      const matchesStatus =
        statusFilter === "All" ||
        application.status === statusFilter;


      const matchesType =
        typeFilter === "All" ||
        application.type === typeFilter;


      const matchesImportant =
        importantFilter === "All" ||

        (importantFilter === "Important" &&
          application.important === true) ||

        (importantFilter === "Normal" &&
          !application.important);


      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesImportant
      );

    });


  return (

    <main
      className="container"
      id="dashboard"
    >

      {/* WELCOME */}

      <section className="welcome">

        <div className="welcome-text">

          <p className="welcome-small">
            Welcome back 👋
          </p>

          <h1>
            Internship & Job Tracker
          </h1>

          <p className="welcome-description">
            Keep track of your applications and stay
            organized during your job search.
          </p>

        </div>


        <button
          className="add-main-btn"
          onClick={onAdd}
        >
          <span>+</span>
          Add Application
        </button>

      </section>


      {/* STATS */}

      <Stats
        applications={applications}
      />


      {/* APPLICATIONS */}

      <section
        className="applications-section"
        id="applications"
      >

        <div className="section-header">

          <div>

            <h2>
              My Applications
            </h2>

            <p>
              Track and manage your job applications
            </p>

          </div>

          <div className="application-count">
            {filteredApplications.length} shown
          </div>

        </div>


        {/* FILTERS */}

        <div className="filters">

          <div className="search-wrapper">

            <span className="search-icon">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search company, role or location..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="search-input"
            />

          </div>


          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >

            <option value="All">
              All Status
            </option>

            <option value="Applied">
              Applied
            </option>

            <option value="Shortlisted">
              Shortlisted
            </option>

            <option value="Interview">
              Interview
            </option>

            <option value="Selected">
              Selected
            </option>

            <option value="Rejected">
              Rejected
            </option>

          </select>


          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value)
            }
          >

            <option value="All">
              All Types
            </option>

            <option value="Internship">
              Internship
            </option>

            <option value="Full-time">
              Full-time
            </option>

          </select>


          <select
            value={importantFilter}
            onChange={(e) =>
              setImportantFilter(e.target.value)
            }
          >

            <option value="All">
              All Applications
            </option>

            <option value="Important">
              ⭐ Important
            </option>

            <option value="Normal">
              Normal
            </option>

          </select>

        </div>


        {/* APPLICATIONS */}

        {filteredApplications.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              📋
            </div>

            <h3>

              {applications.length === 0
                ? "No applications yet"
                : "No applications found"}

            </h3>

            <p>

              {applications.length === 0

                ? "Start tracking your internship and job applications."

                : "Try changing your search or filters."}

            </p>


            {applications.length === 0 && (

              <button
                onClick={onAdd}
                className="empty-btn"
              >
                + Add Your First Application
              </button>

            )}

          </div>

        ) : (

          <div className="application-list">

            {filteredApplications.map(
              (application) => (

                <ApplicationCard
                    key={application.id}
                    application={application}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    deletingId={deletingId}
                />

              )
            )}

          </div>

        )}

      </section>

    </main>
  );
}

export default Dashboard;