import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const About = () => {
    return (
        <Container maxWidth="md" style={{ marginTop: '2rem', marginBottom: '4rem' }}>
            <Paper elevation={3} style={{ padding: '2rem' }}>
                <Typography variant="h4" gutterBottom>
                    About Us
                </Typography>
                <Typography paragraph>
                    Welcome to our blogging platform! We are passionate about sharing knowledge, insights, and experiences
                    with our community. Our goal is to create a space where individuals can learn, connect, and grow together.
                </Typography>
                <Typography paragraph>
                    Meet the developer behind this platform: <strong>ABHISHEK KUMAR SHARMA</strong>. Abhishek is a dedicated
                    software developer with a passion for creating meaningful and impactful web applications.
                </Typography>
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut risus vel metus tincidunt gravida.
                    Nulla facilisi. Proin sit amet interdum elit. In hac habitasse platea dictumst.
                </Typography>
                <Typography paragraph>
                    Vestibulum euismod, purus at dignissim facilisis, quam felis ullamcorper neque, vel ullamcorper elit arcu
                    vel diam. Etiam ullamcorper elit at varius fermentum. Ut vel suscipit nisi. Duis in nunc sed quam
                    dapibus tincidunt. Integer id turpis in justo convallis egestas non ut mi.
                </Typography>
                <Typography paragraph>
                    Curabitur lacinia sem nec urna convallis, eu euismod dui tristique. Vivamus semper, velit id fermentum
                    consequat, ligula justo fringilla urna, a dapibus felis velit ut diam.
                </Typography>
                <Typography paragraph>
                    Thank you for being a part of our community! We hope you enjoy reading and sharing your own stories.
                </Typography>
            </Paper>
        </Container>
    );
};

export default About;
