import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box, Button, Card, CardContent, IconButton, InputAdornment,
  TextField, Typography, Alert, CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../app/store';
import { login, VALID_CREDENTIALS } from '../features/auth/authSlice';

const validationSchema = Yup.object({
  username: Yup.string().min(3).required('Username is required'),
  password: Yup.string().min(6).required('Password is required'),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const isOnboardingComplete = useAppSelector((s) => s.onboarding.isComplete);

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(isOnboardingComplete ? '/home' : '/onboarding', { replace: true });
    }
  }, [isAuthenticated, isOnboardingComplete, navigate]);

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      setLoginError(null);
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 600));
      if (values.username === VALID_CREDENTIALS.username && values.password === VALID_CREDENTIALS.password) {
        dispatch(login(values.username));
      } else {
        setLoginError('Invalid username or password.');
      }
      setIsLoading(false);
    },
  });

  return (
    <Box sx={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', p: 2,
    }}>
      <Card elevation={24} sx={{ width: '100%', maxWidth: 420, borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Box sx={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <LockOutlined sx={{ color: 'white', fontSize: 32 }} />
            </Box>
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center' }} gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 3 }}>
            Sign in to continue your onboarding
          </Typography>

          <Alert severity="info" sx={{ mb: 3, fontSize: '0.78rem' }}>
            <strong>Demo:</strong> user123 / password123
          </Alert>

          {loginError && <Alert severity="error" sx={{ mb: 2 }}>{loginError}</Alert>}

          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <TextField
              fullWidth id="username" name="username" label="Username"
              value={formik.values.username} onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              sx={{ mb: 2 }} autoFocus
            />
            <TextField
              fullWidth id="password" name="password" label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password} onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{ mb: 3 }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(p => !p)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button type="submit" fullWidth variant="contained" size="large"
              disabled={isLoading}
              sx={{
                py: 1.5, borderRadius: 2, fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}>
              {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Sign In'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;