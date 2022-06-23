import axios from 'axios';
const apiUrl = "http://localhost:8080/api/tasks"

export function getTasks(){
    return axios.get(apiUrl)
}

export async function addTask(task){
    
    const values = await axios.post(apiUrl, task)
    return values
}

export function updateTask(id, task){
    return axios.put(apiUrl + "/" + id, task)
}

export function deleteTask(id){
    return axios.delete(apiUrl + "/" + id)
}
