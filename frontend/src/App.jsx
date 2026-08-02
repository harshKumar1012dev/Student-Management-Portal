import { useEffect, useState } from "react";
import axios from "axios";
import StudentForm from "./Components/StudentForm";
import StudentList from "./Components/StudentList";

const API = "http://localhost:5000/students";

function App() {
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchStudents = async () => {
    const res = await axios.get(API);
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (data) => {
    await axios.post(API, data);
    fetchStudents();
  };

  const updateStudent = async (id, data) => {
    await axios.put(`${API}/${id}`, data);
    setEditing(null);
    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchStudents();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      
      <div className="w-full max-w-5xl backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-6 md:p-10">
        
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
           Student Management System
        </h1>

        <StudentForm
          onSubmit={editing ? updateStudent : addStudent}
          editing={editing}
        />

        <StudentList
          students={students}
          onEdit={setEditing}
          onDelete={deleteStudent}
        />
      </div>
    </div>
  );
}

export default App;