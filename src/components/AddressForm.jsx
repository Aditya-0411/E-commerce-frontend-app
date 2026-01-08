// src/components/AddressForm.jsx
import React, { useState, useEffect } from 'react';
import {
    Box, TextField, FormControl, InputLabel, Select, MenuItem, Button,
    Typography, CircularProgress, FormGroup, FormControlLabel, Checkbox, Grid
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

// Initial state outside component for reuse
const initialAddressState = {
    id: null,
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    pincode: '',
    address_type: 'home',
    is_default: false
};

const AddressForm = ({ currentAddress, onSave, onCancel }) => {
    const [formData, setFormData] = useState(initialAddressState);
    const [submitting, setSubmitting] = useState(false);
    const isEdit = !!formData.id;

    // Effect to populate form when editing
    useEffect(() => {
        if (currentAddress) {
            setFormData({ ...initialAddressState, ...currentAddress }); // Merge ensuring all fields exist
        } else {
            setFormData(initialAddressState); // Reset if adding new
        }
    }, [currentAddress]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await onSave(formData); // Let parent handle API call and feedback
            // Optionally reset form here if needed, but parent usually handles closing
        } catch (error) {
            // Error handling might be done in parent via toast
            console.error("Error passed to AddressForm onSave:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
                {isEdit ? 'Edit Address' : 'Add New Address'}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField fullWidth required label="Address Line 1" name="address_line_1" value={formData.address_line_1} onChange={handleChange} size="small" />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Address Line 2 (Optional)" name="address_line_2" value={formData.address_line_2} onChange={handleChange} size="small" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth required label="City" name="city" value={formData.city} onChange={handleChange} size="small" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth required label="State" name="state" value={formData.state} onChange={handleChange} size="small" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth required label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} inputProps={{ maxLength: 6, pattern: "[0-9]{6}" }} size="small" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required size="small">
                        <InputLabel>Type</InputLabel>
                        <Select label="Type" name="address_type" value={formData.address_type} onChange={handleChange}>
                            <MenuItem value="home">Home</MenuItem>
                            <MenuItem value="office">Office</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={formData.is_default} onChange={handleChange} name="is_default" />}
                            label="Set as default address"
                        />
                    </FormGroup>
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                <Button onClick={onCancel} variant="outlined" disabled={submitting}>Cancel</Button>
                <Button type="submit" variant="contained" startIcon={submitting ? <CircularProgress size={20} color="inherit"/> : <SaveIcon />} disabled={submitting}>
                    {isEdit ? 'Update Address' : 'Save Address'}
                </Button>
            </Box>
        </Box>
    );
};

export default AddressForm;