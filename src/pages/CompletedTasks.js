import '../index.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { signOut } from "firebase/auth"
import { auth, db } from '../firebaseConnection'
import { addDoc, collection, query, onSnapshot, orderBy, where, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { async } from '@firebase/util'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { toast } from 'react-toastify'


export default function CompletedTasks() {

    const [task, setTask] = useState()
    const [editingTask, setEditingTask] = useState()
    const [userLoged, setuserLoged] = useState()
    const [tasks, setTasks] = useState([])
    const [edit, setEdit] = useState({})
    const registerBtn = document.querySelector('#registerBtn')
    const validationTask = yup.object().shape({
        task: yup.string().required("A descrição da tarefa é obrigatória").min(10, "Digite pelo menos 10 caracteres")
    })

    // const { register, handleSubmit, formState: { errors } } = useForm({
    //     resolver: yupResolver(validationTask)
    // })

    // const tarefa = (value) => {
    //     saveTask(value)
    // }


    useEffect(() => {

        async function loadTasks() {
            const userDetail = localStorage.getItem("userLoged")
            setuserLoged(JSON.parse(userDetail))

            if (userDetail) {
                const data = JSON.parse(userDetail)
                const taskRef = collection(db, "tasksCompleted")
                const q = query(taskRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))
                const unsub = onSnapshot(q, (snapshot) => {
                    let list = []

                    snapshot.forEach((doc) => {
                        console.log(doc.data())
                        list.push({
                            id: doc.data().originalId,
                            task: doc.data().task,
                            created: doc.data().created,
                            lastUpdate: doc.data().lastUpdate,
                            dateFinished: doc.data().dateFinished,
                            userUid: doc.data().userUid
                        })
                    })
                    setTasks(list)
                })
            }
        }
        loadTasks()
    }, [])
    
    
    async function logout() {
        await signOut(auth)
    }

    // async function saveTask(task) {

    //     const data = new Date()
    //     const day = String(data.getDate()).padStart(2, '0')
    //     const month = String(data.getMonth() +1).padStart(2, '0')
    //     const year = String(data.getFullYear())
    //     const hour = String(data.getHours())
    //     const minutes = String(data.getMinutes())

    //     const fullDate = `${day}/${month}/${year} - ${hour}:${minutes}`
        
    //     if (edit?.id) {
    //         updateTask(task, fullDate)
    //         return
    //     }

    //     await addDoc(collection(db, "tasks"), {
    //         task: task.task,
    //         created: fullDate,
    //         lastUpdate: fullDate,
    //         userUid: userLoged.uid
    //     })
    //         .then(() => {
    //             toast.success('Tarefa Adicionada !')
    //             setEditingTask('')
    //             task.task = ''
    //         })
    //         .catch((error) => {
    //             toast.warning('Erro ao adicionar tarefa ' + error)
    //         })

    // }
    // async function completeTask(taskId, tasks) {

    //     const completedTask = tasks.filter(ct => ct.id === taskId)
    //     console.log(completedTask)

    //     const data = new Date()
    //     const day = String(data.getDate()).padStart(2, '0')
    //     const month = String(data.getMonth() +1).padStart(2, '0')
    //     const year = String(data.getFullYear())
    //     const hour = String(data.getHours())
    //     const minutes = String(data.getMinutes())

    //     const fullDate = `${day}/${month}/${year} - ${hour}:${minutes}`

    //     await addDoc(collection(db, "tasksCompleted"), {
    //         originalId: taskId,
    //         task: completedTask[0].task,
    //         created: completedTask[0].created,
    //         lastUpdate: fullDate,
    //         userUid: userLoged.uid,
    //         dateFinished: fullDate
    //     })
    //         .then(() => {
    //             toast.success('Tarefa Concluida !')
    //             setEditingTask('')
    //             deleteTask(taskId)
                
    //         })
    //         .catch((error) => {
    //             toast.warning('Erro ao adicionar tarefa ' + error)
    //         })

    // }


    // async function deleteTask(id) {
    //     const docRef = doc(db, "tasks", id)
    //     await deleteDoc(docRef)
    // }

    // async function editTask(item) {

    //     registerBtn.innerHTML = 'Concluir edição'
    //     setEditingTask(item.task)
    //     setEdit(item)
    // }

    // async function updateTask(task, fullDate) {
    //     const docRef = doc(db, "tasks", edit?.id)
    //     console.log(task.task)
    //     await updateDoc(docRef, {
    //         task: task.task,
    //         lastUpdate: fullDate
    //     })
    //         .then(() => {
    //             toast.success('Tarefa atualizada !')
    //             setEditingTask('')
    //             setEdit('')
    //             task.task = ''
    //             registerBtn.innerHTML = 'Registrar Tarefa'
    //         })
    //         .catch((error) => {
    //             toast.error("Erro ao editar tarefa.")
    //         })
    // }



    return (
        <div className='container-admin'>
            <h1>Lista de tarefas concluidas</h1>
            {tasks.map((item) => (
                <article key={item.id}>
                    <p>{item.task}</p>
                    <span>Data da criação. {item.created}</span>
                    <span>Data da conclução. {item.lastUpdate}</span>
                    {/* <div>
                        <button onClick={() => editTask(item)}>Editar</button>
                        <button onClick={()=> completeTask(item.id, tasks)}>Concluir</button>
                        <button onClick={() => deleteTask(item.id)}>Excluir</button>
                    </div> */}
                </article>
            )
            )}
            <div>
                <button onClick={logout}>Sair</button>
                <Link to={'/admin'}><button>Voltar</button></Link>
            </div>
        </div>
    )
}