import '../index.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Home() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    async function login(e) {
        e.preventDefault()
        if (email !== '' && password !== '') {

            await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/admin', { replace: true })
            })
            .catch((error)=>{
                alert(`Erro ao logar ` + error)
            })
        } else {
            alert("Preencha todos os campos")
        }
    }

    return (
        <div className='container'>
            <h1>Lista de tarefas</h1>
            <span>Gerencie suas tarefas de forma simples e fácil.</span>

            <form className='form' onSubmit={login}>
                <input type="text" placeholder='Digite seu E-mail' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="text" placeholder='Digite sua senha' value={password} onChange={(e) => setPassword(e.target.value)}></input>

                <button type="submit">Logar</button>
                <Link to="/register">Cadastrar</Link>
            </form>
        </div>
    )
}