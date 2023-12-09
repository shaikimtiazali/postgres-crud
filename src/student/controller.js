const pool = require("../student/db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool.query(queries.getAllStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const createStudent = (req, res) => {
  const { name, email, age, dob } = req.body;
  // check if email exist
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.send("Email already Exists");
    } else {
      pool.query(
        queries.createStudent,
        [name, email, age, dob],
        (error, results) => {
          if (error) throw error;
          res.status(201).send("Student Created Successfully!");
        }
      );
    }
  });
};

const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.deleteStudent, [id], (error, results) => {
    if (error) throw error;
    res.status(200).send("Student details deleted Successfully");
  });
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, age, dob } = req.body;
  pool.query(
    queries.updateStudent,
    [id, name, email, age, dob],
    (error, results) => {
      if (error) throw error;
      res.status(200).send("Student details Updaded Successfully");
    }
  );
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
};
