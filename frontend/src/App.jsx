import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Container, Typography, Paper, Grid, Box } from '@mui/material';

const App = () => {
  const [prediction, setPrediction] = useState(null);
  const [formData, setFormData] = useState({
    age: '', job: '', marital: '', education: '', default: '', balance: '', housing: '', loan: '',
    contact: '', day: '', month: '', duration: '', campaign: '', pdays: '', previous: '', poutcome: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderDropdown = (name, label, options) => (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select name={name} value={formData[name]} onChange={handleChange}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const renderField = (name, label, type = 'text', props = {}) => (
    <TextField
      fullWidth
      name={name}
      label={label}
      type={type}
      value={formData[name]}
      onChange={handleChange}
      {...props}
    />
  );

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bank Marketing Prediction
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              {renderField('age', 'Age', 'number', { inputProps: { min: 0 } })}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderDropdown('job', 'Job', ['admin.', 'blue-collar', 'entrepreneur', 'housemaid', 'management', 'retired', 'self-employed', 'services', 'student', 'technician', 'unemployed', 'unknown'])}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderDropdown('marital', 'Marital Status', ['divorced', 'married', 'single'])}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderDropdown('education', 'Education', ['unknown', 'secondary', 'primary', 'tertiary'])}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderDropdown('default', 'Has Credit in Default?', ['yes', 'no'])}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderField('balance', 'Balance', 'number', { helperText: 'Average yearly balance in euros' })}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderDropdown('housing', 'Has Housing Loan?', ['yes', 'no'])}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderDropdown('loan', 'Has Personal Loan?', ['yes', 'no'])}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderDropdown('contact', 'Contact Communication Type', ['unknown', 'telephone', 'cellular'])}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderField('day', 'Day of Month', 'number', { inputProps: { min: 1, max: 31 }, helperText: 'Last contact day of the month' })}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderDropdown('month', 'Month', ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'])}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderField('duration', 'Duration', 'number', { inputProps: { min: 0 }, helperText: 'Last contact duration in seconds' })}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderField('campaign', 'Campaign', 'number', { inputProps: { min: 1, step: 1 }, helperText: 'Number of contacts performed during this campaign' })}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderField('pdays', 'Pdays', 'number', { inputProps: { min: -1 }, helperText: 'Number of days since last contact (-1 means never contacted)' })}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderField('previous', 'Previous', 'number', { inputProps: { min: 0 }, helperText: 'Number of contacts before this campaign' })}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderDropdown('poutcome', 'Previous Outcome', ['unknown', 'failure', 'success'])}
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained" color="primary">
              Predict
            </Button>
          </Box>
        </Box>
        {prediction && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Prediction Result:</Typography>
            <Typography>Prediction: {prediction.prediction}</Typography>
            <Typography>Probability: {(prediction.probability * 100).toFixed(2)}%</Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default App;