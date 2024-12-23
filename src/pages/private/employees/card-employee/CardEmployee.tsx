import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

const worker = {
  name: "John Doe",
  position: "Software Engineer",
  email: "johndoe@example.com",
  phone: "123-456-7890",
  address: "123 Main St, Cityville, Country",
  id: "A12345",
  createdAt: "2023-01-01",
};

export const CardEmployee = () => {
  return (
    <Card
      sx={{ width: "100%", maxWidth: 400, margin: "0 auto", boxShadow: 3, borderRadius: 2 }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              backgroundColor: "var(--primary-color)",
              color: "white",
              width: 56,
              height: 56,
              border: "2px dashed",
            }}
          >
            {worker.name.charAt(0)}
          </Avatar>
        }
        title={<Typography variant="h6">{worker.name}</Typography>}
        subheader={
          <Typography variant="body2" color="text.secondary">
            {worker.position}
          </Typography>
        }
        action={
          <Button
            variant="contained"
            sx={{ backgroundColor: "var(--primary-color)", mt: 1 }}
          >
            Show Details
          </Button>
        }
      />
      <CardContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Email:</strong> {worker.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Phone:</strong> {worker.phone}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Address:</strong> {worker.address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>ID:</strong> {worker.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Created On:</strong> {worker.createdAt}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
