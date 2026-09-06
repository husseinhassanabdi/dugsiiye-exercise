import UserList from './UserList';

const App = () => {
  const users = [
    { id: 1, name: 'xuseen', email: 'xuseen@gmail.com' },
    { id: 2, name: 'xasan', email: 'xasan@gmail.com' },
  ];

  return (
    <div>
      <UserList users={users} />
    </div>
  );
};

export default App;