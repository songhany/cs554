const express = require("express");
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    res.render("others/pokeBall", { 
      title: "Songhan's portfolio",
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;