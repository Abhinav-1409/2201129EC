const express = require("express");
const {getPopularPosts , getLatestPosts } = require("../controllers/post");
const router = express.Router();

router.get("/", (req, res) => {
    const { type } = req.query;

    if (type === "popular") {
        getPopularPosts(req, res);
    } else if (type === "latest") {
        getLatestPosts(req, res);
    } else {
        res.status(400).json({ message: "Invalid type parameter. Use 'type=popular' or 'type=latest'." });
    }
});

module.exports = router;