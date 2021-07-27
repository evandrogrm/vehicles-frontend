import { createContext, ReactNode, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Vehicle } from './useVehicles';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Rent {
  id: string;
  vehicle: Vehicle;
  user: User;
  rentStartAt: Date;
  rentEndAt: Date;
}

interface RentsProviderProps {
  children: ReactNode;
}

interface RentSubmitInput {
  vehicleId: string;
  userId: string;
  rentStartAt: Date;
  rentEndAt: Date;
}

interface RentsContextData {
  submitRent(params: RentSubmitInput): Promise<void>;
  createdRent: Rent | undefined;
}

const RentsContext = createContext<RentsContextData>(
  {} as RentsContextData
);

export function RentsProvider({ children }: RentsProviderProps) {
  const [createdRent, setCreatedRent] = useState<Rent | undefined>();
  const history = useHistory();

  async function submitRent({ vehicleId, userId, rentStartAt, rentEndAt }: RentSubmitInput): Promise<void> {
    try {
      const response = await api.post<Rent>('/rents', {
        vehicleId,
        userId,
        rentStartAt,
        rentEndAt
      });
      setCreatedRent(response.data);

      toast.success('😎️ Carro alugado com sucesso!');

      history.push('/veiculos')
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        const message = error.response.data.message;
        if (message.startsWith('rent.beforeNow')) {
          toast.error('😕️ A data de aluguel deve ser depois da data atual!');
        }
        if (message.startsWith('rent.endBeforeStart')) {
          toast.error('😕️ A data de fim do aluguel deve ser depois ou igual a data de início!');
        }
        if (message.startsWith('rent.daysDifferenceGreaterThanMaximum')) {
          const [errorStr, paramsStr] = message.split('-#@#-');
          const params = JSON.parse(paramsStr);
          toast.error(`😕️ A quantidade de dias está maior que a máxima de 30 dias permitidos! (selecionados ${params[0]} dias)`);
        }
        if (message.startsWith('rent.vehicleAlreadyRent')) {
          toast.error(`😕️ O veículo já foi alugado neste período!`);
        }
        if (message.startsWith('rent.userAlreadyRent')) {
          toast.error(`😕️ Você já alugou neste período!`);
        }
      }
    }
  }

  return (
    <RentsContext.Provider value={{ submitRent, createdRent }}>
      {children}
    </RentsContext.Provider>
  );
}

export function useRents() {
  const context = useContext(RentsContext);
  return context;
}
