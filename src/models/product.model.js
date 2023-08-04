const db = require("../config/postgres");

const getProduct = (params) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM products p";
    let queryParams = [];
    if (params.search) {
      const searchQuery = `%${params.search}%`;
      query += " WHERE p.name ILIKE $1";
      queryParams.push(searchQuery);
    }
    if (params.category) {
      if (queryParams.length === 0) {
        query += " WHERE";
      } else {
        query += " AND";
      }
      query += " p.categoryid = $" + (queryParams.length + 1);
      queryParams.push(params.category);
    }
    if (params.sort) {
      switch (params.sort) {
        case "cheapest":
          query += " ORDER BY p.price ASC";
          break;
        case "priciest":
          query += " ORDER BY p.price DESC";
          break;
        case "newest":
          query += " ORDER BY p.id DESC";
          break;
        case "latest":
          query += " ORDER BY p.id ASC";
          break;
        default:
          query += " ORDER BY p.id ASC";
      }
    } else {
      query += " ORDER BY p.id ASC";
    }
    if (params.page && params.limit) {
      const offset = (parseInt(params.page) - 1) * parseInt(params.limit);
      query += ` OFFSET $${queryParams.length + 1}`;
      queryParams.push(offset);
    }
    if (params.limit) {
      const limitQuery = parseInt(params.limit);
      query += ` LIMIT $${queryParams.length + 1}`;
      queryParams.push(limitQuery);
    }
    query += ";";
    db.query(query, queryParams, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

const storingProduct = (body, uploadResult) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO products (categoryid,sku,name,description,weight,length,height,price,image) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)";
    db.query(
      sql,
      [
        body.categoryid,
        body.sku,
        body.name,
        body.description,
        body.weight,
        body.length,
        body.height,
        body.price,
        uploadResult,
      ],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
};

const getDetailProduct = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM products WHERE id = $1";
    db.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = { getProduct, storingProduct, getDetailProduct };
