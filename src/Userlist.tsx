import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_USER, UPDATE_USER, GET_USERS, DELETE_USER } from './Queries';
import './Userlist.css';
import { Link } from 'react-router-dom';

interface User {
  user_id: string;
  username: string;
  empId: string;
  usertype: string;
}

interface UserlistProps {
  users: User[];
  whoAmI: {
    usertype: string;
  };
}

const Userlist: React.FC<UserlistProps> = ({ users, whoAmI }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    shifts: '',
    userType: '',
    employeeId: '',
  });

  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [localUsers, setLocalUsers] = useState<User[]>(users);

  const [getUser, { data: userData, loading: userLoading, error: userError }] = useLazyQuery(GET_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  useEffect(() => {
    if (userData && userData.getUser) {
      const { getUser } = userData;

      setEditData({
        username: getUser.username,
        email: getUser.email,
        password: '',
        phoneNumber: getUser.phonenumber,
        shifts: getUser.shift,
        userType: getUser.usertype,
        employeeId: getUser.empId,
      });
    }
  }, [userData]);

  const handleEditClick = (userId: string) => {
    setSelectedUserId(userId);
    getUser({ variables: { id: userId } });
    setOpen(true);
  };

  const handleDelete = async (userId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');

    if (confirmDelete) {
      try {
        await deleteUser({
          variables: { id: userId },
        });
        setLocalUsers(localUsers.filter(user => user.user_id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    // Do not reset editData here
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await updateUser({
        variables: {
          id: selectedUserId,
          input: {
            user_id: selectedUserId,
            username: editData.username,
            email: editData.email,
            password: editData.password,
            phonenumber: editData.phoneNumber,
            shift: editData.shifts,
            usertype: editData.userType,
          },
        },
      });

      if (data && data.updateUser) {
        setLocalUsers(localUsers.map(user => user.user_id === selectedUserId ? { ...user, ...editData } : user));
      }
      setOpen(false);

    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (userLoading) return <p>Loading user data...</p>;
  if (userError) return <p>Error loading user data: {userError.message}</p>;

  return (
    <div className="app_userlist">
      <div className="userlist_header">
        <h4 className="mainheading_userlist">User List Information</h4>
        <button className="profile_button_userlist"><Link className='profile_link_userlist' to="/Whoami">Profile</Link></button>
      </div>

      <div className="userlist-container">
        <table className="userlist-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Employee ID</th>
              <th>User Type</th>
              {whoAmI.usertype === "ADMIN" && <th>Edit</th>}
              {whoAmI.usertype === "ADMIN" && <th>Delete</th>}
            </tr>
          </thead>
          <tbody>
            {localUsers.map((user, index) => (
              <tr key={index} className="user-item">
                <td>{user.username}</td>
                <td>{user.empId}</td>
                <td>{user.usertype}</td>

                {whoAmI.usertype === "ADMIN" && (
                  <>
                    <td>
                      <button className="edit-btn" onClick={() => handleEditClick(user.user_id)}>
                        ✏️
                      </button>
                    </td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDelete(user.user_id)}>
                        🗑️
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form className="signup_form_signup" onSubmit={handleSave}>
              <h3 className="sub_heading_signup">Edit User Information</h3>
              <div className="input_group_signup">
                <input
                  placeholder="Username"
                  type="text"
                  className="input_field_signup"
                  value={editData.username}
                  onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                />
              </div>
              <div className="input_group_signup">
                <input
                  placeholder="Email"
                  type="email"
                  className="input_field_signup"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                />
              </div>
              <div className="input_group_signup">
                <input
                  placeholder="Phone Number"
                  type="tel"
                  className="input_field_signup"
                  value={editData.phoneNumber}
                  onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value })}
                />
              </div>
              <div className="input_group_signup">
                <label>Shifts</label>
                <select
                  className="input_field_signup"
                  value={editData.shifts}
                  onChange={(e) => setEditData({ ...editData, shifts: e.target.value })}
                >
                  <option value="morning">Morning Shift</option>
                  <option value="afternoon">Afternoon Shift</option>
                  <option value="evening">Evening Shift</option>
                  <option value="night">Night Shift</option>
                </select>
              </div>
              <div className="input_group_signup">
                <label>User Type</label>
                <select
                  className="input_field_signup"
                  value={editData.userType}
                  onChange={(e) => setEditData({ ...editData, userType: e.target.value })}
                >
                  <option value="admin">Admin</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="worker">Worker</option>
                </select>
              </div>
              <div className="input_group_signup">
                <label>Employee ID</label>
                <input
                  type="text"
                  className="input_field_signup"
                  value={editData.employeeId}
                  onChange={(e) => setEditData({ ...editData, employeeId: e.target.value })}
                />
              </div>
              <button className="save_button" type="submit">Save</button>
              <button className="cancel_button" type="button" onClick={handleClose}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Userlist;
