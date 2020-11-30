import React, { useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { getPunishments, Punishment } from './hooks/service-hooks';
import { PunishmentTable } from './components/punishment-table';
import styled from 'styled-components';

const Spacer = styled.div`
    padding: 32px 0 32px 0;
`;

const App = () => {
    const [data, setData] = useState<Punishment[]>([]);
    const [loading, setLoading] = useState(true);
    const [pageCount, setPageCount] = useState(0);
    const fetchIdRef = React.useRef(0);

    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
        const fetchId = ++fetchIdRef.current;
        setLoading(true);

        setTimeout(() => {
            if (fetchId === fetchIdRef.current) {
                const startRow = pageSize * pageIndex;
                const endRow = startRow + pageSize;
                const punishmentData = getPunishments({ pageSize: pageSize, pageIndexRequest: pageIndex });
                setData(punishmentData.slice(startRow, endRow));

                setPageCount(Math.ceil(punishmentData.length / pageSize));

                setLoading(false);
            }
        }, 100);
    }, []);

    return (
        <div className="App">
            <Container>
                <Spacer>
                    <PunishmentTable punishmentData={data} fetchData={fetchData} controlledPageCount={pageCount} />
                </Spacer>
            </Container>
        </div>
    );
};

export default App;
