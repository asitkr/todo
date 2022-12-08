import React, { useEffect, useRef, useState } from 'react';
import TodoItem from './TodoItem';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// get the todo data from local Storage
const getLocalData = () => {
  const listData = localStorage.getItem('lists');
  // console.log(listData);

  if(listData) {
    return JSON.parse(localStorage.getItem('lists'));
  }
  else {
    return [];
  }
}

function Todo() {

  const [inputItem, setInputItem] = useState("");
  const [todoList, setTodoList] = useState(getLocalData());
  const [buttonDesc, setButtonDesc] = useState("Add");
  const [editTodoId, setEditTodoId] = useState();
  const inputRef = useRef(null);

  // to get foucus at first time
  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.border = "none";
  }, [])

  //storing todo data in local storage
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(todoList));
  }, [todoList]);

  // to handle input field
  const handleInput = (e) => {
    setInputItem(e.target.value);
  }

  // create todo item with itemlist
  const createTodoItem = () => {
    const todoObj = {
      id: Date.now() + todoList.length,
      description: inputItem,
      completed: false,
      time: new Date()
    };

    if(inputItem) {
      setTodoList([...todoList, todoObj]);
    }

    setInputItem("");
  }

  const updateTodoItem = () => {
    const editiedTodoDescription = inputItem;
    const editId = editTodoId;
    
    const todoListCopy = JSON.parse(JSON.stringify(todoList));
    const index = todoList.findIndex(item => item.id === editId);
    todoListCopy[index].description = editiedTodoDescription;

    // console.log(editiedTodoDescription);

    if(editiedTodoDescription) {
      setTodoList(todoListCopy);
    }
    setEditTodoId("");
    setButtonDesc('Add');
    setInputItem("");
  }

  const onEditTodo = (obj) => {
    const { id, description } = obj;
    setButtonDesc("Update");
    inputRef.current.focus();
    setEditTodoId(id);
    setInputItem(description);
  }

  // to delete method
  const onDeleteTodo = (id) => {
    const filtredListArray = todoList.filter((item) => item.id !== id);
    setTodoList(filtredListArray);
  }

  const handleComplete = (index) => {
    setTodoList(todoList.map((ele) => 
            ele.id === index ? { ...ele, completed: !ele.completed} : ele
    ))
}

  const buttonHandler = () => {
    buttonDesc === "Add" ? createTodoItem() : updateTodoItem()
  }

  //render Todo list item
  const renderTodoList = () => {
    return todoList.map((item) => {
      return <TodoItem 
              key={item.id} 
              todo={item} 
              onDelete={onDeleteTodo} 
              onEdit={onEditTodo} 
              handleComplete={handleComplete} />
    });
  }

  return (
    <>
      <Container sx={{display: 'flex', mb: 1, justifyContent: 'center', flexDirection: 'column', width: '100%'}}>
        <FormControl fullWidth sx={{ m: 2, display: 'flex', justifyContent: 'center', flexDirection: "row", width: '100%' }} variant="standard">
        <Input
          ref={inputRef}
          type={"text"}
          id="input"
          value={inputItem}
          sx={{width: "100%"}}
          onChange={handleInput}
          placeholder="Add your task..."
          startAdornment={<InputAdornment position="start"></InputAdornment>}
        />
        <Button 
          type="submit" 
          onClick={buttonHandler} 
          variant="contained">
            {buttonDesc}
          </Button>
        </FormControl>

        <Box maxWidth="md" sx={{width: '100%'}}>
          { renderTodoList() }
        </Box>
      </Container>
    </>
  )
}

export default Todo;