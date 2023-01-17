import '../index.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { async } from '@firebase/util'

export default function Register() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    async function register(e) {
        e.preventDefault()
        if (email !== '' && password !== '') {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate('/admin', email, password)
                })
                .catch((error) => {
                    alert(`Preecha todos os campos para se cadastrar. ` + error)
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

            <form className='form' onSubmit={register}>
                <input type="text" placeholder='Digite seu E-mail' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" placeholder='Digite sua senha' value={password} onChange={(e) => setPassword(e.target.value)}></input>

                <button type="submit">Cadastrar</button>
                <Link to="/">Já possui cadastro? Clique aqui para fazer o login.</Link>
            </form>
        </div>
    )
}