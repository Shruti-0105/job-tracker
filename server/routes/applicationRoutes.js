const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(
  __dirname,
  "../data/applications.json"
);


// ==========================================
// READ APPLICATIONS
// ==========================================

function getApplications() {

  const data = fs.readFileSync(
    filePath,
    "utf-8"
  );

  return JSON.parse(data);
}


// ==========================================
// SAVE APPLICATIONS
// ==========================================

function saveApplications(applications) {

  fs.writeFileSync(
    filePath,
    JSON.stringify(applications, null, 2)
  );

}


// ==========================================
// GET ALL APPLICATIONS
// ==========================================

router.get("/", (req, res) => {

  try {

    const applications = getApplications();

    res.json(applications);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch applications"
    });

  }

});


// ==========================================
// ADD NEW APPLICATION
// ==========================================

router.post("/", (req, res) => {

  try {

    const applications = getApplications();

    const newApplication = {

      id: Date.now(),

      company: req.body.company,

      role: req.body.role,

      location: req.body.location,

      type: req.body.type,

      status: req.body.status,

      date: req.body.date,

      // ⭐ NEW
      interviewDate: req.body.interviewDate || "",

      // ⭐ NEW
      important: req.body.important || false,

      link: req.body.link,

      notes: req.body.notes

    };


    applications.push(newApplication);

    saveApplications(applications);


    res.status(201).json(newApplication);

  } catch (error) {

    res.status(500).json({
      message: "Failed to add application"
    });

  }

});


// ==========================================
// UPDATE APPLICATION
// ==========================================

router.put("/:id", (req, res) => {

  try {

    const applications = getApplications();

    const id = Number(req.params.id);


    const index = applications.findIndex(
      (application) =>
        application.id === id
    );


    if (index === -1) {

      return res.status(404).json({
        message: "Application not found"
      });

    }


    applications[index] = {

      ...applications[index],

      company: req.body.company,

      role: req.body.role,

      location: req.body.location,

      type: req.body.type,

      status: req.body.status,

      date: req.body.date,

      // ⭐ NEW
      interviewDate: req.body.interviewDate || "",

      // ⭐ NEW
      important: req.body.important || false,

      link: req.body.link,

      notes: req.body.notes

    };


    saveApplications(applications);


    res.json(applications[index]);

  } catch (error) {

    res.status(500).json({
      message: "Failed to update application"
    });

  }

});


// ==========================================
// DELETE APPLICATION
// ==========================================

router.delete("/:id", (req, res) => {

  try {

    const applications = getApplications();

    const id = Number(req.params.id);


    const filteredApplications =
      applications.filter(
        (application) =>
          application.id !== id
      );


    if (
      filteredApplications.length ===
      applications.length
    ) {

      return res.status(404).json({
        message: "Application not found"
      });

    }


    saveApplications(
      filteredApplications
    );


    res.json({
      message: "Application deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to delete application"
    });

  }

});


module.exports = router;