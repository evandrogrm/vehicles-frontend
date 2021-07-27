import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Dashboard } from '../components/Dashboard';
import { Header } from '../components/Header';
import VehicleItem from '../components/VehicleItem';
import { AuthProvider } from '../contexts/AuthContext';
import { RentsProvider } from '../hooks/useRents';
import { VehiclesProvider } from '../hooks/useVehicles';
import Login from '../components/Login';
import { GlobalStyle } from '../styles/global';
import { PrivateRoute } from './PrivateRoute';
import { ProtectedRoute } from './ProtectedRoute';

export default function Routes () {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <AuthProvider>
            <PrivateRoute exact path="/login" component={Login} />
            <VehiclesProvider>
              <RentsProvider>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  />
                <ProtectedRoute path="/" component={Header} />
                <ProtectedRoute exact path="/veiculos" component={Dashboard} />
                <ProtectedRoute exact path="/veiculos/:id" component={VehicleItem} />
              </RentsProvider>
            </VehiclesProvider>
          </AuthProvider>
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
}
