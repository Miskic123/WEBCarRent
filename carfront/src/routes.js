
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import UserInfo from './components/UserInfo.vue'
import RentObject from './components/RentObject.vue'
import RegisterManager from './components/RegisterManager.vue'
import CreateRentObject from './components/CreateRentObject.vue'
import CreateManager from './components/CreateManager.vue'
import ManagersVehicles from './components/ManagersVehicles.vue'
import CreateVehicle from './components/CreateVehicle.vue'
import EditVehicle from './components/EditVehicle.vue'
import BuyerOrders from './components/BuyerOrders.vue'
import OrderDetails from './components/OrderDetails.vue'
import MakeAnOrder from './components/MakeAnOrder.vue'
import Basket from './components/Basket.vue'
import ManagersOrders from './components/ManagersOrders.vue'
import AddComment from './components/AddComment.vue'

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
    },
    {
        path: '/userInfo',
        component:UserInfo
    },
    {
        path: '/registerManager',
        component : RegisterManager
    },
    {
        path: "/rentObject/:id",
        name: "RentObject",
        component: RentObject,
        props: true,
    },
    {
        path: '/addObject',
        name:"AddObject",
        component: CreateRentObject

    },
    {
        path:'/createManager',
        component: CreateManager
    },
    {
        path:'/managersVehicles',
        component: ManagersVehicles
    },
    {
        path:'/addVehicle',
        component: CreateVehicle
    },
    {
        path: '/editVehicle/:id',
        name: 'editVehicle',
        component: EditVehicle,
    },
    {
        path: '/buyerOrders',
        component: BuyerOrders
    },
    {
        path: '/orderDetails',
        component: OrderDetails
    },
    {
        path: '/makeOrder',
        component: MakeAnOrder
    },
    {
        path:'/basket',
        component:Basket
    },
    {
        path:'/managersOrders',
        component: ManagersOrders
    },
    {
        path: '/addComment/:orderId',
        name: 'addComment', 
        component: AddComment,
      }



]

    

