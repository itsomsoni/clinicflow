import { LocalHospital } from "@mui/icons-material";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <LocalHospital sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                    ClinicFlow
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button color="inherit" component={Link} to="/">
                        Dashboard
                    </Button>
                    <Button color="inherit" component={Link} to="/patients">
                        Patient
                    </Button>
                    <Button color="inherit" component={Link} to="/appointments">
                        Appointments
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
