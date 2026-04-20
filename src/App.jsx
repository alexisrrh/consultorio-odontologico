import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./rutas/ProtectedRoute";

import Home from "./paginas/Home";
import Login from "./paginas/Login";
import RegistroCliente from "./paginas/RegistroCliente";
import AgendarCita from "./paginas/AgendarCita";
import Miscitas from "./paginas/Miscitas";
import DashboardMedico from "./paginas/DashboardMedico";
import CitasMedico from "./paginas/CitasMedico";
import PacienteDetalles from "./paginas/PacienteDetalles";
import PanelClinico from "./paginas/PanelClinico";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro-cliente" element={<RegistroCliente />} />

          <Route path="/agendar-cita" element={<ProtectedRoute allowedRoles={["cliente"]}>
                <AgendarCita />
              </ProtectedRoute>
            }
          />

          <Route path="/mis-citas" element={<ProtectedRoute allowedRoles={["cliente"]}>
                <Miscitas />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard-medico" element={<ProtectedRoute allowedRoles={["medico"]}>
                <DashboardMedico />
              </ProtectedRoute>
            }
          />

          <Route path="/citas-medico" element={ <ProtectedRoute allowedRoles={["medico"]}>
            <CitasMedico />
              </ProtectedRoute>
            }
          />

          <Route path="/paciente/:id"element={<ProtectedRoute allowedRoles={["medico"]}> 
            <PacienteDetalles />
              </ProtectedRoute>
            }
          />

          <Route path="/panel-clinico"element={  <ProtectedRoute allowedRoles={["medico"]}> <PanelClinico />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;