import '../index.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { async } from '@firebase/util'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

export default function Register() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const validationRegister = yup.object().shape({
        email: yup.string().email("Digite um email válido").required("Digite um e-mail").min(3, "Digite um e-mail de no minimo 3 caracteres"),
        password: yup.string().required("Digite a senha").min(6, "Digite uma senha de no minimo 6 caracteres")
    })

    const handleRegister = (value) => {
        registerUser(value)
    }

    const { register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(validationRegister)
    })

    async function registerUser(e) {
        e.preventDefault()
        if (email !== '' && password !== '') {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate('/admin', email, password)
                })
                .catch((error) => {
                    alert(`Preecha todos os campos para se cadastrar.`)
                    console.log(error)
                })
        } else {
            alert("Preencha todos os campos !")
        }
    }

    return (
        <div className='container'>
            <h1>Cadastre-se</h1>
            <span>Vamos criar a sua conta.</span>

            <form className='form' onSubmit={handleSubmit(handleRegister)}>
                <input type="text" placeholder='Digite seu E-mail' name='email' {...register('email')}></input>
                <p className='erro'>{errors.email?.message}</p>
                <input type="password" placeholder='Digite sua senha' name='password' {...register('password')}></input>
                <p className='erro'>{errors.password?.message}</p>

                <button type="submit">Cadastrar</button>
                <Link to="/">Já possui cadastro? Clique aqui para fazer o login.</Link>
            </form>
        </div>
    )
}