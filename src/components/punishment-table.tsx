/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo } from 'react';
import { Pagination, Table } from 'react-bootstrap';
import { useTable, usePagination } from 'react-table';
import { Punishment } from '../hooks/service-hooks';
interface PunishmentTableProps {
    punishmentData: Punishment[];
    totalCount: number;
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

    const { fetchData, controlledPageCount, totalCount } = props;

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
                        (row: {
                            getRowProps: () => JSX.IntrinsicAttributes &
                                React.ClassAttributes<HTMLTableRowElement> &
                                React.HTMLAttributes<HTMLTableRowElement>;
                            cells: any[];
                        }) => {
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
                            Showing {page.length} of {totalCount} results
                        </td>
                    </tr>
                </tbody>
            </Table>
            <div className="pagination">
                <Pagination>
                    <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
                    <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
                    <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
                    <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
                    <span style={{ margin: `8px` }}>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>
                    </span>
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                        }}
                        style={{ padding: `8px` }}
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </Pagination>
            </div>
        </>
    );
};
