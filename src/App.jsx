import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ApplicationForm from "./components/ApplicationForm";

import "./index.css";

const API_URL = "http://localhost:5001/api/applications";


function App() {

  const [applications, setApplications] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editingApplication, setEditingApplication] =
    useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState(null);


  // ==========================================
  // GET - FETCH APPLICATIONS
  // ==========================================

  const fetchApplications = async () => {

    setLoading(true);
    setError("");

    try {

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data = await response.json();

      setApplications(data);

    } catch (error) {

      console.error(
        "Error fetching applications:",
        error
      );

      setError(
        "Unable to connect to the server. Please make sure the backend is running."
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // FETCH DATA WHEN APP STARTS
  // ==========================================

  useEffect(() => {

    fetchApplications();

  }, []);


  // ==========================================
  // POST - ADD APPLICATION
  // ==========================================

  const addApplication = async (application) => {

    setSaving(true);
    setError("");

    try {

      const response = await fetch(API_URL, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(application)

      });


      if (!response.ok) {
        throw new Error("Failed to add application");
      }


      const newApplication =
        await response.json();


      setApplications(
        (previousApplications) => [
          ...previousApplications,
          newApplication
        ]
      );


      setShowForm(false);

    } catch (error) {

      console.error(
        "Error adding application:",
        error
      );

      setError(
        "Unable to add the application. Please try again."
      );

    } finally {

      setSaving(false);

    }

  };


  // ==========================================
  // DELETE APPLICATION
  // ==========================================

  const deleteApplication = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) {
      return;
    }


    setDeletingId(id);
    setError("");


    try {

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE"
        }
      );


      if (!response.ok) {
        throw new Error(
          "Failed to delete application"
        );
      }


      setApplications(
        (previousApplications) =>
          previousApplications.filter(
            (application) =>
              application.id !== id
          )
      );

    } catch (error) {

      console.error(
        "Error deleting application:",
        error
      );

      setError(
        "Unable to delete the application. Please try again."
      );

    } finally {

      setDeletingId(null);

    }

  };


  // ==========================================
  // OPEN EDIT FORM
  // ==========================================

  const editApplication = (application) => {

    setEditingApplication(application);

    setShowForm(true);

  };


  // ==========================================
  // PUT - UPDATE APPLICATION
  // ==========================================

  const updateApplication =
    async (updatedApplication) => {

      setSaving(true);
      setError("");

      try {

        const response = await fetch(
          `${API_URL}/${updatedApplication.id}`,
          {

            method: "PUT",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify(
              updatedApplication
            )

          }
        );


        if (!response.ok) {
          throw new Error(
            "Failed to update application"
          );
        }


        const updated =
          await response.json();


        setApplications(
          (previousApplications) =>
            previousApplications.map(
              (application) =>
                application.id === updated.id
                  ? updated
                  : application
            )
        );


        setEditingApplication(null);

        setShowForm(false);

      } catch (error) {

        console.error(
          "Error updating application:",
          error
        );

        setError(
          "Unable to update the application. Please try again."
        );

      } finally {

        setSaving(false);

      }

    };


  // ==========================================
  // CLOSE FORM
  // ==========================================

  const closeForm = () => {

    if (saving) {
      return;
    }

    setShowForm(false);

    setEditingApplication(null);

  };


  return (

    <div>

      <Navbar />


      {/* ERROR MESSAGE */}

      {error && (

        <div className="error-message">

          <div className="error-content">

            <span className="error-icon">
              ⚠️
            </span>

            <span>
              {error}
            </span>

            {!loading && (

              <button
                className="retry-btn"
                onClick={fetchApplications}
              >
                Retry
              </button>

            )}

          </div>

        </div>

      )}


      {/* LOADING */}

      {loading ? (

        <div className="loading">

          <div className="loading-spinner"></div>

          <p>
            Loading applications...
          </p>

        </div>

      ) : (

        <Dashboard

          applications={applications}

          onAdd={() => {
            setEditingApplication(null);
            setShowForm(true);
          }}

          onDelete={deleteApplication}

          onEdit={editApplication}

          deletingId={deletingId}

        />

      )}


      {/* FORM */}

      {showForm && (

        <ApplicationForm

          onAdd={addApplication}

          onUpdate={updateApplication}

          onClose={closeForm}

          editingApplication={
            editingApplication
          }

          saving={saving}

        />

      )}

    </div>

  );

}

export default App;