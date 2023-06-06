import { useTable } from "react-table";
import { userColumn } from './userTableColumn'
import { useMemo } from "react";

const fakeData = [];

const BasicTable = () => {

  const columns = useMemo(()=> userColumn, [])
  const data = useMemo(()=> fakeData, [])

  const tableInstance = useTable({ columns,data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance; 
  return(
    <table {...getTableProps()} className="w-full">
      <thead>
        {headerGroups.map(headerGroup=>(
          <tr {...headerGroup.getFooterGroupProps()}>
            { headerGroup.headers.map(column=>(
                <th {...column.getHeaderProps()} className="text-white p-[2px]"><span className="bg-primary block rounded p-1">{column.render('Header')}</span></th>
              ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {
          rows.map(row=>{
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell=>(
                  <td {...cell.getCellProps()}><span className="bg-indigo-100 block rounded p-1 text-center">{cell.render('Cell')}</span></td>
                ))}
              </tr>
            )
          })
        }
      </tbody>

    </table>
  )
};

export default BasicTable;