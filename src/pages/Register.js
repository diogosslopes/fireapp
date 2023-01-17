import '../index.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { async } from '@firebase/util'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { toast } from 'react-toastify'
import { } from 'react-dom'
import { showPassword } from '../api'
import { Helmet } from 'react-helmet'

export default function Register() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    let inputType = ''
    let showPasswordButton = ''
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

    const getElements = () =>{
         inputType = document.querySelector('#password')
         showPasswordButton = document.querySelector('.showPassword')
    }

    useEffect(()=>{
        getElements()
    },[])
    
    async function registerUser(value) {
        
        console.log(value.email)
        if (value.email !== '' && value.password !== '') {

            await createUserWithEmailAndPassword(auth, value.email, value.password)
                .then(() => {
                    navigate('/admin', value.email, value.password)
                })
                .catch((error) => {
                    toast.error("Erro no serviço, contate o administrador.")
                    console.log(error)
                })
        } else {
            alert("Preencha todos os campos !")
        }
    }


    return (
        
        <div className='container'>
            <Helmet title="Registro de usuario" />
            <h1>Cadastre-se</h1>
            <span>Vamos criar a sua conta.</span>

            <form className='form' onSubmit={handleSubmit(handleRegister)}>
                <input type="text" placeholder='Digite seu E-mail' name='email' {...register('email')}></input>
                <p className='error'>{errors.email?.message}</p>
                <input id='password' type="password" placeholder='Digite sua senha' name='password' {...register('password')}></input>
                <div className='container-showPassword'>
                    <p className='error'>{errors.password?.message}</p>
                    <p className='showPassword' onClick={()=>{showPassword(inputType, showPasswordButton)}}>Mostrar senha</p>
                </div>

                <button type="submit">Cadastrar</button>
                <Link to="/">Já possui cadastro? Clique aqui para fazer o login.</Link>
            </form>
        </div>
    )
}