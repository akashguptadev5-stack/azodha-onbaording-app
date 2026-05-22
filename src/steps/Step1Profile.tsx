import React, { useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Avatar, Box, Button, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { PhotoCamera, Person } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../app/store';
import { savePersonalProfile } from '../features/onboarding/onboardingSlice';

const validationSchema = Yup.object({
  name: Yup.string().min(2).required('Full name is required'),
  age: Yup.number().typeError('Must be a number').min(13).max(120).required('Age is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const Step1Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const saved = useAppSelector((s) => s.onboarding.personalProfile);
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(saved?.profilePicture ?? '');

  const formik = useFormik({
    initialValues: { name: saved?.name ?? '', age: saved?.age ?? '', email: saved?.email ?? '' },
    validationSchema,
    onSubmit: (values) => {
      dispatch(savePersonalProfile({ ...values, profilePicture: preview }));
    },
  });

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      {/* Avatar upload */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        <Box sx={{ position: 'relative', mb: 1 }}>
          <Avatar src={preview} sx={{ width: 100, height: 100, background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
            {!preview && <Person sx={{ fontSize: 50 }} />}
          </Avatar>
          <Tooltip title="Upload photo">
            <IconButton onClick={() => fileRef.current?.click()} size="small"
              sx={{ position: 'absolute', bottom: 0, right: -4, bgcolor: 'primary.main', color: 'white', width: 32, height: 32, '&:hover': { bgcolor: 'primary.dark' } }}>
              <PhotoCamera fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Typography variant="caption" color="text.secondary">Click camera to upload photo</Typography>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleImage} />
      </Box>

      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField fullWidth name="name" label="Full Name"
            value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name} autoFocus />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField fullWidth name="age" label="Age" type="number"
            value={formik.values.age} onChange={formik.handleChange} onBlur={formik.handleBlur}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField fullWidth name="email" label="Email" type="email"
            value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email} />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button type="submit" variant="contained" size="large"
          sx={{ px: 4, py: 1.5, borderRadius: 2, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontWeight: 700 }}>
          Next →
        </Button>
      </Box>
    </Box>
  );
};

export default Step1Profile;