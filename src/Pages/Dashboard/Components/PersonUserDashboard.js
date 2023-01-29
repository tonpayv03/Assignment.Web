import React, { useState, useRef, useEffect, useMemo } from 'react'

import { AdminDashboard } from '../../../APIArmy/Dashboard/AdminDashboard'
import { SortDatabaseType } from '../../../Enumeration/Enums'

import MaterialReactTable from 'material-react-table';


const PersonUserColumnOrder = {
    CardID: 'CardID',
    DateOfBirth: 'DateOfBirth',
    Name: 'Name',
    CompanyName: 'CompanyName',
}

const PersonUserDashboard = () => {

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

            let res = await AdminDashboard.ListPersonUsers({ ...requestObject })
            if (!res?.isSuccess) {
                setIsError(true);
                setIsLoading(false);
                setIsRefetching(false);
                return;
            }

            setData(res.persons);
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
                accessorKey: 'cardID',
                header: 'Card ID',
                enableColumnFilter: false,
            },
            {
                accessorKey: 'dateOfBirth',
                header: 'Date of Birth',
                enableColumnFilter: false,
            },
            {
                accessorFn: (row) => `${row.name} ${row.surname}`,
                accessorKey: 'name',
                header: 'Name',
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
            case 'cardID':
                return PersonUserColumnOrder.CardID
            case 'dateOfBirth':
                return PersonUserColumnOrder.DateOfBirth
            case 'name':
                return PersonUserColumnOrder.Name
            case 'companyName':
                return PersonUserColumnOrder.CompanyName
            default:
                return PersonUserColumnOrder.CardID
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

        // <MaterialTable
        //     tableRef={tableRef}
        //     columns={
        //         [
        //             { title: 'Card ID', field: "cardId", emptyValue: '–' },
        //             { title: 'Date of Birth', field: "dateOfBirth", emptyValue: '–' },
        //             {
        //                 title: 'Name', field: "name", emptyValue: '–', defaultSort: 'asc',
        //                 render: rowData => `${rowData.name} ${rowData.surName}`
        //             },
        //             { title: 'Company', field: "companyName", emptyValue: '–' },
        //             { title: 'Email', field: "email", emptyValue: '–' },
        //             { title: 'Address', field: "address", emptyValue: '–' },
        //             { title: 'Telephone', field: "telephone", emptyValue: '–' },
        //         ]}
        //     data={async query => {

        //         console.log("query", query);

        //         if (query.orderBy && query.orderDirection) {
        //             orderDirection = query.orderDirection;
        //             orderBy = query.orderBy.tableData.columnOrder;
        //         }
        //         else {
        //             // จังหวะกดครั้งที่ 2 จะได้ orderDirection เป็น string empty ให้ Assign Asc แทน
        //             orderDirection = SortDatabaseType.Asc;
        //         }

        //         let requestObject = {
        //             page:  query.page * query.pageSize,
        //             pageSize :  query.pageSize,
        //             orderBy: orderBy,
        //             orderDirection: orderDirection
        //         }

        //         let res = await AdminDashboard.ListAllPersonUser()

        //         if (!res?.isSuccess) {
        //              return { data: [], page: 0, totalCount: 0 };
        //         }

        //         // assign pageSize เพื่อเอาไป Set default options ของ pageSize 
        //         // ตรงส่วน options จะเป็นเหมือนการ setState.pageSize ของ table
        //         // เวลา re-render table ใหม่ ui จะได้แสดงจำนวน record ที่ถูกต้องตาม pageSize ที่ได้เลือกไว้ก่อนหน้านี้
        //         defaultPageSize = query.pageSize;

        //         return {
        //             data: res.persons,
        //             page: query.page,
        //             totalCount: res.totalRecord,
        //         };
        //     }}
        //     options={tableOptions()}
        //     localization={{
        //         header: {
        //             actions: ''
        //         },
        //         body: {
        //             emptyDataSourceMessage: 'No records to display',
        //         },
        //         pagination: {
        //             labelRowsSelect: 'rows/page'
        //         }
        //     }}
        //     components={{
        //         Container: props => <Paper {...props} elevation={0} />,
        //     }}
        // />
    );
}

export default PersonUserDashboard;