import { useState, useRef } from 'react'
import './App.css'
import Card from './Components/Card'
import { Search } from 'lucide-react';
import NavBar from './Components/NavBar';


function App() {
  const [url , setUrl] = useState('');
  const [repos, setRepos] = useState([]);


  const fetchJson = async ()=>{
    const link = import.meta.env.VITE_BACKEND_URL;
    
    let params = '';
    params = url.replace('https://github.com/', '');
    params = params.replace('.git', '');
    params = params.split('/');
    

    try{
      const response = await fetch(`${link}/${params[0]}/${params[1]}` ,{
        "method" : "GET"
      });

      if(!response.ok) console.log("Error: ", response.status);
      const data = await response.json();
      console.log(data);
      const newRepo = {
        id: Date.now(),
        username: data.username,
        repo_name: data.repo.name,
        repo_desc: data.repo.desc
      }
      setRepos([...repos, newRepo]);
    }catch(error){
      console.log("failed to fetch json", error);
    }
  }

  const deleteRepo = (id) => {
    const updatedRepos = repos.filter(repo => repo.id !== id);
    setRepos(updatedRepos);
  };
  return (
    <>
      <NavBar />
      <div className='field'>
        <Search />
        <input type="text" placeholder='enter repository url : ' value={url} onChange={(e)=>setUrl(e.target.value)} />
        <button onClick={fetchJson}>Fetch Repo</button>
      </div>
      
      <p className='repos-count'>Showing {repos.length} repositories</p>
      <div className='repos-container'>{repos.map((repo) => (
        <Card key={repo.id}
              username={repo.username}
              repo_name={repo.repo_name}
              repo_desc={repo.repo_desc}
              onDelete={() => deleteRepo(repo.id)}
        />
      ))}</div>
    </>
  )
}

export default App