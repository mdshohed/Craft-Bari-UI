import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";


const IsUser = ({children}: {children: ReactNode}) => {

  const user = useAppSelector(selectCurrentUser); 
  
  if(user?.role !== 'user') {
    return <Navigate to="/login" replace={true}></Navigate>
  }
  
  return children; 
};

export default IsUser;