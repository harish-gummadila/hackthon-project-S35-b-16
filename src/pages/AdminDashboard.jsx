import React, { useEffect, useState } from "react";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Admin To-Do List States
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const devices = ["Desktop", "Mobile"];
  const locations = ["New York, USA", "Berlin, Germany", "Tokyo, Japan", "Hyderabad, India", "London, UK"];

  // 📌 Fake Initial Data (before API fetch)
  const fakeData = [
    {
      id: 101,
      first_name: "Alice",
      last_name: "Walker",
      email: "alice@example.com",
      lastLogin: "2025-05-10 09:45:00",
      ipAddress: "192.168.23.14",
      device: "Desktop",
      location: "New York, USA",
      loginAttempts: 7,
      loginSuccess: 6,
      accountStatus: "Active",
      riskLevel: "Low",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 102,
      first_name: "Bob",
      last_name: "Smith",
      email: "bob@example.com",
      lastLogin: "2025-05-09 22:30:00",
      ipAddress: "192.168.44.32",
      device: "Mobile",
      location: "London, UK",
      loginAttempts: 10,
      loginSuccess: 5,
      accountStatus: "Suspended",
      riskLevel: "High",
      avatar: "https://i.pravatar.cc/150?img=2"
    }
  ];

  const fetchUsers = async () => {
    try {
      const res = await fetch("https://reqres.in/api/users?page=1");
      const json = await res.json();
      const enrichedData = json.data.map((user, index) => {
        const attempts = Math.floor(Math.random() * 10) + 1;
        const success = Math.floor(Math.random() * attempts) + 1;
        const risk = success / attempts < 0.5 ? "High" : success / attempts < 0.8 ? "Medium" : "Low";
        return {
          ...user,
          lastLogin: randomDate(),
          loginAttempts: attempts,
          loginSuccess: success,
          accountStatus: Math.random() > 0.2 ? "Active" : "Suspended",
          ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          device: devices[Math.floor(Math.random() * devices.length)],
          location: locations[Math.floor(Math.random() * locations.length)],
          riskLevel: risk,
          first_name: `${user.first_name} ${index + 1}`, // Append index to avoid duplicates in names
        };
      });
      setUsers([...fakeData, ...enrichedData]);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  const randomDate = () => {
    const now = new Date();
    const past = new Date(now.getTime() - Math.random() * 1000000000);
    return past.toLocaleString();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard: " + text);
  };

  const riskColor = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700"
  };

  // ✅ To-Do List Logic
  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: newTask, done: false }]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="p-8 bg-black min-h-screen font-sans text-white">
      <h1 className="text-3xl font-bold mb-6">🛡️ Admin Dashboard</h1>

      {/* 📝 Confidential Admin To-Do List */}
      <div className="mb-10 bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">📋 Confidential To-Do List</h2>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add confidential task..."
            className="px-4 py-2 rounded-md border w-full max-w-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={addTask}
            className="bg-green-600 text-black px-4 py-2 rounded-md hover:bg-green-700"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2 max-w-xl">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-gray-700 px-4 py-2 rounded-lg shadow border"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  className="accent-green-600"
                />
                <span className={`text-white ${task.done ? "line-through text-gray-500" : ""}`}>
                  {task.title}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                ❌
              </button>
            </li>
          ))}
          {tasks.length === 0 && <p className="text-gray-500">No tasks yet. Add one above.</p>}
        </ul>
      </div>

      {/* 🔒 Existing Confidential User Cards + Table */}
      {loading ? (
        <div className="text-center">Loading confidential data...</div>
      ) : (
        <div className="space-y-10">
          {/* User Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-700 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-16 h-16 rounded-full border-2 border-green-500"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{user.first_name} {user.last_name}</h2>
                    <p className="text-sm">{user.email}</p>
                    <button
                      onClick={() => copyToClipboard(user.email)}
                      className="text-xs mt-1 text-blue-500 underline"
                    >
                      Copy Email
                    </button>
                  </div>
                </div>
                <div className="text-sm space-y-1">
                  <p><strong>Last Login:</strong> {user.lastLogin}</p>
                  <p><strong>IP Address:</strong> {user.ipAddress}
                    <button
                      onClick={() => copyToClipboard(user.ipAddress)}
                      className="ml-2 text-xs text-blue-500 underline"
                    >
                      Copy
                    </button>
                  </p>
                  <p><strong>Device:</strong> {user.device}</p>
                  <p><strong>Location:</strong> {user.location}</p>
                  <p><strong>Login Attempts:</strong> {user.loginAttempts}</p>
                  <p><strong>Success Rate:</strong> {Math.floor((user.loginSuccess / user.loginAttempts) * 100)}%</p>
                  <p><strong>Account Status:</strong> <span className={`font-medium ${user.accountStatus === "Active" ? "text-green-600" : "text-red-500"}`}>{user.accountStatus}</span></p>
                  <p><strong>Risk Level:</strong>
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${riskColor[user.riskLevel]}`}>
                      {user.riskLevel}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Table View */}
          <div className="bg-gray-800 rounded-lg shadow border overflow-x-auto">
            <table className="min-w-full text-sm text-left text-white">
              {/* Table content */}
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
