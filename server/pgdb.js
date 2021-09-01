const Pool = require("pg").Pool;

const pool = new Pool({
    user: "xzswwgosozcife",
    password: "2d775b08e5dfe3fad99f48492ec9f37953a78f483c9b6feefb4141bac0d17208",
    database: "d4m3giq5muaksk",
    host: "ec2-23-21-4-7.compute-1.amazonaws.com",
    port: 5432,
      ssl: {
        rejectUnauthorized: false }

});

module.exports = pool;