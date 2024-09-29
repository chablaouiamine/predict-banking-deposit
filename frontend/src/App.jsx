import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Container, Typography, Paper, Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 0, 0, 0.23)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 0, 0, 0.87)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiInputLabel-outlined': {
    transform: 'translate(14px, 16px) scale(1)',
  },
  '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
    transform: 'translate(14px, -6px) scale(0.75)',
  },
}));

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
    <StyledFormControl fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <StyledSelect
        labelId={`${name}-label`}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
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

  const formFields = [
    { left: { name: 'age', label: 'Age', type: 'number', props: { inputProps: { min: 0 } } },
      right: { name: 'job', label: 'Job', options: ['admin.', 'blue-collar', 'entrepreneur', 'housemaid', 'management', 'retired', 'self-employed', 'services', 'student', 'technician', 'unemployed', 'unknown'] } },
    { left: { name: 'marital', label: 'Marital Status', options: ['divorced', 'married', 'single'] },
      right: { name: 'education', label: 'Education', options: ['unknown', 'secondary', 'primary', 'tertiary'] } },
    { left: { name: 'default', label: 'Has Credit in Default?', options: ['yes', 'no'] },
      right: { name: 'balance', label: 'Balance', type: 'number', props: { helperText: 'Average yearly balance in euros' } } },
    { left: { name: 'housing', label: 'Has Housing Loan?', options: ['yes', 'no'] },
      right: { name: 'loan', label: 'Has Personal Loan?', options: ['yes', 'no'] } },
    { left: { name: 'contact', label: 'Contact Communication Type', options: ['unknown', 'telephone', 'cellular'] },
      right: { name: 'day', label: 'Day of Month', type: 'number', props: { inputProps: { min: 1, max: 31 }, helperText: 'Last contact day of the month' } } },
    { left: { name: 'month', label: 'Month', options: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'] },
      right: { name: 'duration', label: 'Duration', type: 'number', props: { inputProps: { min: 0 }, helperText: 'Last contact duration in seconds' } } },
    { left: { name: 'campaign', label: 'Campaign', type: 'number', props: { inputProps: { min: 1, step: 1 }, helperText: 'Number of contacts performed during this campaign' } },
      right: { name: 'pdays', label: 'Pdays', type: 'number', props: { inputProps: { min: -1 }, helperText: 'Number of days since last contact (-1 means never contacted)' } } },
    { left: { name: 'previous', label: 'Previous', type: 'number', props: { inputProps: { min: 0 }, helperText: 'Number of contacts before this campaign' } },
      right: { name: 'poutcome', label: 'Previous Outcome', options: ['unknown', 'failure', 'success'] } },
  ];

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bank Marketing Prediction
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {formFields.map((pair, index) => (
              <Grid item xs={12} key={index}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    {pair.left.options
                      ? renderDropdown(pair.left.name, pair.left.label, pair.left.options)
                      : renderField(pair.left.name, pair.left.label, pair.left.type, pair.left.props)}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {pair.right.options
                      ? renderDropdown(pair.right.name, pair.right.label, pair.right.options)
                      : renderField(pair.right.name, pair.right.label, pair.right.type, pair.right.props)}
                  </Grid>
                </Grid>
              </Grid>
            ))}
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