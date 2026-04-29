import pool from "../db/pool.js";

export async function getUsers(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const offset = (page - 1) * perPage;

    const result = await pool.query("SELECT * FROM users LIMIT $1 OFFSET $2", [
      perPage,
      offset,
    ]);
    return res.json({ users: result.rows, page, perPage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Database error" });
  }
}

export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ user: result.rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Database error" });
  }
}

export async function createUser(req, res) {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email],
    );

    return res
      .status(201)
      .json({ message: "Create user successfully", user: result.rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Database error" });
  }
}

export async function updateUser(req, res) {
  try {
    const id = req.params.id;

    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: `Update user id ${id} successfully.`,
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Database error" });
  }
}

export async function deleteUser(req, res) {
  try {
    const id = req.params.id;

    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: `Delete user id ${id} successfully.`,
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Database error" });
  }
}
