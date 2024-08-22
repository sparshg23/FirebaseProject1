import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Auth } from './components/auth';
import { db ,auth,storage} from "./config/Firebase";
import { getDocs, collection, addDoc, deleteDoc, doc,updateDoc } from "firebase/firestore";
import {ref,uploadBytes} from "firebase/storage"
function App() {
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  const [updatedMovieTitle,setupdatedMovieTitle]=useState("")
  const[fileUpload,setfileUpload]=useState("")

  const moviesCollectionRef = collection(db, "movies");

  

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,  // Correctly assign the document ID to the 'id' property
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmit = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        UserId: auth?.currentUser?.uid,

      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovieList(); // Refresh the movie list after deletion
    } catch (err) {
      console.error(err);
    }
  };

  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc,{title: updatedMovieTitle});
      
      getMovieList(); // Refresh the movie list after deletion
    } catch (err) {
      console.error(err);
    }
  };

  const uploadFile=async()=>{
    if(!fileUpload) return;
    const filesFolder=ref(storage,`ProjectFile/${fileUpload.name}`);
    try{
    await uploadBytes(filesFolder,fileUpload);
    }catch(err){
      console.error(err);
    }
  }

  return (
    <>
      <div className='App'>
        <Auth />
        <div>
          <input
            placeholder='Movie title...'
            onChange={(e) => setNewMovieTitle(e.target.value)}
          />
          <input
            placeholder='Release Date...'
            type='number'
            onChange={(e) => setNewReleaseDate(Number(e.target.value))}
          />
          <input
            type='checkbox'
            checked={isNewMovieOscar}
            onChange={(e) => setIsNewMovieOscar(e.target.checked)}
          />
          <button onClick={onSubmit}>Submit Movie</button>
          {movieList.map((movie) => (
            <div key={movie.id}>
              <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
                {movie.title}
              </h1>
              <p>Date: {movie.releaseDate}</p>
              <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

              <input placeholder='new title..' 
              onChange={(e)=> setupdatedMovieTitle(e.target.value)}/>
              <button onClick={()=> updateMovieTitle(movie.id)}>Update Title</button>

            </div>
          ))}
          <div>
            <input type='file'
            onChange={(e)=> setfileUpload(e.target.files[0])}/>
            <button onClick={uploadFile}>Upload File</button>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default App;
