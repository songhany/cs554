import { useState } from 'react';
import { useSelector } from 'react-redux';
import AddUser from './AddUser';
import User from './User';


function Users() {
  const [addBtnToggle, setAddBtnToggle] = useState(false);

  const allUsers = useSelector((state) => state.users);
  console.log('allUsers', allUsers);

  return (
    <div className="todo-wrapper">
      <h2>Users</h2>
      <button onClick={() => setAddBtnToggle(!addBtnToggle)}>Add A User</button>
      <br />
      <br />
      <br />
      {addBtnToggle && <AddUser />}
      <br />
      {allUsers && allUsers.map((user) => {  {/* We pass every user's id into User Components that is ./Components/User.js */}
        console.log(user);
        return <User key={user.id} user={user} />;
      })}

    </div>
  );
}

export default Users;
