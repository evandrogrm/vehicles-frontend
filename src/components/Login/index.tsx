import { FormEvent, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

import * as S from './style';

export interface ILoginProps {
}

interface LoginRequest {
  name: string;
  email: string;
}

export default function Login (props: ILoginProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { signIn } = useAuth();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const request: LoginRequest = {
      name,
      email
    }
    await signIn(request);
  }

  return (
    <S.Container>
        <form onSubmit={handleSubmit}>
            <div className="formItem">
                <label htmlFor="name">Nome</label>
                <input name="name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="formItem">
                <label htmlFor="email">E-mail</label>
                <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <button type="submit">Login</button>
        </form>
    </S.Container>
  );
}
