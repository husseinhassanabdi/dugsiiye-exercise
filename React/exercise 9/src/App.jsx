import { useState, useEffect } from 'react'

const GitHubUsersearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    if (error) {

      console.error('Error fetching user data:', error);
    }

  },[error]);

 const hadleSearch = async () => {
   if(!searchTerm) return;

   setLoading(true);
   setError(null);
   setUserData(null);

   try {

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch(`https://api.github.com/users/${searchTerm}`);


    // if (!response.ok) {
    //   throw new Error('User not found');
    // }

    if (!response.ok) {
  throw new Error(`GitHub returned ${response.status}`);
}

    const data = await response.json();
    setUserData(data);
   } catch (err) {
    setError(err.message);
   } finally {
    setLoading(false);
   }
 };


  return (
    <div>
     <h2>GitHub User Search</h2>
      <input
        type="text"
        placeholder="Enter GitHub username..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={hadleSearch}>Search</button>

           {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {userData && (
        <div>
          <h3>{userData.name || userData.login}</h3>
          <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} width="100" />

          <p>Location: {userData.location || 'Not specified'}</p>
          <p>Bio: {userData.bio || 'No bio available'}</p>
        </div>
      )}
    </div>
  )
}

export default GitHubUsersearch
