import { useState } from "react";

function StudentList({ students, onEdit, onDelete }) {
  const [search, setSearch] = useState("");

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        className="w-full p-3 rounded-xl mb-6 bg-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="🔍 Search student..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid gap-5 md:grid-cols-2">
        {filtered.map((student) => (
          <div
            key={student._id}
            className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-lg hover:shadow-2xl transition"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {student.name}
            </h2>
            <p className="text-gray-600">{student.email}</p>
            <p className="text-gray-500 text-sm">{student.course}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => onEdit(student)}
                className="flex-1 bg-yellow-400 text-black py-2 rounded-lg hover:opacity-90"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(student._id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:opacity-90"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentList;