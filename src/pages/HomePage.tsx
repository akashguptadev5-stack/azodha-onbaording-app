import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar, Box, Button, Card, CardContent, Chip, Container,
  Divider, Grid, List, ListItem, ListItemText, Typography,
} from '@mui/material';
import { Logout, MusicNote, CreditCard, Person } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../app/store';
import { logout } from '../features/auth/authSlice';
import { resetOnboarding } from '../features/onboarding/onboardingSlice';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const username = useAppSelector((s) => s.auth.username);
  const { personalProfile, songs, paymentInfo } = useAppSelector((s) => s.onboarding);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetOnboarding());
    navigate('/login', { replace: true });
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #f5f7ff 0%, #f0f0ff 100%)',
      py: 4, px: 2,
    }}>
      <Container maxWidth="md">
        {/* Top bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h5" sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Azodha
          </Typography>
          <Button startIcon={<Logout />} onClick={handleLogout}
            variant="outlined" color="error" size="small" sx={{ borderRadius: 2 }}>
            Logout
          </Button>
        </Box>

        {/* Welcome banner */}
        <Card elevation={0} sx={{
          borderRadius: 4, mb: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white', p: 1,
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar src={personalProfile?.profilePicture}
                sx={{ width: 72, height: 72, border: '3px solid white' }}>
                {personalProfile?.name?.[0] ?? username?.[0] ?? '?'}
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  Welcome, {personalProfile?.name ?? username}! 👋
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.5 }}>
                  Your onboarding is complete. Here's your profile summary.
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          {/* Personal Profile card */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card elevation={3} sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Person color="primary" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Personal Profile</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                {personalProfile ? (
                  <>
                    <Typography variant="body2" color="text.secondary">Name</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>{personalProfile.name}</Typography>
                    <Typography variant="body2" color="text.secondary">Email</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>{personalProfile.email}</Typography>
                    <Typography variant="body2" color="text.secondary">Age</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{personalProfile.age} years</Typography>
                  </>
                ) : (
                  <Typography variant="body2" color="text.secondary">No data</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Payment card */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card elevation={3} sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CreditCard color="primary" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Payment Info</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                {paymentInfo ? (
                  <>
                    <Typography variant="body2" color="text.secondary">Card Holder</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>{paymentInfo.cardHolderName}</Typography>
                    <Typography variant="body2" color="text.secondary">Card Number</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: 'monospace', mb: 1 }}>
                      •••• •••• •••• {paymentInfo.cardNumber.replace(/\s/g, '').slice(-4)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">Expires</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{paymentInfo.expiryDate}</Typography>
                  </>
                ) : (
                  <Typography variant="body2" color="text.secondary">No data</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Songs */}
          <Grid size={12}>
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <MusicNote color="primary" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Favorite Songs</Typography>
                  <Chip label={songs.length} size="small" color="primary" sx={{ ml: 'auto' }} />
                </Box>
                <Divider sx={{ mb: 1 }} />
                {songs.length > 0 ? (
                  <List dense>
                    {songs.map((song, i) => (
                      <ListItem key={song.id} sx={{ borderRadius: 2, '&:hover': { bgcolor: 'action.hover' } }}>
                        <MusicNote sx={{ mr: 1.5, color: 'primary.light', fontSize: 18 }} />
                        <ListItemText
                          primary={<Typography variant="body2" sx={{ fontWeight: 600 }}>{i + 1}. {song.title}</Typography>}
                          secondary={song.artist}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>No songs added</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;