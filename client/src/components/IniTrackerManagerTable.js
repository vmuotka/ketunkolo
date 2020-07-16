import React from 'react';
import { connect } from 'react-redux'

// materialui 
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
import initrackerService from '../services/initrackerService'
import { deleteGroup, updateGroup } from '../reducers/initrackerGroupReducer'

const columns = [
  { id: 'name', label: 'Group Name', minWidth: 100 },
  { id: 'load', label: 'Load', minWidth: 50 },
  { id: 'save', label: 'Save', minWidth: 50 },
  { id: 'del', label: 'Delete', minWidth: 50 }
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

  const loadedGroup = props.monsterManager ? props.initracker.monsters : props.initracker.party

  const createData = (group) => {
    const load = (<Button onClick={() => {
      props.setGroup(group)
    }}>Load</Button>)
    const save = (<Button onClick={() => {
      if (window.confirm(`Are you sure you want to overwrite ${group.groupname}?`)) {
        group.group = loadedGroup
        initrackerService.save(group)
        props.updateGroup(group)
      }
    }}>Save</Button>)
    const del = (<Button onClick={() => {
      if (window.confirm(`Are you sure you want to delete ${group.groupname}?`)) {
        initrackerService.deleteGroup(group.id)
        props.deleteGroup(group.id)
      }
    }}>Delete</Button>)
    return { name: group.groupname, load, save, del };
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

const mapDispatchToProps = {
  setGroup,
  deleteGroup,
  updateGroup
}

const mapStateToProps = (state) => {
  return {
    initracker: state.initracker
  }
}

const connectedIniTrackerManagerTable = connect(mapStateToProps, mapDispatchToProps)(IniTrackerManagerTable)

export default connectedIniTrackerManagerTable