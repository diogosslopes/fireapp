import {Route, Routes, Link} from 'react-router-dom'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Admin from '../pages/Admin'
import Private from './Private'
import CompletedTasks from '../pages/CompletedTasks'

function RoutesApp(){
    return(
    <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='register' element={ <Register/> }/>
        <Route path='admin' element={ <Private> <Admin/> </Private> }/>
        <Route path='admin/completedTasks' element={ <CompletedTasks/> }/>
    </Routes>

    )
}
export default RoutesApp