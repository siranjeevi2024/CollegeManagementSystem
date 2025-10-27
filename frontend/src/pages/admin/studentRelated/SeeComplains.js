import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper, Box, Checkbox, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllComplains, deleteComplain } from '../../../redux/complainRelated/complainHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import TableTemplate from '../../../components/TableTemplate';

const SeeComplains = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const dispatch = useDispatch();

  const { complainsList, loading, error, response } = useSelector((state) => state.complain);
  const { currentUser } = useSelector((state) => state.user);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedComplainId, setSelectedComplainId] = useState(null);

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getAllComplains(currentUser._id, "Complain"));
    }
  }, [currentUser?._id, dispatch]);

  if (error) {
    console.error("Complain fetch error:", error);
  }

  const handleDeleteClick = (complainId) => {
    setSelectedComplainId(complainId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedComplainId) {
      try {
        await dispatch(deleteComplain(selectedComplainId));
        dispatch(getAllComplains(currentUser._id, "Complain"));
      } catch (error) {
        console.error("Failed to delete complaint:", error);
      }
    }
    setOpenDialog(false);
    setSelectedComplainId(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedComplainId(null);
  };

  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'rollNum', label: 'Roll No', minWidth: 100 },
    { id: 'department', label: 'Department', minWidth: 100 },
    { id: 'complaint', label: 'Complaint', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

  const complainRows =
    Array.isArray(complainsList) && complainsList.length > 0
      ? complainsList.map((complain) => {
          const date = new Date(complain?.date);
          const dateString =
            date.toString() !== "Invalid Date"
              ? date.toISOString().substring(0, 10)
              : "Invalid Date";

          return {
            user: complain?.user?.name ?? "Unknown User",
            rollNum: complain?.user?.rollNum ?? "N/A",
            department: complain?.user?.teachSclass?.sclassName || complain?.user?.sclassName?.sclassName || "N/A",
            complaint: complain?.complaint ?? "No complaint provided",
            date: dateString,
            id: complain?._id ?? Math.random().toString(36).slice(2),
          };
        })
      : [];

  const ComplainButtonHaver = ({ row }) => {
    return (
      <>
        <IconButton onClick={() => handleDeleteClick(row.id)}>
          <DeleteIcon color="error" />
        </IconButton>
      </>
    );
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {response ? (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              No Complains Right Now
            </Box>
          ) : (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              {Array.isArray(complainsList) && complainsList.length > 0 ? (
                <TableTemplate
                  buttonHaver={ComplainButtonHaver}
                  columns={complainColumns}
                  rows={complainRows}
                />
              ) : (
                <Box sx={{ padding: '16px', textAlign: 'center' }}>
                  No complaints available
                </Box>
              )}
            </Paper>
          )}
        </>
      )}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this complaint? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SeeComplains;
