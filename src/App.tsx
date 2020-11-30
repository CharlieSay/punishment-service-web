import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { getPunishments, Punishment } from './hooks/service-hooks';
import { PunishmentTable } from './components/punishment-table';
import styled from 'styled-components';

const Spacer = styled.div`
    padding: 32px 0 32px 0;
`;

const App = () => {
    const [data, setData] = useState<Punishment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setData(getPunishments());
        setIsLoading(false);
    });

    return (
        <div className="App">
            <Container>
                <Spacer>
                    {isLoading && <Spinner animation={'border'} variant={'dark'} />}
                    {!isLoading && <PunishmentTable punishmentData={data} />}
                </Spacer>
            </Container>
        </div>
    );
};

export default App;
