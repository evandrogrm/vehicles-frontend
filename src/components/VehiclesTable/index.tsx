import { Link } from 'react-router-dom'
import { useVehicles } from "../../hooks/useVehicles";
import { Container } from "./styles";
import * as Icons from 'react-icons/all';
import { useEffect } from 'react';

export function VehiclesTable() {
  const { getVehicles, vehicles } = useVehicles()

  useEffect(() => {
    getVehicles();
  }, [])

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ano</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(vehicle => (
            <tr key={vehicle.id}>
              <td>{vehicle.mark.name}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.fabricationYear}</td>
              <td>
                <Link to={`/veiculos/${vehicle.id}`}>
                  <Icons.FaRegEdit size={18} color="515151" title="Alugar" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
