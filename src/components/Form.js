import React, {useState} from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// mutation function which will send the post request
const createMutation = (text) => {
    console.log('thakur muatation: ', text);
    return () => fetch('http://localhost:8001/todo/create', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({title : text})
    })
}

const Form = () => {
    const[text, setText] = useState('');

    // Access the client
    const queryClient = useQueryClient()

    // mutation hook which is called on the handler function.
    const mutateTodo = useMutation({
        mutationFn: createMutation(text),
        onSuccess : () => {
            console.log('successfully mutated');
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['todo'] })
        },
        onError: () => {
            console.log('Error');
        }
    })
    return(
        <>
        <input type="text" value={text} onChange={(e) => {
            e.preventDefault();
            setText(e.target.value)
        }}/>
        <button type="button" onClick={(e)=> {
            e.preventDefault();
            mutateTodo.mutate()}}>Create Todo</button>
        </>
    )
};

export default Form;
