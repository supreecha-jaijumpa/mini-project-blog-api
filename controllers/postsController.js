import pool from "../db/pool.js";

export async function getPosts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const offset = (page - 1) * perPage;

    const result = await pool.query("SELECT * FROM posts LIMIT $1 OFFSET $2", [
      perPage,
      offset,
    ]);
    return res.json({ posts: result.rows, page, perPage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Database error" });
  }
}

export async function getPostById(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query(`SELECT * FROM posts WHERE id = $1`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.json({ post: result.rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Database error" });
  }
}

export async function createPost(req, res) {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const result = await pool.query(
      "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *",
      [title, content],
    );

    return res
      .status(201)
      .json({ message: "Create post successfully", post: result.rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Database error" });
  }
}
export async function updatePost(req, res) {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const result = await pool.query(
      "UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *",
      [title, content, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json({
      message: `Update post id ${id} successfully.`,
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Database error" });
  }
}

export async function deletePost(req, res) {
  try {
    const id = req.params.id;

    const result = await pool.query(
      "DELETE FROM posts WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json({
      message: `Delete post id ${id} successfully.`,
      post: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Database error" });
  }
}
