import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./AccountDetails.module.css";
import Header from "../../components/Header/Header";

const AccountDetails: React.FC = () => {
  const { user, changePassword } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword === confirmNewPassword) {
      try {
        await changePassword(currentPassword, newPassword);
        setSuccessMessage("Password changed successfully!");
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

      <div className={styles.section}>
        {/* <Panel /> */}

        <div className={styles.infoContainer}>
          <div className={styles.infoSection}>
            <div className={styles.names}>
              <label className={styles.label}>
                First Name
                <input
                  type="text"
                  value={user?.firstname || ""}
                  readOnly
                  className={styles.readonlyInput}
                />
              </label>
              <label className={styles.label}>
                Last Name
                <input
                  type="text"
                  value={user?.surname || ""}
                  readOnly
                  className={styles.readonlyInput}
                />
              </label>
            </div>

            <label className={styles.email}>
              Email
              <input
                type="Email Address"
                value={user?.email || ""}
                readOnly
                className={styles.readonlyInput}
              />
            </label>
          </div>

          <div className={styles.passwordSection}>
            <form
              onSubmit={handlePasswordChange}
              className={styles.passwordForm}
            >
              <label className={styles.passwordLabel}>
                Current Password
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </label>
              <label className={styles.passwordLabel}>
                New Password
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </label>
              <label className={styles.passwordLabel}>
                Confirm New Password
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </label>
              {successMessage && (
                <p className={styles.successMessage}>{successMessage}</p>
              )}
              <button type="submit" className={styles.submitButton}>
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
