import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container,Box } from '@mui/material';

const FirstPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Check if all fields are filled
        if (name && phone && email) {
            // Save user details in localStorage
            localStorage.setItem('userDetails', JSON.stringify({ name, phone, email }));

            // Navigate to the second page
            navigate('/second-page');
        } else {
            // Redirect back to the first page with an error message
            alert('Please enter all details before proceeding.');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
            <Box sx={{ width: '100%', p: 3 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Welcome to My App
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                        Submit
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default FirstPage;
