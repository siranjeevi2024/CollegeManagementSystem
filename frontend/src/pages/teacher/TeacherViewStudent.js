import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom'
import { Table, TableBody, TableHead, Chip } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const TeacherViewStudent = () => {

    const params = useParams()
    const dispatch = useDispatch();
    const { userDetails, response, loading, error } = useSelector((state) => state.user);

    const address = "Student"
    const studentID = params.id

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');


    useEffect(() => {
        if (userDetails) {
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
        }
    }, [userDetails]);

    const getGradeColor = (grade) => {
        const passGrades = ['O', 'A+', 'A', 'B+', 'B', 'C'];
        return passGrades.includes(grade) ? 'success' : 'error';
    };

    return (
        <>
            {loading
                ?
                <>
                    <div>Loading...</div>
                </>
                :
                <div>
                    Name: {userDetails.name}
                    <br />
                    Roll Number: {userDetails.rollNum}
                    <br />
                    Department: {sclassName.sclassName}
                    <br />
                    College: {studentSchool.schoolName}
                    <br /><br />

                    <h3>Student Results:</h3>

                    {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 &&
                        <Table>
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell>S.No</StyledTableCell>
                                    <StyledTableCell>Subject Code</StyledTableCell>
                                    <StyledTableCell>Subject</StyledTableCell>
                                    <StyledTableCell>Marks</StyledTableCell>
                                    <StyledTableCell>Grade</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {subjectMarks.map((result, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{index + 1}</StyledTableCell>
                                        <StyledTableCell>{result.subName.subCode || 'N/A'}</StyledTableCell>
                                        <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                        <StyledTableCell>{result.marksObtained || 'N/A'}</StyledTableCell>
                                        <StyledTableCell>
                                            <Chip
                                                label={result.grade || 'N/A'}
                                                color={getGradeColor(result.grade)}
                                                variant="outlined"
                                            />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    }
                    <br /><br /><br />
                </div>
            }
        </>
    )
}

export default TeacherViewStudent