import { useEffect, useState } from 'react'


const GreetingTitle = () => {
  const [name, setName] = useState('')
  const [greeting, setGreeting] = useState("Hello,")



  useEffect(() => {
  if (!name) {
    document.title = "Welcome"
  } else {
    document.title = `${greeting} ${name}`};
  }, [name, greeting]);

  console.log("clg")

  return ( 
    <div>
      <h2>Enter your name</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <h2>Choose greeting</h2>
      <input type="text" value={greeting} onChange={(e) => setGreeting(e.target.value)} /> 
      
    </div>
  )

  

  
}

export default GreetingTitle;
