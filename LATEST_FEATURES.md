# Latest Updates Summary

## 👥 Meet the Team
- **View More Button**: Replaced the description text with a "View More" button.
- **Functionality**: Clicking the button navigates to the team member's detailed profile page.
- **Styling**: Clean, outlined button that fills on hover.

## 🏗️ Projects Section
- **3D Effects**: Added 3D perspective and rotation on hover.
- **Moving Effects**: Images zoom and pop out (translateZ) on hover.
- **Animations**: Cards have a bouncy entrance and smooth hover transitions.

## 🚀 Careers Page
- **Application Forms**: Added comprehensive application forms inside the "Internship" and "Job" accordions.
- **Fields**:
  - Full Name
  - Email Address
  - Institute / University
  - Portfolio Upload (Image or URL)
  - Attachments Upload
  - Cover Letter / Details
- **Backend**:
  - Created `Application` model in MongoDB.
  - Created API route `/api/careers/apply` to handle submissions.
- **Admin**:
  - Created `/admin/careers` page to view and manage applications.

## 🗺️ Map Integration
- **Animations**:
  - **Scale In**: Map container scales in smoothly on load.
  - **Float**: "Find Us Here" badge floats up and down gently.
  - **Pulse**: Badge pulses to draw attention.

## 📋 How to Test

1.  **Meet the Team**: Go to `/about` and check the "View More" button on team cards.
2.  **Projects**: Go to `/projects` and hover over cards to see the 3D and moving effects.
3.  **Careers**:
    - Go to `/careers`.
    - Open an accordion (e.g., Internship).
    - Fill out the form and submit.
    - Go to `/admin/careers` to see the submitted application.
4.  **Map**: Go to `/contact` and observe the map entrance and badge animation.
