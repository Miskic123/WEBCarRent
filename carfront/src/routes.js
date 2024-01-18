
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'


export default [
    {
        path: '/',
        component: Home
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/login',
        name:'Login',
        component:Login
    }
]

    

