const express = require("express");
const db = require("./db");
const router = express.Router();

router.get("/", (req, res) => {
  db.find()
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "Could not retrieve" });
    });
});

router.get("/:id", (req, res) => {
  // console.log(req)
  const { id } = req.params;
  db.findById(id)
    .then(data => {
      if (data == 0) {
        res.status(404).json({ message: "Post does not exist." });
      } else {
        res.status(200).json(data);
      }
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "Could not be retrieved" });
    });
});

router.get("/:id/comments	", (req, res) => {
  console.log(req)
});

router.post("", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({ errorMessage: "Both title and contents required" });
  } else {
    db.insert({ title, contents })
      .then(data => {
        const  id = data.id
        db.findById(id)
          .then(data => {
              res.status(200).json(data);
          })
          .catch(() => {
            res.status(500).json({ errorMessage: "Could not be retrieved" });
          });
      })
      .catch(() => {
        res.status(500).json({ errorMessage: "Error while saving" });
      });
  }
});

router.post("/:id/comments", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

module.exports = router;
