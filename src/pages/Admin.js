import '../index.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {signOut} from "firebase/auth"
import { auth, db } from '../firebaseConnection'
import {addDoc, collection} from 'firebase/firestore'


export default function Admin(){

    const [task, setTask] = useState()
    const [password, setPassword] = useState()
    const [userLoged, setuserLoged] = useState()

    useEffect(()=>{
        const userDetail = localStorage.getItem("userLoged")
        setuserLoged(JSON.parse(userDetail))
    },[])

    async function saveTask(e){
        e.preventDefault()
        
        if(task ===''){
            alert('Digite uma tarefa !')
            return
        }

        await addDoc(collection(db, "tasks"),{
            task: task,
            created: new Date(),
            userUid: userLoged.uid
        })
        .then(()=>{
            alert ('Tarefa Adicionada !')
            setTask('')
        })
        .catch((error)=>{
            alert('Erro ao adicionar tarefa ' + error)
        })

    }

    async function logout(){
        await signOut(auth)
    }

    return(
        <div className='container-admin'>
            <h1>Lista de tarefas</h1>
            <form className='form' onSubmit={saveTask}>
                <textarea placeholder='Digite sua tarefa' value={task} onChange={((e)=>{setTask(e.target.value)})}></textarea>

                <button type="submit">Registrar tarefa</button>
            </form>

            <article>
                <p>Estudar Redux</p>
                <div>
                    <button>Editar</button>
                    <button>Concluir</button>
                </div>
            </article>
            <button onClick={logout}>Sair</button>
        </div>
    )
}