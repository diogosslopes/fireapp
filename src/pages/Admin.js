import '../index.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { signOut } from "firebase/auth"
import { auth, db } from '../firebaseConnection'
import { addDoc, collection, query, onSnapshot, orderBy, where, deleteDoc, doc, updateDoc} from 'firebase/firestore'
import { async } from '@firebase/util'
import { useForm } from 'react-hook-form'


export default function Admin() {

    const [task, setTask] = useState({})
    const [userLoged, setuserLoged] = useState()
    const [tasks, setTasks] = useState([])
    const [edit, setEdit] = useState({})

    const { register, handleSubmit, formState:{errors}} = useForm()

    const tarefa = (value) => {
        saveTask(value)
    }

            
    useEffect(() => {

        async function loadTasks(){
            const userDetail = localStorage.getItem("userLoged")
            setuserLoged(JSON.parse(userDetail))

            if(userDetail){
                const data = JSON.parse(userDetail)
                const taskRef = collection(db, "tasks")
                const q = query(taskRef, orderBy("created","desc"), where("userUid", "==", data?.uid))
                const unsub = onSnapshot(q, (snapshot)=>{
                    let list = []

                    snapshot.forEach((doc)=>{
                        list.push({
                            id: doc.id,
                            task: doc.data().task,
                            userUid: doc.data().userUid
                        })
                    })

                    setTasks(list)

                })

            }
        }
        loadTasks()
    }, [])



    async function saveTask(task) {

        console.log(task)
        if (task === '') {
            alert('Digite uma tarefa !')
            return
        }

        if(edit?.id){
            updateTask()
            return
        }

        console.log(task.task)

        await addDoc(collection(db, "tasks"), {
            task: task.task,
            created: new Date(),
            userUid: userLoged.uid
        })
            .then(() => {
                alert('Tarefa Adicionada !')
            })
            .catch((error) => {
                alert('Erro ao adicionar tarefa ' + error)
            })

    }

    async function logout() {
        await signOut(auth)
    }

    async function deleteTask(id){
        const docRef = doc(db, "tasks", id)
        await deleteDoc(docRef)
    }

    async function editTask(item){
        setTask(item.task)
        setEdit(item)
        console.log(edit)
    }

    async function updateTask(){
        const docRef = doc(db, "tasks", edit?.id)
        await updateDoc(docRef, {
            task: task,
            lastUpdate: new Date()
        })
        .then(()=>{
            alert("Tarefa Atualizada")
            setTask('')
            setEdit('')
        })
        .catch((error)=>{
            alert("Erro ao editar tarefa. " + error)
        })
    }

   

    return (
        <div className='container-admin'>
            <h1>Lista de tarefas</h1>
            <form className='form' onSubmit={handleSubmit(tarefa)} >
                <textarea name='task' {...register("task")} ></textarea>

                <button type="submit" >Registrar tarefa</button>
            </form>
            {tasks.map((item) => (
                <article key={item.id}>
                    <p>{item.task}</p>
                    <div>
                        <button onClick={()=> editTask(item)}>Editar</button>
                        <button onClick={()=> deleteTask(item.id)}>Concluir</button>
                    </div>
                </article>
            )
            )}
            <button onClick={logout}>Sair</button>
        </div>
    )
}