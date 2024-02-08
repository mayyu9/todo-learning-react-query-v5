import { useQuery } from '@tanstack/react-query'
import Form from './components/Form';

// const fetchToDos =  async () => {
//   return await fetch('http://localhost:8001/todo');
// };
function App() {

  // query which perform get operation.
  const {data} = useQuery({
    queryKey: ['todo'], 
    // queryFn: fetchToDos
    queryFn: async () => await(await fetch('http://localhost:8001/todo')).json()
  });

  console.log('thakur: ', data);
  return (
    <div className="App">
     <Form />
     {
      data?.data.map((todo) => <li key={todo.id}>
        {todo.title}
      </li>)
     }
    </div>
  );
}

export default App;
