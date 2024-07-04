import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import './Signup.css';


const SIGNUP = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      username
      email
      password
      phonenumber
      shift
      usertype
    }
  }
`;


interface CreateUserInput {
  username: string;
  email: string;
  password: string;
  phonenumber: string;
  shift: UserRole; 
  usertype: UserType; 
}


enum UserRole {
  MORNING = 'morning',
  EVENING = 'evening',
  NIGHT = 'night',
}

enum UserType {
  ADMIN = 'admin',
  SUPERVISOR = 'supervisor',
  WORKER = 'worker',
}

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [shift, setShift] = useState<UserRole>(UserRole.MORNING); 
  const [usertype, setUserType] = useState<UserType>(UserType.ADMIN); 
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();


  const [createUser, { loading }] = useMutation(SIGNUP, {
    onError: (error) => {
      setError(`User creation error: ${error.message}`);
    },
    onCompleted: (data) => {
      console.log('User created successfully:', data.createUser);
      navigate('/dataget');
    },
  });

  const handleCreateUser = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); 

    
    const input: CreateUserInput = {
      username,
      email,
      password,
      phonenumber,
      shift,
      usertype,
    };

    
    if (!username || !email || !password || !phonenumber || !shift || !usertype) {
      setError('All fields are required');
      return;
    }

    createUser({
      variables: { input },
    });
  };

  return (
    <div className="app_signup">
      <div className="container_signup">
        <div className='second_half_signup'>
          <h4 className='second_section_mainheading_signup'>SignUp here if you don't have<br /> an account</h4>
          <p className="second_section_subheading_signup">Join our platform by creating an account.<br /> Sign up now to access exclusive features<br /> and stay connected!</p>
        </div>
        <div className="first_half_signup">
          <form className="signup_form_signup" onSubmit={handleCreateUser}>
            <h3 className='sub_heading_signup'>Please SignUp to your account</h3>
            <div className="input_group_signup">
              <input
                required
                placeholder="Username"
                type="text"
                className="input_field_signup"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input_group_signup">
              <input
                required
                placeholder="Email"
                type="email"
                className="input_field_signup"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input_group_signup">
              <input
                required
                placeholder="Password"
                type="password"
                className="input_field_signup"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input_group_signup">
              <input
                required
                placeholder="Phone Number"
                type="tel"
                className="input_field_signup"
                value={phonenumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="input_group_signup">
              <label>Shifts</label>
              <select
                required
                className="input_field_signup"
                value={shift}
                onChange={(e) => setShift(e.target.value as UserRole)}
              >
                <option value={UserRole.MORNING}>Morning Shift</option>
                <option value={UserRole.EVENING}>Evening Shift</option>
                <option value={UserRole.NIGHT}>Night Shift</option>
              </select>
            </div>
            <div className="input_group_signup">
              <label>User Type</label>
              <select
                required
                className="input_field_signup"
                value={usertype}
                onChange={(e) => setUserType(e.target.value as UserType)}
              >
                <option value={UserType.ADMIN}>Admin</option>
                <option value={UserType.SUPERVISOR}>Supervisor</option>
                <option value={UserType.WORKER}>Worker</option>
              </select>
            </div>
            <button className="signup_button" type="submit" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            {error && <div className="error-message">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
