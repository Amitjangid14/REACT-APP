import Dashboard from "../components/admin/Dashboard";
import Signin from "../components/admin/Signin";
const routes = [
	{ path : 'admin',exact:true,name:'Signin',component : Signin },
	{ path : 'admin/dashboard',exact:true,name:'Dashboard',element : Dashboard,component : Dashboard }
];

export default routes;