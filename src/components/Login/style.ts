import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10%;
    align-items: center;

    span {
        font-size: 2rem;
        color: #4d4d4d;
    }
  
    form {
        display: inline-block;
        margin-left: auto;
        margin-right: auto;
        text-align: left;

        .formItem {
            margin-bottom: 2rem;
        }

        input {
            width: 100%;
            padding: 0 1.5rem;
            height: 4rem;
            border-radius: 0.25rem;
            border: 1px solid #d7d7d7;
            background: #e7e9ee;
            font-weight: 400;
            font-size: 1rem;
            &::placeholder {
                color: var(--text-body);
            }
            & + input {
                margin-top: 1rem;
            }
        }

        button {
            width: 100%;
            margin-top:1rem;
            font-size: 1rem;
            color: #FFF;
            background: var(--blue-light);
            border: 0;
            padding: 0 2rem;
            border-radius: 0.25rem;
            height: 3rem;
            transition: filter 0.2s;
            &:hover {
                filter: brightness(0.9);
            }
        }
    }
`;
