import './App.css';
import Home from './components/Home/Home';
import IsLoading from './components/IsLoading/IsLoading';
import Navbar from './components/Navbar/Navbar';
import Data from './components/Data/Data';
import { useSelector } from 'react-redux';
import Footer from './components/Footer/Footer';

function App() {
  const jobData = useSelector(state => state.jobData.jobData);

  return (
    <div className="App">
      <Data />
      {jobData && jobData.data && jobData.data.length > 0 ? (
        <>
          <Navbar />
          <Home />
          <Footer />
        </>
      ) : (
        <IsLoading />
      )}
    </div>
  );
}

export default App;
