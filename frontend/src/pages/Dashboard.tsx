import { CalendarMonth, EventAvailable, EventBusy, People } from "@mui/icons-material";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" fontWeight='bold' mb={3}>Dashboard</Typography>
      <Grid container spacing={3} justifyContent={'space-between'}>
        <Grid sx={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ backgroundColor: '#1976d2', color: '#fff' }}>
            <CardContent>
              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Box>
                  <Typography variant="h4">3</Typography>
                  <Typography variant="body1">Total Patients</Typography>
                </Box>
                <People sx={{ fontSize: 50, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid sx={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ backgroundColor: '#338e3c', color: '#fff' }}>
            <CardContent>
              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Box>
                  <Typography variant="h4">3</Typography>
                  <Typography variant="body1">Total Appointments</Typography>
                </Box>
                <CalendarMonth sx={{ fontSize: 50, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid sx={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ backgroundColor: '#f57c00', color: '#fff' }}>
            <CardContent>
              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Box>
                  <Typography variant="h4">3</Typography>
                  <Typography variant="body1">Scheduled</Typography>
                </Box>
                <EventAvailable sx={{ fontSize: 50, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid sx={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ backgroundColor: '#d32f2f', color: '#fff' }}>
            <CardContent>
              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Box>
                  <Typography variant="h4">0</Typography>
                  <Typography variant="body1">Cancelled</Typography>
                </Box>
                <EventBusy sx={{ fontSize: 50, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Box>
  )
}
