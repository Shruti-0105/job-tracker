import { useState } from "react";


function ApplicationForm({
  onAdd,
  onUpdate,
  onClose,
  editingApplication,
  saving
}) {

  const [formData, setFormData] = useState({

    company:
      editingApplication?.company || "",

    role:
      editingApplication?.role || "",

    location:
      editingApplication?.location || "",

    type:
      editingApplication?.type || "Internship",

    status:
      editingApplication?.status || "Applied",

    date:
      editingApplication?.date || "",

    interviewDate:
      editingApplication?.interviewDate || "",

    important:
      editingApplication?.important || false,

    link:
      editingApplication?.link || "",

    notes:
      editingApplication?.notes || ""

  });


  const [formError, setFormError] =
    useState("");


  // ==========================================
  // HANDLE INPUT CHANGES
  // ==========================================

  const handleChange = (event) => {

    const {
      name,
      value
    } = event.target;


    setFormData({

      ...formData,

      [name]: value

    });


    setFormError("");

  };


  // ==========================================
  // HANDLE IMPORTANT CHECKBOX
  // ==========================================

  const handleImportantChange =
    (event) => {

      setFormData({

        ...formData,

        important:
          event.target.checked

      });

    };


  // ==========================================
  // VALIDATE FORM
  // ==========================================

  const validateForm = () => {

    if (!formData.company.trim()) {

      return "Please enter the company name.";

    }


    if (!formData.role.trim()) {

      return "Please enter the job role.";

    }


    if (!formData.location.trim()) {

      return "Please enter the location.";

    }


    if (!formData.date) {

      return "Please select the application date.";

    }


    if (
      formData.interviewDate &&
      formData.interviewDate < formData.date
    ) {

      return "Interview date cannot be before the application date.";

    }


    if (formData.link) {

      try {

        new URL(formData.link);

      } catch {

        return "Please enter a valid job posting link.";

      }

    }


    return "";

  };


  // ==========================================
  // SUBMIT FORM
  // ==========================================

  const handleSubmit = (event) => {

    event.preventDefault();


    const validationError =
      validateForm();


    if (validationError) {

      setFormError(
        validationError
      );

      return;

    }


    const cleanedData = {

      ...formData,

      company:
        formData.company.trim(),

      role:
        formData.role.trim(),

      location:
        formData.location.trim(),

      link:
        formData.link.trim(),

      notes:
        formData.notes.trim()

    };


    if (editingApplication) {

      onUpdate({

        ...cleanedData,

        id:
          editingApplication.id

      });

    } else {

      onAdd(cleanedData);

    }

  };


  return (

    <div className="modal-overlay">

      <div className="form-container">


        {/* FORM HEADER */}

        <div className="form-header">

          <div>

            <p className="form-small-title">

              {editingApplication
                ? "UPDATE"
                : "NEW APPLICATION"}

            </p>


            <h2>

              {editingApplication
                ? "Edit Application"
                : "Add Application"}

            </h2>

          </div>


          <button

            type="button"

            className="close-btn"

            onClick={onClose}

            disabled={saving}

          >
            ×
          </button>

        </div>


        {/* FORM ERROR */}

        {formError && (

          <div className="form-error">

            ⚠️ {formError}

          </div>

        )}


        <form onSubmit={handleSubmit}>


          {/* COMPANY */}

          <div className="form-group">

            <label>
              Company Name
            </label>

            <input

              type="text"

              name="company"

              value={formData.company}

              onChange={handleChange}

              placeholder="e.g. Microsoft"

              required

            />

          </div>


          {/* ROLE */}

          <div className="form-group">

            <label>
              Job Role
            </label>

            <input

              type="text"

              name="role"

              value={formData.role}

              onChange={handleChange}

              placeholder="e.g. Software Engineer Intern"

              required

            />

          </div>


          {/* LOCATION */}

          <div className="form-group">

            <label>
              Location
            </label>

            <input

              type="text"

              name="location"

              value={formData.location}

              onChange={handleChange}

              placeholder="e.g. Pune / Bangalore / Remote"

              required

            />

          </div>


          {/* TYPE + STATUS */}

          <div className="form-row">


            <div className="form-group">

              <label>
                Application Type
              </label>

              <select

                name="type"

                value={formData.type}

                onChange={handleChange}

              >

                <option value="Internship">
                  Internship
                </option>

                <option value="Full-time">
                  Full-time
                </option>

              </select>

            </div>


            <div className="form-group">

              <label>
                Current Status
              </label>

              <select

                name="status"

                value={formData.status}

                onChange={handleChange}

              >

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

            </div>

          </div>


          {/* DATES */}

          <div className="form-row">


            <div className="form-group">

              <label>
                Application Date
              </label>

              <input

                type="date"

                name="date"

                value={formData.date}

                onChange={handleChange}

                required

              />

            </div>


            <div className="form-group">

              <label>

                Interview Date

                <span className="optional">
                  Optional
                </span>

              </label>

              <input

                type="date"

                name="interviewDate"

                value={
                  formData.interviewDate
                }

                onChange={handleChange}

              />

            </div>

          </div>


          {/* IMPORTANT */}

          <div className="important-option">

            <label className="checkbox-container">

              <input

                type="checkbox"

                checked={
                  formData.important
                }

                onChange={
                  handleImportantChange
                }

              />

              <span className="custom-checkbox"></span>

              <span className="important-text">

                ⭐ Mark this application as important

              </span>

            </label>

          </div>


          {/* JOB LINK */}

          <div className="form-group">

            <label>
              Job Posting Link
            </label>

            <input

              type="url"

              name="link"

              value={formData.link}

              onChange={handleChange}

              placeholder="https://..."

            />

          </div>


          {/* NOTES */}

          <div className="form-group">

            <label>
              Notes
            </label>

            <textarea

              name="notes"

              value={formData.notes}

              onChange={handleChange}

              placeholder="Add interview details or other notes..."

              rows="4"

            />

          </div>


          {/* BUTTONS */}

          <div className="form-buttons">


            <button

              type="button"

              className="cancel-btn"

              onClick={onClose}

              disabled={saving}

            >

              Cancel

            </button>


            <button

              type="submit"

              className="save-btn"

              disabled={saving}

            >

              {saving ? (

                <>
                  <span className="button-spinner"></span>
                  Saving...
                </>

              ) : (

                editingApplication
                  ? "Save Changes"
                  : "Add Application"

              )}

            </button>

          </div>


        </form>

      </div>

    </div>

  );

}


export default ApplicationForm;