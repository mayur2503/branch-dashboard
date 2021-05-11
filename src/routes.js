import React from "react";
const Dashboard = React.lazy(() => import("./views/pages/dashboard/Dashboard"));
const AddUser = React.lazy(() => import("./views/users/AddUser"));
const Profile = React.lazy(() => import("./views/users/Profile"));
const NewRegistrations = React.lazy(() => import("./views/users/NewRegistrations"));
const AllUsers = React.lazy(() => import("./views/users/AllUsers"));
const Wallet = React.lazy(() => import("./views/wallet/Wallet"));
const PaidUsers = React.lazy(() => import("./views/reports/PaidUsers"));
const WalletHistory = React.lazy(() => import("./views/reports/WalletHistory"));
const UnPaidUsers = React.lazy(() => import("./views/reports/UnPaidUsers"));
// const Leads = React.lazy( () => import('./views/leads/Leads'))
// const Courses = React.lazy( () => import('./views/master/Courses'))
// const Departments = React.lazy( () => import('./views/master/Departments'))
// const Subjects = React.lazy( () => import('./views/master/Subjects'))
// const CreateTemplate = React.lazy( () => import('./views/templates/Create'))
// const AllTemplates = React.lazy( () => import('./views/templates/AllTemplates'))
// const CreateExam = React.lazy( () => import('./views/exams/CreateExam'))
// const Users = React.lazy( () => import('./views/users/Users'))
// const AddStudent = React.lazy( () => import('./views/students/AddStudent'))
const routes = [
  { path: "/", exact: true, name: "home", component: Dashboard },
  { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
  { path: "/users/add-user", exact: true, name: "adduser", component: AddUser },
  {
    path: "/users/profile/:id",
    exact: true,
    name: "User Details",
    component: Profile,
  },
  {
    path: "/users/newregistrations",
    exact: true,
    name: "New Registration",
    component: NewRegistrations,
  },
  {
    path: "/users/allusers",
    exact: true,
    name: "allusers",
    component: AllUsers,
  },
  {
    path: "/wallet",
    exact: true,
    name: "Wallet",
    component: Wallet,
  },
  {
    path: "/reports/paidusers",
    exact: true,
    name: "paidusers",
    component: PaidUsers,
  },
  {
    path: "/reports/unpaidusers",
    exact: true,
    name: "unpaidusers",
    component: UnPaidUsers,
  },
  {
    path: "/reports/wallethistory",
    exact: true,
    name: "wallethistory",
    component: WalletHistory,
  },
  // { path: '/stock/brands', exact: true, name:'Brands' , component:Brand },
  // { path: '/leads', exact: true, name:'Leads' , component:Leads },
  // { path: '/master/courses', exact: true, name:'Courses' , component:Courses },
  // { path: '/master/departments', exact: true, name:'Departments' , component:Departments },
  // { path: '/master/subjects', exact: true, name:'Subjects' , component:Subjects },
  // { path: '/templates/create', exact: true, name:'CreateTemplates' , component:CreateTemplate },
  // { path: '/templates', exact: true, name:'AllTemplates' , component:AllTemplates },
  // { path: '/exam/create', exact: true, name:'CreateExam' , component:CreateExam },
  // { path: '/users', exact: true, name:'users' , component:Users },
  // { path: '/students/new', exact: true, name:'addstudent' , component:AddStudent },
];

export default routes;
