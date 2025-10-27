import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList, getClassDetails } from '../../redux/sclassRelated/sclassHandle';
import { BottomNavigation, BottomNavigationAction, Container, Paper, Table, TableBody, TableHead, TableRow, Typography } from '@mui/material';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart'

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const StudentSubjects = () => {

    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id])

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');
    const [allSubjects, setAllSubjects] = useState([]);

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails])

    useEffect(() => {
        if (subjectsList) {
            setAllSubjects(subjectsList);
        }
    }, [subjectsList]);

    useEffect(() => {
        dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        dispatch(getClassDetails(currentUser.sclassName._id, "Sclass"));
    }, [dispatch, currentUser.sclassName._id]);


    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const calculateGrade = (marks) => {
        if (marks >= 90) return 'O';
        if (marks >= 80) return 'A+';
        if (marks >= 70) return 'A';
        if (marks >= 60) return 'B+';
        if (marks >= 50) return 'B';
        if (marks >= 40) return 'C';
        return 'U';
    };

    const getGradeColor = (grade) => {
        const passGrades = ['O', 'A+', 'A', 'B+', 'B', 'C'];
        return passGrades.includes(grade) ? 'green' : 'red';
    };

    const getSubjectById = (subId) => {
        return allSubjects.find(subject => subject._id === subId);
    };

    const renderTableSection = () => {
        return (
            <>
                <Typography variant="h4" align="center" gutterBottom>
                    Exam Results
                </Typography>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>S.No</StyledTableCell>
                            <StyledTableCell>Subject Code</StyledTableCell>
                            <StyledTableCell>Subject</StyledTableCell>
                            <StyledTableCell>Grade</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {subjectMarks.map((result, index) => {
                            if (!result.subName || result.marksObtained === undefined || result.marksObtained === null) {
                                return null;
                            }
                            const subject = getSubjectById(result.subName._id);
                            const subCode = subject ? subject.subCode : 'N/A';
                            const grade = calculateGrade(result.marksObtained);
                            const color = getGradeColor(grade);
                            return (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{index + 1}</StyledTableCell>
                                    <StyledTableCell>{subCode}</StyledTableCell>
                                    <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                    <StyledTableCell sx={{ color: color, fontWeight: 'bold' }}>{grade}</StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
                        {subjectMarks.length === 0 && (
                            <TableRow>
                                <StyledTableCell colSpan={4} align="center">
                                    No results available yet.
                                </StyledTableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </>
        );
    };

    const renderChartSection = () => {
        // Filter valid marks for chart
        const validMarks = subjectMarks
            .filter(result => result.subName && result.marksObtained !== undefined && result.marksObtained !== null)
            .map(result => ({
                ...result,
                subName: result.subName.subName,
                marksObtained: result.marksObtained
            }));
        return <CustomBarChart chartData={validMarks} dataKey="marksObtained" />;
    };

    const renderClassDetailsSection = () => {
        return (
            <Container>
                <Typography variant="h4" align="center" gutterBottom>
                    Department Details
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Department : {sclassDetails && sclassDetails.sclassName}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Subjects:
                </Typography>
                {subjectsList &&
                    subjectsList.map((subject, index) => (
                        <div key={index}>
                            <Typography variant="subtitle1">
                                {subject.subName} ({subject.subCode})
                            </Typography>
                        </div>
                    ))}
            </Container>
        );
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {renderClassDetailsSection()}
                </div>
            )}
        </>
    );
};

export default StudentSubjects;