import { createContext, useEffect, useState, ReactNode, useContext } from 'react'
import { api } from '../services/api';

export interface Mark {
  id: string;
  name: string;
}

export interface Vehicle {
  id: string;
  mark: Mark;
  model: string;
  fabricationYear: number;
  image: string;
  color: string;
  mileage: number;
}

interface VehiclesProviderProps {
  children: ReactNode;
}

interface VehiclesContextData {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | undefined;
  getVehicles(): Promise<Vehicle[] | undefined>;
  getVehicleById(id: string): Promise<Vehicle | undefined>;
}

const VehiclesContext = createContext<VehiclesContextData>(
  {} as VehiclesContextData
);

export function VehiclesProvider({ children }: VehiclesProviderProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>();

  async function getVehicles(): Promise<Vehicle[] | undefined> {
    try {
      const response = await api.get('/vehicles');
      const vehicles = response.data.content;
      setVehicles(vehicles);
      return vehicles;
    } catch (error) {
      console.error(error);
    }
  }

  async function getVehicleById(id: string): Promise<Vehicle | undefined> {
    try {
      const response = await api.get<Vehicle>(`/vehicles/${id}`);
      const vehicle = response.data;
      setSelectedVehicle(vehicle);
      return vehicle;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <VehiclesContext.Provider value={{ vehicles, selectedVehicle, getVehicleById, getVehicles }}>
      {children}
    </VehiclesContext.Provider>
  );
}

export function useVehicles() {
  const context = useContext(VehiclesContext);
  return context;
}
