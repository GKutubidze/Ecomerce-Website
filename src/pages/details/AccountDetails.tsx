import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./AccountDetails.module.css";
import Header from "../../components/Header/Header";

const AccountDetails: React.FC = () => {
  const { user, changePassword } = useAuth();

  const [isEditingPassword, setIsEditingPassword] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword === confirmNewPassword) {
      try {
        await changePassword(currentPassword, newPassword);
        alert("Password changed successfully!");
        setIsEditingPassword(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } catch (error) {
        console.error("Password change failed:", (error as Error).message);
        alert("Failed to change password.");
      }
    } else {
      alert("New passwords do not match.");
    }
  };

  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.infoSection}>
        <label>First Name</label>
        <input
          type="text"
          value={user?.firstname || ""}
          readOnly
          className={styles.readonlyInput}
        />
        <label>Surname</label>
        <input
          type="text"
          value={user?.surname || ""}
          readOnly
          className={styles.readonlyInput}
        />
        <label>Email</label>
        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className={styles.readonlyInput}
        />
      </div>

      <div className={styles.passwordSection}>
        <button
          onClick={() => setIsEditingPassword(!isEditingPassword)}
          className={styles.changePasswordButton}
        >
          {isEditingPassword ? "Cancel" : "Change Password"}
        </button>
        {isEditingPassword && (
          <form onSubmit={handlePasswordChange} className={styles.passwordForm}>
            <label>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
            <button type="submit" className={styles.submitButton}>
              Change Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AccountDetails;
