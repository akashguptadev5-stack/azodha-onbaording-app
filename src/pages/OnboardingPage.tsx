import React from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Card, CardContent, Container, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useAppSelector } from '../app/store';
import Step1Profile from '../steps/Step1Profile';
import Step2Songs from '../steps/Step2Songs';
import Step3Payment from '../steps/Step3Payment';
import Step4Success from '../steps/Step4Success';

const STEPS = ['Profile', 'Music', 'Payment', 'Done'];

const OnboardingPage: React.FC = () => {
  const currentStep = useAppSelector((s) => s.onboarding.currentStep);
  const isComplete = useAppSelector((s) => s.onboarding.isComplete);

  if (isComplete) return <Navigate to="/home" replace />;

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1Profile />;
      case 2: return <Step2Songs />;
      case 3: return <Step3Payment />;
      case 4: return <Step4Success />;
      default: return <Step1Profile />;
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #f5f7ff 0%, #f0f0ff 100%)',
      py: 4, px: 2,
    }}>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Welcome Aboard
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Complete your profile in just a few steps
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Stepper activeStep={currentStep - 1} alternativeLabel>
            {STEPS.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Card elevation={6} sx={{ borderRadius: 3, boxShadow: '0 8px 40px rgba(102,126,234,0.12)' }}>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            {renderStep()}
          </CardContent>
        </Card>

        {currentStep <= 3 && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
            Step {currentStep} of 3
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default OnboardingPage;                                                                              