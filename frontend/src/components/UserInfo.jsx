// src/components/UserInfo.js
import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function UserInfo() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem("user");
    window.location.reload(); // or redirect
  };

  return (
    <div className="p-4 text-sm bg-white rounded shadow">
      <p>👤 {user.displayName}</p>
      <p>📧 {user.email}</p>
      <button onClick={handleLogout} className="mt-2 text-red-600 text-xs hover:underline">
        🚪 Logout
      </button>
    </div>
  );
}
