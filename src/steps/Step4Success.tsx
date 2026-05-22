import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Zoom } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useAppDispatch } from '../app/store';
import { completeOnboarding } from '../features/onboarding/onboardingSlice';

const Step4Success: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(completeOnboarding());
  }, [dispatch]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', py: 4 }}>
      <Zoom in timeout={600}>
        <CheckCircle sx={{ fontSize: 100, color: 'success.main', mb: 3,
          filter: 'drop-shadow(0 4px 12px rgba(76,175,80,0.4))' }} />
      </Zoom>
      <Typography variant="h4" gutterBottom sx={{
        fontWeight: 800,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
        You're all set! 🎉
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400 }}>
        Your onboarding is complete. Welcome to the platform!
      </Typography>
      <Button onClick={() => navigate('/home', { replace: true })} variant="contained" size="large"
        sx={{
          px: 6, py: 1.8, borderRadius: 2, fontWeight: 700,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 8px 24px rgba(102,126,234,0.4)',
          '&:hover': { transform: 'translateY(-2px)', transition: 'all 0.2s' },
        }}>
        Go to Home Page →
      </Button>
    </Box>
  );
};

export default Step4Success;