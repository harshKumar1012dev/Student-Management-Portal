import { useState, useEffect } from "react";

function StudentForm({ onSubmit, editing }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: ""
  });

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      onSubmit(editing._id, form);
    } else {
      onSubmit(form);
    }
    setForm({ name: "", email: "", course: "" });
  };

  return (
    <form className="grid gap-4 md:grid-cols-3 mb-6" onSubmit={handleSubmit}>
      
      <input
        className="p-3 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="p-3 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        className="p-3 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400"
        placeholder="Course"
        value={form.course}
        onChange={(e) => setForm({ ...form, course: e.target.value })}
      />

      <button className="md:col-span-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold py-3 rounded-xl hover:scale-105 transition">
        {editing ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}

export default StudentForm;