import './App.css';
import Todo from './components/Todo';
import TodoHeader from './components/TodoHeader';
import Container from '@mui/material/Container';

function App() {
  return (
    <Container>
      <TodoHeader />
      <Todo />
    </Container>
  );
}

export default App;
