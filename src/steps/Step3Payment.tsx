import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert, Box, Button, Card, CardContent, Grid,
  InputAdornment, TextField, Typography,
} from '@mui/material';
import { CreditCard, Lock } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../app/store';
import { savePaymentInfo, goToStep } from '../features/onboarding/onboardingSlice';
import { PaymentInfo } from '../types';

const validationSchema = Yup.object({
  cardHolderName: Yup.string().min(2).required('Card holder name required'),
  cardNumber: Yup.string().matches(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, 'Must be 16 digits').required(),
  expiryDate: Yup.string().matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use MM/YY').required(),
  cvv: Yup.string().matches(/^\d{3,4}$/, '3 or 4 digits').required(),
});

const Step3Payment: React.FC = () => {
  const dispatch = useAppDispatch();
  const saved = useAppSelector((s) => s.onboarding.paymentInfo);

  const formik = useFormik<PaymentInfo>({
    initialValues: {
      cardHolderName: saved?.cardHolderName ?? '',
      cardNumber: saved?.cardNumber ?? '',
      expiryDate: saved?.expiryDate ?? '',
      cvv: saved?.cvv ?? '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(savePaymentInfo(values));
    },
  });

  const fmtCard = (v: string) =>
    v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

  const fmtExpiry = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <Alert severity="warning" icon={<Lock fontSize="small" />} sx={{ mb: 3, borderRadius: 2 }}>
        <strong>Demo only</strong> — do not enter real card details.
      </Alert>

      {/* Live card preview */}
      <Card sx={{ mb: 4, borderRadius: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <CardContent>
          <CreditCard sx={{ fontSize: 32, mb: 2, opacity: 0.8 }} />
          <Typography variant="h6" sx={{ letterSpacing: 3, fontFamily: 'monospace', mb: 1 }}>
            {formik.values.cardNumber || '•••• •••• •••• ••••'}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>CARD HOLDER</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {formik.values.cardHolderName || 'YOUR NAME'}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>EXPIRES</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {formik.values.expiryDate || 'MM/YY'}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField fullWidth label="Card Holder Name" name="cardHolderName"
            value={formik.values.cardHolderName} onChange={formik.handleChange} onBlur={formik.handleBlur}
            error={formik.touched.cardHolderName && Boolean(formik.errors.cardHolderName)}
            helperText={formik.touched.cardHolderName && formik.errors.cardHolderName} autoFocus />
        </Grid>
        <Grid size={12}>
          <TextField fullWidth label="Card Number" name="cardNumber"
            value={formik.values.cardNumber}
            onChange={(e) => formik.setFieldValue('cardNumber', fmtCard(e.target.value))}
            onBlur={formik.handleBlur}
            error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
            helperText={formik.touched.cardNumber && formik.errors.cardNumber}
            slotProps={{
              htmlInput: { maxLength: 19, inputMode: 'numeric' as const },
              input: { startAdornment: <InputAdornment position="start"><CreditCard color="action" /></InputAdornment> },
            }} />
        </Grid>
        <Grid size={6}>
          <TextField fullWidth label="Expiry (MM/YY)" name="expiryDate"
            value={formik.values.expiryDate}
            onChange={(e) => formik.setFieldValue('expiryDate', fmtExpiry(e.target.value))}
            onBlur={formik.handleBlur}
            error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
            helperText={formik.touched.expiryDate && formik.errors.expiryDate}
            slotProps={{ htmlInput: { maxLength: 5, inputMode: 'numeric' as const } }} />
        </Grid>
        <Grid size={6}>
          <TextField fullWidth label="CVV" name="cvv"
            value={formik.values.cvv}
            onChange={(e) => formik.setFieldValue('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
            onBlur={formik.handleBlur}
            error={formik.touched.cvv && Boolean(formik.errors.cvv)}
            helperText={formik.touched.cvv && formik.errors.cvv}
            slotProps={{
              htmlInput: { maxLength: 4, inputMode: 'numeric' as const },
              input: { startAdornment: <InputAdornment position="start"><Lock color="action" fontSize="small" /></InputAdornment> },
            }} />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button onClick={() => dispatch(goToStep(2))} variant="outlined" size="large"
          sx={{ px: 4, py: 1.5, borderRadius: 2 }}>← Back</Button>
        <Button type="submit" variant="contained" size="large"
          sx={{ px: 4, py: 1.5, borderRadius: 2, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontWeight: 700 }}>
          Complete →
        </Button>
      </Box>
    </Box>
  );
};

export default Step3Payment;