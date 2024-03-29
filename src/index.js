import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App';
import './index.css'

// v1 of writing a promise
// const promise = axios.get('http://localhost:3001/api/notes')
// promise.then(response => {
//     // console.log(response)
// })

//v2 of writing a promise
// axios
//     .get('http://localhost:3001/api/notes')
//     .then(response =>{
//         const notes = response.data
//         // console.log(notes)
//     })


const notes = [
    {
        id: 1,
        content: 'HTML is easy',
        important: true
    },
    {
        id: 2,
        content: 'Browser can execute only JavaScript',
        important: false
    },
    {
        id: 3,
        content: 'GET and POST are the most important methods of HTTP protocol',
        important: true
    }

]

ReactDOM.createRoot(document.getElementById('root')).render(<App />)


