import React from 'react';
import {useTable} from "react-table";
import { useNavigate } from 'react-router-dom';


const Table = ({columns, data,quizzes, classHover}) => {

    const navigate = useNavigate();
    const tableInstance = useTable(
        { columns, data},
        );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = tableInstance;

    const handleRowClick =(idx) =>{
        navigate(`/quiz/${quizzes[idx]._id}`)
    }


  return (
    <div className="table">
            <table {...getTableProps()} className="mainTable">
                <thead>
                    {
                        headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()} >
                                {
                                    headerGroup.headers.map(column => (
                                        <th 
                                            {...column.getHeaderProps()}
                                           className="mainTableHeadingCells"
                                        >
                                            {column.render('Header')}
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map((row,idx) => {
                            prepareRow(row)
                            return (
                            <tr {...row.getRowProps()} className={`mainTableDataRows ${classHover}`} onClick={() => handleRowClick(idx)} >
                                {
                                    row.cells.map(cell => {
                                        return (
                                            <td 
                                                {...cell.getCellProps()}
                                                className="mainTableDataCells"
                                            >
                                                {
                                                    cell.render('Cell')
                                                }
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>
    </div>
  )
}

export default Table