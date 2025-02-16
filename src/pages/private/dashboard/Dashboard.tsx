import {
  Assignment,
  AttachMoney,
  Inventory,
  People,
  Person,
  ShoppingCart,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid2 as Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useThemeContext } from "../../../core/context/use/useThemeContext";
import { useBusinessStore } from "../../../core/store/business.store";

const Dashboard = () => {
  const { selectedTheme } = useThemeContext();
  const { business } = useBusinessStore();
  const theme = useTheme();

  const [loading, setLoading] = useState(true);

  // Función para cargar los datos
  const loadDashboardData = useCallback(async () => {
    if (!business?.id) return;

    setLoading(true);
    try {
      // Aquí irían las llamadas a los servicios correspondientes
      // Por ahora usamos datos de ejemplo
      // TODO: Implementar las llamadas reales a los servicios

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      setLoading(false);
    }
  }, [business?.id]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Componente para las tarjetas de estadísticas
  const StatCard = ({
    title,
    value,
    icon,
    color,
  }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
  }) => (
    <Card
      sx={{ height: "100%", backgroundColor: selectedTheme.background_color }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="subtitle2"
              color={selectedTheme.text_color}
              gutterBottom
            >
              {title}
            </Typography>
            <Typography variant="h4" color={selectedTheme.text_color}>
              {value}
            </Typography>
          </Box>
          <IconButton sx={{ backgroundColor: `${color}15`, color: color }}>
            {icon}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ width: "100%", mt: 2 }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" color={selectedTheme.text_color} gutterBottom>
        Dashboard
      </Typography>

      {/* Grid de estadísticas principales */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Ventas Totales"
            value="$25,500"
            icon={<AttachMoney />}
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Clientes Activos"
            value="124"
            icon={<People />}
            color={theme.palette.info.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Productos"
            value="45"
            icon={<Inventory />}
            color={theme.palette.warning.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Tareas Pendientes"
            value="8"
            icon={<Assignment />}
            color={theme.palette.error.main}
          />
        </Grid>
      </Grid>

      {/* Gráficas y listas */}
      <Grid container spacing={3}>
        {/* Ventas Recientes */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2, backgroundColor: selectedTheme.background_color }}>
            <Typography
              variant="h6"
              color={selectedTheme.text_color}
              gutterBottom
            >
              Ventas Recientes
            </Typography>
            <List>
              {[1, 2, 3].map((item) => (
                <ListItem key={item} divider>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                      <ShoppingCart />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography color={selectedTheme.text_color}>
                        Venta #00{item}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        color={selectedTheme.text_color}
                      >
                        $1,200 - hace 2 horas
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Empleados Activos */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2, backgroundColor: selectedTheme.background_color }}>
            <Typography
              variant="h6"
              color={selectedTheme.text_color}
              gutterBottom
            >
              Empleados Activos
            </Typography>
            <List>
              {[1, 2, 3].map((item) => (
                <ListItem key={item} divider>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                      <Person />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography color={selectedTheme.text_color}>
                        Empleado {item}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        color={selectedTheme.text_color}
                      >
                        Último acceso: hace 30 min
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
