import { useState } from "react";
import logo from "../assets/logo.svg";

function Navbar({ theme, changeTheme, profile, saveProfile }) {
    const [showProfileForm, setShowProfileForm] = useState(false);
    const [formProfile, setFormProfile] = useState(profile);

    const fullName = `${profile.firstName} ${profile.lastName}`;
    const initials = `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();

    function openProfileForm() {
        setFormProfile(profile);
        setShowProfileForm(true);
    }

    function closeProfileForm() {
        setShowProfileForm(false);
    }

    function updateProfileField(field, value) {
        setFormProfile({
            ...formProfile,
            [field]: value,
        });
    }

    function handleProfileSubmit(event) {
        event.preventDefault();

        if (formProfile.firstName.trim() === "" || formProfile.lastName.trim() === "") {
            return;
        }

        saveProfile({
            firstName: formProfile.firstName.trim(),
            lastName: formProfile.lastName.trim(),
            email: formProfile.email.trim(),
            phone: formProfile.phone.trim(),
        });
        closeProfileForm();
    }

    return (
        <nav className="navbar">
            <div className="nav-left">
                <img className="logo" src={logo} alt="Task Manager logo" />
                <h2>Task Manager</h2>
            </div>

            <div className="nav-right">
                <label className="theme-switch">
                    <input
                        type="checkbox"
                        checked={theme === "dark"}
                        onChange={changeTheme}
                    />
                    <span className="switch-slider"></span>
                </label>
                <button className="user-name" type="button" onClick={openProfileForm}>
                    {fullName}
                </button>
                <button className="profile-logo" type="button" onClick={openProfileForm}>
                    {initials}
                </button>

                {showProfileForm && (
                    <div className="profile-popup">
                        <form className="profile-form" onSubmit={handleProfileSubmit}>
                            <h3>Profile</h3>

                            <label>
                                First Name
                                <input
                                    type="text"
                                    value={formProfile.firstName}
                                    onChange={(event) => updateProfileField("firstName", event.target.value)}
                                    required
                                />
                            </label>

                            <label>
                                Last Name
                                <input
                                    type="text"
                                    value={formProfile.lastName}
                                    onChange={(event) => updateProfileField("lastName", event.target.value)}
                                    required
                                />
                            </label>

                            <label>
                                Email
                                <input
                                    type="email"
                                    value={formProfile.email}
                                    onChange={(event) => updateProfileField("email", event.target.value)}
                                />
                            </label>

                            <label>
                                Phone No.
                                <input
                                    type="tel"
                                    value={formProfile.phone}
                                    onChange={(event) => updateProfileField("phone", event.target.value)}
                                />
                            </label>

                            <div className="profile-actions">
                                <button className="action-button ghost" type="button" onClick={closeProfileForm}>
                                    Cancel
                                </button>
                                <button className="action-button edit" type="submit">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
