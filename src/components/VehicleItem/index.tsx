import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useRents } from '../../hooks/useRents';
import { useVehicles } from '../../hooks/useVehicles';
import { useAuth } from '../../contexts/AuthContext';

import * as S from './style';

export interface IVehicleItemProps {
}

interface PageParams {
  id: string;
}

export default function VehicleItem (props: IVehicleItemProps) {
  const pageParams = useParams<PageParams>();
  const { user } = useAuth();
  const { selectedVehicle, getVehicleById } = useVehicles();
  const { submitRent } = useRents();

  const [rentStart, setRentStart] = useState<string>(new Date().toISOString().substring(0,10));
  const [rentEnd, setRentEnd] = useState<string>(new Date().toISOString().substring(0,10));

  useEffect(() => {
    getVehicleById(pageParams.id);
  }, []);

  async function handleRentSubmit(event: FormEvent) {
    event.preventDefault();
    submitRent({
      vehicleId: pageParams.id,
      userId: user?.id || '',
      rentStartAt: new Date(rentStart),
      rentEndAt: new Date(rentEnd),
    })
  }

  if (!selectedVehicle) {
    return null;
  }

  return (
    <S.Container>
      {!!selectedVehicle.image && (
        <S.ImageContainer>
          <img src={"data:image/jpeg;base64," + selectedVehicle.image} />
        </S.ImageContainer>
      )}
      <S.ItemInformation>
        <form onSubmit={handleRentSubmit}>
          <S.FormRow>
            <S.FormItem>
              <label htmlFor="">Marca</label>
              <input disabled value={selectedVehicle.mark.name} />
            </S.FormItem>
            <S.FormItem>
              <label htmlFor="">Modelo</label>
              <input disabled value={selectedVehicle.model} />
            </S.FormItem>
          </S.FormRow>
          <S.FormRow>
            <S.FormItem>
              <label htmlFor="">Ano</label>
              <input disabled value={selectedVehicle.fabricationYear} />
            </S.FormItem>
            <S.FormItem>
              <label htmlFor="">Cor</label>
              <input disabled value={selectedVehicle.color} />
            </S.FormItem>
            <S.FormItem>
              <label htmlFor="">Quilometragem</label>
              <input disabled value={`${selectedVehicle.mileage} Km`} />
            </S.FormItem>
          </S.FormRow>

          <S.FormRow>
            <S.FormItem>
              <label htmlFor="">Data de início da alocação</label>
              <input type="date" value={rentStart} onChange={e => setRentStart(e.target.value)} />
            </S.FormItem>
            <S.FormItem>
              <label htmlFor="">Data de fim da alocação</label>
              <input type="date" value={rentEnd} onChange={e => setRentEnd(e.target.value)} />
            </S.FormItem>
            <S.FormItem>
              <button type="submit">Alugar</button>
            </S.FormItem>
          </S.FormRow>
        </form>
      </S.ItemInformation>
    </S.Container>
  );
}
