# 🏥 Health Data Information & Management System (HDIMS)

A fully functional prototype of a web-based health data management platform. HDIMS enables streamlined patient data collection and a multi-level scheme approval system involving Data Entry Users, Hospital Admins, District Admins, State Admins, and a Super Admin.

---

## 📌 Project Overview

HDIMS is designed to help manage health scheme data more effectively across different levels of administration. The system supports data entry, review, and approval across a structured role-based workflow.

---

## 🚀 Features

- 🔐 **Role-Based Login** for 5 types of users.
- 📄 **Dynamic Dashboards** based on user role.
- 📤 **Patient Data Submission** with disease-based scheme suggestions.
- ✅ **Approval Workflow** from Hospital to Super Admin.
- 📊 **Policy Recommendation** features for State Admins.
- 🛠 **Scheme Management** system for Super Admins.
- 💾 **Persistent Data** (data stays after refresh/system restart).

---

## 🧭 Workflow

### 1. Login Page
- User selects their role:  
  `Data Entry User | Hospital Admin | District Admin | State Admin | Super Admin`
- Enters username & password and logs in.

### 2. Data Entry User Dashboard
- Inputs: `Patient Name`, `Disease`.
- System suggests health schemes.
- Clicks "Submit" → Sent to Hospital Admin.

### 3. Hospital Admin Dashboard
- Views submitted data.
- Buttons: `Approve` / `Reject`.
- If approved → Moves to District Admin.

### 4. District Admin Dashboard
- Views hospital-approved cases.
- Buttons: `Approve` / `Reject`.
- If approved → Moves to State Admin.

### 5. State Admin Dashboard
- Views district-approved data.
- Features: `Data Analysis`, `Policy Recommendations`.
- Buttons: `Approve` / `Reject`.
- If approved → Moves to Super Admin.

### 6. Super Admin Dashboard
- Views state-approved cases.
- Final `Approve` button + ability to update scheme database.

---

## 🛠 Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **UI Framework**: Tailwind CSS
- **Deployment**: GitHub Pages (or Localhost)

---

## 🖥 Screenshots

> **Place all images in the `/public` folder.**

### 🔐 Login Page
![Login Page](public/login-page.png)

### 🧑‍💻 Data Entry User Dashboard
![Data Entry](public/data-entry-dashboard.png)

### 🏥 Hospital Admin Dashboard
![Hospital Admin](public/hospital-dashboard.png)

### 🏛 District Admin Dashboard
![District Admin](public/district-dashboard.png)

### 🏢 State Admin Dashboard
![State Admin](public/state-dashboard.png)

### 🛡 Super Admin Dashboard
![Super Admin](public/super-admin-dashboard.png)

---

## 🎯 Functional Requirements

- Role-based authentication and access control.
- Data flows through the hierarchy in stages.
- Approval/Rejection system at every level.
- Final approval and scheme management at Super Admin level.

---

## 📈 Non-Functional Requirements

- ✅ **Performance**: Fast rendering, smooth UI experience.
- 🔒 **Security**: Role-based view restrictions.
- 💡 **User Experience (UX)**: Simple and intuitive interface.
- 🧩 **Maintainability**: Modular and clean codebase.
- 📊 **Scalability**: Easily extendable for future modules.

---

## 📦 Folder Structure (VS Code)

---

## 👩‍💻 Author

**Vivega A R**  
GitHub: [vivega-a-r](https://github.com/vivega-a-r)

---

## 📜 License

This project is licensed under the MIT License.

---

## 📌 How to Run

1. Clone the repo  
   `git clone https://github.com/your-username/hdims.git`

2. Open `index.html` in a browser (if static)  
   OR  
   Use `npm run dev` for local development (if using a dev server like Vite)

---

## 📬 Contributions

This is a project done for academic purposes and is open for learning contributions.

---




