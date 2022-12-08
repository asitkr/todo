import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function TodoItem(props) {

  const { todo: todoObj, onDelete, onEdit, handleComplete } = props;
  const { id, description, completed } = todoObj;

  console.log(completed);

  return (
    <Container className='items' sx={{display: 'flex', width: '100%'}}>
      <Checkbox onChange={() => handleComplete(id)} />
      <p className={completed ? "checked" : ""}>{description}</p>
      <Box>
        <EditIcon className='edit' onClick={() => onEdit(todoObj)} />
        <DeleteIcon className='delete' onClick={() => onDelete(id)} />
      </Box>
    </Container>
  )
}

export default TodoItem;