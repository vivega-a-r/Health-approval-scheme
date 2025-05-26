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
## 🚀 Live Demo

You can access the deployed application here:  
v0-fully-functional-prototype.vercel.app

Feel free to explore and test all features live!

## 👩‍💻 Authors / Contributors

This project was developed by a team of 3 members:

- **Vivega A R** — [GitHub: vivega-a-r](https://github.com/vivega-a-r/Health-approval-scheme.git)  
- **Sumithra M** — [GitHub: Sumithra121](https://github.com/vivega-a-r/Health-approval-scheme.git)  
- **Parkavi K** — [GitHub: Parkavi29706](https://github.com/vivega-a-r/Health-approval-scheme.git)  


## 📌 How to Run

1. Clone the repo  
   `git clone https://github.com/vivega-a-r/Health-approval-scheme.git`

2. Open `index.html` in a browser (if static)  
   OR  
   Use `npm run dev` for local development (if using a dev server like Vite)

---

## 📬 Contributions

This is a project done for academic purposes and is open for learning contributions.

---




