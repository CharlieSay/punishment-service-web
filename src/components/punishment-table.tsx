/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo } from 'react';
import { Table } from 'react-bootstrap';
import { useTable, usePagination } from 'react-table';
import { Punishment } from '../hooks/service-hooks';
interface PunishmentTableProps {
    punishmentData: Punishment[];
    fetchData: ({ pageSize, pageIndex }: any) => void;
    controlledPageCount: number;
}

export const PunishmentTable = (props: PunishmentTableProps) => {
    const columns = useMemo(
        () => [
            {
                Header: 'UUID',
                accessor: 'uuid',
            },
            {
                Header: 'Username',
                accessor: 'username',
            },
            {
                Header: 'Expiry Date',
                accessor: 'expiryDate',
            },
            {
                Header: 'Offense',
                accessor: 'offense',
            },
            {
                Header: 'Description',
                accessor: 'description',
            },
            {
                Header: 'Type',
                accessor: 'type',
            },
        ],
        [],
    );

    const { fetchData, controlledPageCount } = props;

    const data = props.punishmentData;

    const tableInstance = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }, // Pass our hoisted table state
            manualPagination: true, // Tell the usePagination
            // hook that we'll handle our own data fetching
            // This means we'll also have to provide our own
            // pageCount.
            pageCount: controlledPageCount,
        },
        usePagination,
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = tableInstance;

    useEffect(() => {
        fetchData({ pageIndex, pageSize });
    }, [fetchData, pageIndex, pageSize]);

    return (
        <>
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            pageIndex,
                            pageSize,
                            pageCount,
                            canNextPage,
                            canPreviousPage,
                        },
                        null,
                        2,
                    )}
                </code>
            </pre>
            <Table striped bordered hover {...getTableProps()}>
                {/* <thead>
                    {headerGroups.map(
                        (
                            headerGroup: {
                                getHeaderGroupProps: () => JSX.IntrinsicAttributes &
                                    React.ClassAttributes<HTMLTableRowElement> &
                                    React.HTMLAttributes<HTMLTableRowElement>;
                                headers: any[];
                            },
                            i: string | number | null | undefined,
                        ) => (
                            // Apply the header row props
                            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                                {
                                    // Loop over the headers in each row
                                    headerGroup.headers.map(
                                        (
                                            column: {
                                                getHeaderProps: () => JSX.IntrinsicAttributes &
                                                    React.ClassAttributes<HTMLTableHeaderCellElement> &
                                                    React.ThHTMLAttributes<HTMLTableHeaderCellElement>;
                                                render: (arg0: string) => React.ReactNode;
                                            },
                                            i: string | number | null | undefined,
                                        ) => (
                                            // Apply the header cell props
                                            <th key={i} {...column.getHeaderProps()}>
                                                {
                                                    // Render the header
                                                    column.render('Header')
                                                }
                                            </th>
                                        ),
                                    )
                                }
                            </tr>
                        ),
                    )}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        // Loop over the table rows
                        rows.map(
                            (
                                row: {
                                    getRowProps: () => JSX.IntrinsicAttributes &
                                        React.ClassAttributes<HTMLTableRowElement> &
                                        React.HTMLAttributes<HTMLTableRowElement>;
                                    cells: any[];
                                },
                                i: string | number | null | undefined,
                            ) => {
                                // Prepare the row for display
                                prepareRow(row);
                                return (
                                    // Apply the row props
                                    <tr key={i} {...row.getRowProps()}>
                                        {
                                            // Loop over the rows cells
                                            row.cells.map(
                                                (
                                                    cell: {
                                                        getCellProps: () => JSX.IntrinsicAttributes &
                                                            React.ClassAttributes<HTMLTableDataCellElement> &
                                                            React.TdHTMLAttributes<HTMLTableDataCellElement>;
                                                        render: (arg0: string) => React.ReactNode;
                                                    },
                                                    i,
                                                ) => {
                                                    return (
                                                        <td key={i} {...cell.getCellProps()}>
                                                            {
                                                                // Render the cell contents
                                                                cell.render('Cell')
                                                            }
                                                        </td>
                                                    );
                                                },
                                            )
                                        }
                                    </tr>
                                );
                            },
                        )
                    }
                </tbody> */}
                <thead>
                    {headerGroups.map(
                        (headerGroup: {
                            getHeaderGroupProps: () => JSX.IntrinsicAttributes &
                                React.ClassAttributes<HTMLTableRowElement> &
                                React.HTMLAttributes<HTMLTableRowElement>;
                            headers: any[];
                        }) => (
                            <tr key={'1'} {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(
                                    (column: {
                                        getHeaderProps: () => JSX.IntrinsicAttributes &
                                            React.ClassAttributes<HTMLTableHeaderCellElement> &
                                            React.ThHTMLAttributes<HTMLTableHeaderCellElement>;
                                        render: (arg0: string) => React.ReactNode;
                                        isSorted: any;
                                        isSortedDesc: any;
                                    }) => (
                                        <th key={'1'} {...column.getHeaderProps()}>
                                            {column.render('Header')}
                                            <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                                        </th>
                                    ),
                                )}
                            </tr>
                        ),
                    )}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(
                        (
                            row: {
                                getRowProps: () => JSX.IntrinsicAttributes &
                                    React.ClassAttributes<HTMLTableRowElement> &
                                    React.HTMLAttributes<HTMLTableRowElement>;
                                cells: any[];
                            },
                            i: any,
                        ) => {
                            prepareRow(row);
                            return (
                                <tr key={1} {...row.getRowProps()}>
                                    {row.cells.map(
                                        (cell: {
                                            getCellProps: () => JSX.IntrinsicAttributes &
                                                React.ClassAttributes<HTMLTableDataCellElement> &
                                                React.TdHTMLAttributes<HTMLTableDataCellElement>;
                                            render: (arg0: string) => React.ReactNode;
                                        }) => {
                                            return (
                                                <td key={1} {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                </td>
                                            );
                                        },
                                    )}
                                </tr>
                            );
                        },
                    )}
                    <tr>
                        <td colSpan={10000}>
                            Showing {page.length} of ~{pageCount * pageSize} results
                        </td>
                    </tr>
                </tbody>
            </Table>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(page);
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};
