import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  IconButton,
  Box,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import api from '../utils/api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const response = await api.get('/notifications/');
      setNotifications(response.data);
    } catch (error) {
      alert('Failed to fetch notifications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await api.post(`/notifications/${id}/read/`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch (error) {
      alert('Failed to mark notification as read.');
    }
  };

  if (loading) {
    return (
      <Typography variant="h6" align="center" mt={4}>
        Loading notifications...
      </Typography>
    );
  }

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Notifications
        </Typography>
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
          {notifications.length > 0 ? (
            <List>
              {notifications.map((n) => (
                <ListItem
                  key={n.id}
                  secondaryAction={
                    !n.is_read && (
                      <IconButton
                        edge="end"
                        aria-label="read"
                        onClick={() => handleMarkAsRead(n.id)}
                      >
                        <CheckCircleOutlineIcon color="primary" />
                      </IconButton>
                    )
                  }
                  sx={{
                    bgcolor: n.is_read ? 'background.paper' : 'grey.100',
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle1"
                        fontWeight={n.is_read ? 'normal' : 'bold'}
                      >
                        {n.title}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontStyle={n.is_read ? 'italic' : 'normal'}
                      >
                        {n.message}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1" align="center" color="text.secondary">
              No notifications.
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Notifications;