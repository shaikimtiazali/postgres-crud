const express = require("express");
const studentRoutes = require("./src/student/routes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/v1/students", studentRoutes);

app.get("/", (req, res) => {
  const html = `<h1>Hello World</h1>`;
  res.send(html);
});
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
