import React, { useState, useRef, useEffect, useMemo } from 'react'

import { AdminDashboard } from '../../../APIArmy/Dashboard/AdminDashboard'
import { SortDatabaseType } from '../../../Enumeration/Enums'

import MaterialReactTable from 'material-react-table';


const CompanyUserColumnOrder = {
    TaxID: 'TaxID',
    CompanyName: 'CompanyName',
}

const CompanyUserDashboard = () => {

    const tableRef = useRef();

    //data and fetching state
    const [data, setData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);

    //table state
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });


    useEffect(() => {

        const getData = async () => {

            if (!data.length) {
                setIsLoading(true);
            } else {
                setIsRefetching(true);
            }

            let requestObject = {
                skip: pagination.pageIndex * pagination.pageSize,
                take: pagination.pageSize,
                orderBy: setSortingId(sorting[0]?.id ?? ''),
                orderDirection: sorting[0]?.desc ? SortDatabaseType.Desc : SortDatabaseType.Asc
            }

            let res = await AdminDashboard.ListCompanyUsers({ ...requestObject })
            if (!res?.isSuccess) {
                setIsError(true);
                setIsLoading(false);
                setIsRefetching(false);
                return;
            }

            setData(res.companies);
            setRowCount(res.totalRecord);
            setIsError(false);
            setIsLoading(false);
            setIsRefetching(false);
        }
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination.pageIndex, pagination.pageSize, sorting]);

    const columns = useMemo(() =>
        [
            {
                accessorKey: 'taxID',
                header: 'Tax ID',
                enableColumnFilter: false,
            },
            {
                accessorKey: 'companyName',
                header: 'Company',
                enableColumnFilter: false,
            },
            {
                accessorKey: 'email',
                header: 'Email',
                enableSorting: false,
                enableColumnFilter: false,
            },
            {
                accessorKey: 'address',
                header: 'Address',
                enableSorting: false,
                enableColumnFilter: false,
            },
            {
                accessorKey: 'telephone',
                header: 'Telephone',
                enableSorting: false,
                enableColumnFilter: false,
            }
        ],
        []
    );

    const setSortingId = (columnName) =>
    {
        switch (columnName) {
            case 'taxID':
                return CompanyUserColumnOrder.TaxID
            case 'companyName':
                return CompanyUserColumnOrder.CompanyName
            default:
                return CompanyUserColumnOrder.TaxID
        }
    }

    return (
        <MaterialReactTable
            columns={columns}
            data={data}
            enableRowSelection={false}
            enableTopToolbar={false}
            getRowId={(row) => row.id}
            initialState={{ showColumnFilters: true }}
            manualPagination={true}
            manualSorting={true}
            muiTablePaginationProps={{
                rowsPerPageOptions: [5, 10, 20, 40]
            }}
            muiToolbarAlertBannerProps={
                isError
                    ? {
                        color: 'error',
                        children: 'Error loading data',
                    }
                    : undefined
            }
            onPaginationChange={setPagination}
            onSortingChange={setSorting}
            rowCount={rowCount}
            state={{
                isLoading,
                pagination,
                showAlertBanner: isError,
                showProgressBars: isRefetching,
                sorting,
            }}
        />
    );
}

export default CompanyUserDashboard;