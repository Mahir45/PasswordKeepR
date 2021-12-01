const { Pool } = require("pg");
const db = require("../server");

// module.exports = (db) => {
  const addUser = function (users, db) {
    const queryString = `
    INSERT INTO users (name, email, password, organization_id, admin)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`;

    const values = [
      users.name,
      users.email,
      users.password,
      users.organization_id,
      users.isAdmin,
    ];
    return db
      .query(queryString, values)
      .then((res) => {
        return res.rows[0];
      })
      .catch((err) => {
        return console.log("query error:", err);
      });
  };

  const verifyEmail = function (newUser, databaseEmailsArray) {
    for (let item of databaseEmailsArray) {
      if (item.email === newUser.email) {
        return true;
      } else {
        console.log("im hanging");
        return false;
      }
    }
  };

  const users = function (db) {
    const queryString = `
    SELECT *
    FROM organization
    `;
    return db.query(queryString).then((res) => {
      console.log(res.rows);
      return res.rows[0];
    });
  };

  const getUserWithOrgId = function(id) {

    return db
      .query('SELECT * FROM passwords WHERE organization_id = $1', [id])
      .then((result) => {
        console.log("results----->",result.rows)
        return result.rows})
      .catch((error) => {
        console.log("error------->", error)
        return error;
      });
  };

  const getUserWithId = function(id) {

    return db
      .query('SELECT * FROM passwords WHERE user_id = $1', [id])
      .then((result) => {
        console.log("results----->",result.rows)
        return result.rows})
      .catch((error) => {
        console.log("error------->", error)
        return error;
      });
  };


  // const addPassword = function (passwords, db) {
  //   const queryString = `
  //   INSERT INTO passwords (user_id, website_url, website_username, website_password, category_id, organization_id)
  //   VALUES ($1, $2, $3, $4, $5, $6)
  //   RETURNING *;
  //   `;

  //   const queryParams = [
  //     password.user_id,
  //     passwords.website_url,
  //     passwords.website_username,
  //     passwords.website_password,
  //     passwords.category_id,
  //     passwords.organization_id,
  //   ];

  //   return db.query(queryString, queryParams).then((res) => {
  //     return res.rows[0].catch((err) => {
  //       console.log(err);
  //     });
  //   });
  // };

  module.exports = {
    // getUserByEmail,
    users,
    // createUserAccount,
    // verifyRegisterInfo,
    verifyEmail,
    addUser,
    getUserWithOrgId,
    getUserWithId
    // addPassword,
  };
// };
