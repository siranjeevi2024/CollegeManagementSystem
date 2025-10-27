# TODO: Add Automated Timetable Viewing for Teacher and Student Modules

## Steps to Complete:

1. **Create TeacherShowTimetable Component**
   - Create `frontend/src/pages/teacher/TeacherShowTimetable.js` based on admin ShowTimetable, adapted for teachers to view their class timetable.

2. **Create StudentShowTimetable Component**
   - Create `frontend/src/pages/student/StudentShowTimetable.js` based on admin ShowTimetable, adapted for students to view their class timetable.

3. **Update TeacherSideBar**
   - Add a new menu item for "Timetable" in `TeacherSideBar.js` linking to `/Teacher/timetable`.

4. **Update StudentSideBar**
   - Add a new menu item for "Timetable" in `StudentSideBar.js` linking to `/Student/timetable`.

5. **Update TeacherDashboard Routes**
   - Add route for `/Teacher/timetable` in `TeacherDashboard.js` to render `TeacherShowTimetable`.

6. **Update StudentDashboard Routes**
   - Add route for `/Student/timetable` in `StudentDashboard.js` to render `StudentShowTimetable`.

7. **Test the Implementation**
   - Verify that teachers and students can view the timetable for their respective classes.
