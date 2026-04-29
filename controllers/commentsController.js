import pool from "../db/pool.js";

export async function getComments(req, res) {
  try {
    const postId = req.params.postId;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const offset = (page - 1) * perPage;

    const result = await pool.query(
      "SELECT * FROM comments WHERE post_id = $1 LIMIT $2 OFFSET $3",
      [postId, perPage, offset],
    );
    return res.json({ comments: result.rows, page, perPage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Database error" });
  }
}

export async function createComment(req, res) {
  try {
    const postId = req.params;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({ error: "Comment is required" });
    }

    const result = await pool.query(
      "INSERT INTO comments (comment, post_id) VALUES ($1. $2) RETURNING *",
      [comment, postId],
    );

    return res.status(201).json({
      message: "Create comment successfully",
      comment: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Database error" });
  }
}
