import React from 'react';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Card, CardContent, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { Add, Delete, MusicNote } from '@mui/icons-material';
import { v4 as uuid } from 'uuid';
import { useAppDispatch, useAppSelector } from '../app/store';
import { saveSongs, goToStep } from '../features/onboarding/onboardingSlice';
import { Song } from '../types';

const validationSchema = Yup.object({
  songs: Yup.array(Yup.object({
    title: Yup.string().required('Song title required'),
    artist: Yup.string().required('Artist required'),
  })).min(1),
});

const empty = (): Song => ({ id: uuid(), title: '', artist: '' });

const Step2Songs: React.FC = () => {
  const dispatch = useAppDispatch();
  const saved = useAppSelector((s) => s.onboarding.songs);

  const formik = useFormik({
    initialValues: { songs: saved.length > 0 ? saved : [empty()] },
    validationSchema,
    onSubmit: (values) => {
      dispatch(saveSongs(values.songs));
    },
  });

  return (
    <FormikProvider value={formik}>
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Add your all-time favorite songs!
        </Typography>
        <FieldArray name="songs">
          {({ push, remove }) => (
            <Box>
              {formik.values.songs.map((song, i) => {
                const err = (formik.errors.songs as any)?.[i];
                const touched = (formik.touched.songs as any)?.[i];
                return (
                  <Card key={song.id} variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
                    <CardContent sx={{ pb: '16px !important' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                        <MusicNote sx={{ color: 'primary.main', fontSize: 20 }} />
                        <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 600 }}>
                          Song #{i + 1}
                        </Typography>
                        {formik.values.songs.length > 1 && (
                          <Tooltip title="Remove">
                            <IconButton onClick={() => remove(i)} size="small"
                              sx={{ ml: 'auto', color: 'error.main' }}>
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField fullWidth label="Song Title" size="small"
                            name={`songs[${i}].title`} value={song.title}
                            onChange={formik.handleChange} onBlur={formik.handleBlur}
                            error={touched?.title && Boolean(err?.title)}
                            helperText={touched?.title && err?.title} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField fullWidth label="Artist" size="small"
                            name={`songs[${i}].artist`} value={song.artist}
                            onChange={formik.handleChange} onBlur={formik.handleBlur}
                            error={touched?.artist && Boolean(err?.artist)}
                            helperText={touched?.artist && err?.artist} />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                );
              })}
              <Button startIcon={<Add />} onClick={() => push(empty())}
                variant="outlined" sx={{ mt: 1, borderRadius: 2, borderStyle: 'dashed' }}>
                Add Another Song
              </Button>
            </Box>
          )}
        </FieldArray>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button onClick={() => dispatch(goToStep(1))} variant="outlined" size="large"
            sx={{ px: 4, py: 1.5, borderRadius: 2 }}>← Back</Button>
          <Button type="submit" variant="contained" size="large"
            sx={{ px: 4, py: 1.5, borderRadius: 2, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontWeight: 700 }}>
            Next →
          </Button>
        </Box>
      </Box>
    </FormikProvider>
  );
};

export default Step2Songs;