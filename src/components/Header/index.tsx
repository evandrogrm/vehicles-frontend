import { useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg'
import { useAuth } from '../../contexts/AuthContext'

import * as S from './style';

interface HeaderProps {
}

export function Header(props: HeaderProps) {
  const history = useHistory();
  const { signOut, isAuthenticated, user } = useAuth();
  if (!isAuthenticated) {
    return null;
  }

  return (
    <S.Container>
      <S.Content>
        <S.LogoContainer onClick={() => {history.push('/veiculos')}}>
          <img src={logoImg} alt="ciandt" />
          <span className="welcome">Olá, {user?.name}! :)</span>
        </S.LogoContainer>
        <span>Vehicles</span>
        <button type="button" onClick={signOut}>
          Logout
        </button>
      </S.Content>
    </S.Container>
  )
}
