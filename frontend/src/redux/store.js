import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { noticeReducer } from './noticeRelated/noticeSlice';
import { sclassReducer } from './sclassRelated/sclassSlice';
import { teacherReducer } from './teacherRelated/teacherSlice';
import { complainReducer } from './complainRelated/complainSlice';
import timetableReducer from './timetableRelated/timetableSlice';
import examTimetableReducer from './examTimetableRelated/examTimetableSlice';
import assignmentReducer from './assignmentRelated/assignmentSlice';
import { eventReducer } from './eventRelated/eventSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        teacher: teacherReducer,
        notice: noticeReducer,
        complain: complainReducer,
        sclass: sclassReducer,
        timetable: timetableReducer,
        examTimetable: examTimetableReducer,
        assignment: assignmentReducer,
        event: eventReducer
    },
});

export default store;
