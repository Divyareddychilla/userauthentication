import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./Whoami.css";
import { CgLogOff } from "react-icons/cg";

export const WHO_AM_I = gql`
  query WhoAmI {
    whoAmI {
      user_id
      username
      email
      phonenumber
      empId
      shift
      usertype
      created_at
    }
  }
`;

function Whoami() {
  const history = useHistory(); // Ensure useHistory is imported correctly

  const { loading, error, data, refetch } = useQuery(WHO_AM_I, {
    context: {
      headers: {
        Authorization: localStorage.getItem('authHeader') || '',
      },
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { whoAmI } = data;

  const handleLogoff = () => {
    localStorage.removeItem('authHeader'); // Remove token from localStorage
    history.push('/login'); // Redirect to login page after logoff
  };

  return (
    <div className='main_container_whoami'>
      <div className='sub_container_whoami'>
        <h1>Who Am I</h1>
        <p><strong className='strong'>User ID:</strong> {whoAmI.user_id}</p>
        <p><strong className='strong'>Username:</strong> {whoAmI.username}</p>
        <p><strong className='strong'>Email:</strong> {whoAmI.email}</p>
        <p><strong className='strong'>Phone Number:</strong> {whoAmI.phonenumber}</p>
        <p><strong className='strong'>Employee ID:</strong> {whoAmI.empId}</p>
        <p><strong className='strong'>Shift:</strong> {whoAmI.shift}</p>
        <p><strong className='strong'>UserType:</strong> {whoAmI.usertype}</p>
        <p><strong className='strong'>Created At:</strong> {whoAmI.created_at}</p>
        <div className='whoami_logoff_container'>
          <button className='view_user_list_button'><Link className="viewuserlist_link_whoami" to="/dataget">view user list</Link></button>
          <CgLogOff className='whoami_logoff_button' onClick={handleLogoff} />
        </div>
      </div>
    </div>
  );
}

export default Whoami;
