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
        // This will get called when the table needs new data
        // You could fetch your data from literally anywhere,
        // even a server. But for this example, we'll just fake it.

        // Give this fetch an ID
        const fetchId = ++fetchIdRef.current;

        // Set the loading state
        setLoading(true);

        // We'll even set a delay to simulate a server here
        setTimeout(() => {
            // Only update the data if this is the latest fetch
            if (fetchId === fetchIdRef.current) {
                const startRow = pageSize * pageIndex;
                const endRow = startRow + pageSize;
                setData(getPunishments().slice(startRow, endRow));

                // Your server could send back total page count.
                // For now we'll just fake it, too
                setPageCount(Math.ceil(getPunishments().length / pageSize));

                setLoading(false);
            }
        }, 10);
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
