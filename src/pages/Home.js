import '../index.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

export default function Home() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const validationLogin = yup.object().shape({
        email: yup.string().email("Digite um email válido").required("Digite um e-mail"),
        password: yup.string().required("Digite a senha")
    })

    const handleLogin = (value) => {
        login(value)
    }

    const { register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(validationLogin)
    })

    async function login(value) {
        if (value.email !== '' && value.password !== '') {

            await signInWithEmailAndPassword(auth, value.email, value.password)
            .then(() => {
                navigate('/admin', { replace: true })
            })
            .catch((error)=>{
                alert('Email ou senha incorretos')
            })
        } else {
            alert("Preencha todos os campos")
        }
    }

    return (
        <div className='container'>
            <h1>Lista de tarefas</h1>
            <span>Gerencie suas tarefas de forma simples e fácil.</span>

            <form className='form' onSubmit={handleSubmit(handleLogin)}>
                <input type="text" placeholder='Digite seu E-mail' name='email' {...register("email")}></input>
                <p className='error'>{errors.email?.message}</p>
                <input type="text" placeholder='Digite sua senha' name='password' {...register("password")}></input>
                <p className='error'>{errors.password?.message}</p>

                <button type="submit">Logar</button>
                <Link to="/register">Cadastrar</Link>
            </form>
        </div>
    )
}