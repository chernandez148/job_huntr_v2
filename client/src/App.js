import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import IsLoading from './components/IsLoading/IsLoading';
import Navbar from './components/Navbar/Navbar';
import Data from './components/Data/Data';
import Footer from './components/Footer/Footer';

// Import the components for different routes
import Home from './components/Home/Home';
import SearchResults from './components/SearchResults/SearchResults';
import './App.css'

function App() {
  const jobData = useSelector((state) => state.jobData.jobData);
  const isLoading = useSelector((state) => state.isLoading.isLoading);

  return (
    <Router>
      <div className="App">
        <Data />
        {jobData && jobData.data && jobData.data.length > 0 ? (
          <>
            {isLoading &&
              <LoadingBar
                className="status-bar"
                progress={isLoading ? 90 : 100} // Set the progress value based on loading state
                height={2} // Customize the height of the loading bar
                color='#eb4a6d' // Customize the loading bar color
              />}
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search_results" element={<SearchResults />} />
            </Routes>
            <Footer />
          </>
        ) : (
          <>
            <LoadingBar
              className="status-bar"
              progress={isLoading ? 90 : 100} // Set the progress value based on loading state
              height={2} // Customize the height of the loading bar
              color='#eb4a6d' // Customize the loading bar color
            />
            <IsLoading />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
