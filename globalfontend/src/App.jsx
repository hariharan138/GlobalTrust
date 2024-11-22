import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState(null); // Initialize state with null

  // Fetch data in useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/trust/gettrust');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const res = await response.json();
        console.log(res.data)
        setState(res.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div>
        {state?.map((i)=>{
            return(
              <p>{i.firstName}</p>
            )  
          })
        }
    </div>
  );
}

export default App;
