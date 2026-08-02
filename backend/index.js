const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();
const PORT = parseInt(process.env.PORT, 10) || 5000;

const Student = require("./models/student");

const app = express();
app.use(cors());
app.use(express.json());

let useMemoryStore = false;
const memoryStudents = [];

const getStudents = async () => {
  if (useMemoryStore) {
    return memoryStudents;
  }
  return Student.find();
};

const createStudent = async (data) => {
  if (useMemoryStore) {
    const student = { _id: `${Date.now()}`, ...data };
    memoryStudents.push(student);
    return student;
  }

  const student = new Student(data);
  await student.save();
  return student;
};

const updateStudent = async (id, data) => {
  if (useMemoryStore) {
    const index = memoryStudents.findIndex((student) => student._id === id);
    if (index === -1) {
      return null;
    }

    memoryStudents[index] = { ...memoryStudents[index], ...data };
    return memoryStudents[index];
  }

  return Student.findByIdAndUpdate(id, data, { new: true });
};

const deleteStudent = async (id) => {
  if (useMemoryStore) {
    const index = memoryStudents.findIndex((student) => student._id === id);
    if (index === -1) {
      return false;
    }

    memoryStudents.splice(index, 1);
    return true;
  }

  const deletedStudent = await Student.findByIdAndDelete(id);
  return Boolean(deletedStudent);
};

app.get("/students", async (req, res) => {
  try {
    const students = await getStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/students", async (req, res) => {
  try {
    const student = await createStudent(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/students/:id", async (req, res) => {
  try {
    const student = await updateStudent(req.params.id, req.body);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const deleted = await deleteStudent(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

(async () => {
  useMemoryStore = !(await connectDB());
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();