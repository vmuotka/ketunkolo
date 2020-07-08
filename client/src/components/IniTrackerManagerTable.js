import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'

import { setGroup } from '../reducers/initrackerReducer'
import { useDispatch } from 'react-redux'
import initrackerService from '../services/initrackerService'
import { deleteGroup } from '../reducers/initrackerGroupReducer'

const columns = [
  { id: 'name', label: 'Group Name', minWidth: 100 },
  { id: 'load', label: 'Load', minWidth: 70 },
  { id: 'del', label: 'Delete', minWidth: 70 }
];


const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '1em'
  },
  container: {
    maxHeight: 600,
  },
});

const IniTrackerManagerTable = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const dispatch = useDispatch()

  const createData = (group) => {
    const load = (<Button onClick={() => {
      dispatch(setGroup(group))
    }}>Load</Button>)
    const del = (<Button onClick={() => {
      if (window.confirm(`Are you sure you want to delete ${group.groupname}?`)) {
        initrackerService.deleteGroup(group.id)
        dispatch(deleteGroup(group.id))
      }
    }}>Delete</Button>)
    return { name: group.groupname, load, del };
  }


  const rows = props.groups !== undefined ? props.groups.map(group => createData(group)) : []

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  // align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={Math.random()}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={Math.random()} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default IniTrackerManagerTable