import React from 'react';
import { Container, Typography, Link, List, ListItem } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
    return (
        <Container sx={{mt: 'auto'}}>
            <footer style={{marginTop: 20,  display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '1.5rem 0', borderTop: '1px solid #dee2e6' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" color="textSecondary">© 2023 Company, Inc</Typography>
                </div>

                <List sx={{ display: 'flex', listStyle: 'none', p: 0 }}>
                    <ListItem className="ms-3">
                        <Link href="#" color="textSecondary">
                            <TwitterIcon />
                        </Link>
                    </ListItem>
                    <ListItem className="ms-3">
                        <Link href="#" color="textSecondary">
                            <InstagramIcon />
                        </Link>
                    </ListItem>
                    <ListItem className="ms-3">
                        <Link href="#" color="textSecondary">
                            <FacebookIcon />
                        </Link>
                    </ListItem>
                </List>
            </footer>
        </Container>
    );
};

export default Footer;
