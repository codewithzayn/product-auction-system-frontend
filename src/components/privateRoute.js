import { Route, Redirect,Link,useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function PrivateRoute( props ) {
  // const { isAuthenticated } = useContext(AuthContext);
// const token = localStorage.getItem('jwtToken')
const {Component} = props;
console.log('Component',Component)
const navigate = useNavigate()
useEffect(()=>{
  let login = localStorage.getItem('jwtToken')
  if(!login)
  navigate('/login')
})
  return (
    <div>
     <Component/>
    </div>
  );
}
export default PrivateRoute