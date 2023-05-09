import { Box, Container, Paper, Typography } from "@mui/material";

export default function Footer() {
    return (
      <Paper sx={{
        marginTop: 'calc(10% + 60px)', 
        backgroundColor: 'primary.blue',
        }} component="footer" square variant="outlined">
        <Container maxWidth="lg">
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              mb: 2,
              mt: 2
            }}
          >
            <Typography variant="caption" color="white" sx={{textAlign: 'center'}}>
                Application created for educational purposes, non-profit, all rights reserved to <a style={{color: "white"}} href="https://www.leagueoflegends.com">Riot Games</a> ❤
            </Typography>
          </Box>
        </Container>
      </Paper>
    );
  }