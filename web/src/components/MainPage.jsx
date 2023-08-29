import React, {useEffect, useState} from 'react';
import axios from 'axios';

function MainPage() {
  const [domain, setDomain] = useState('');
  const [subdomains, setSubdomains] = useState([]);
  const [showButton, setShowButton] = useState(false);

  const handleFetch = async () => {
    const fetchBtn = document.getElementById("fetch--btn");
    fetchBtn.innerText="Working on it... Feel free to stretch! 🧘"
    try {
      const response = await axios.get(`http://localhost:8000/${domain}`);
      const data = response.data.subdomains;

      const parsedSubdomains = data.reduce((acc, str) => {
        return acc.concat(str.split('\n'));
      }, []);

      const uniqueSubdomainsSet = new Set(parsedSubdomains);
      uniqueSubdomainsSet.delete(domain);
      const uniqueSubdomains = Array.from(uniqueSubdomainsSet);
      setSubdomains(uniqueSubdomains);
    } catch (error) {
      console.error("There was an error fetching the subdomains:", error);
    } finally {
      fetchBtn.innerText="Get Subdomains"
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
      <div className="bg-gradient-to-r from-gray-200 to-gray-300 min-h-screen flex items-center justify-center py-10">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl mx-auto relative"> { /* Added relative here */}
          <h1 style={{fontFamily: "'Black Ops One', cursive", fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center', color: '#4A4A4A'}}>Subdomain Scanner</h1>
          <p className="text-center text-lg text-gray-400 my-4">Enter your domain and get all subdomains</p>

          <div className="mb-6">
            <input
                type="text"
                value={domain}
                onChange={e => setDomain(e.target.value)}
                onKeyDown={e=> {if(e.key==='Enter')handleFetch()}}
                placeholder="Enter domain (e.g. armur.ai)"
                required
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition duration-150"
            />
          </div>
          <button id="fetch--btn" onClick={handleFetch} className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-grey-600 transition duration-150">
            Get Subdomains
          </button>
          <div className="mt-6">
            <ul>
              {subdomains.map((sub, index) => (
                  <li key={index} className="mb-2 p-2 bg-gray-100 rounded-lg">{sub}</li>
              ))}
            </ul>
          </div>
          {subdomains.length > 20 && showButton &&
              <button onClick={handleScrollToTop} style={{ position: 'fixed', bottom: '20px', right: '20px' }} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-150">
                Scroll Up
              </button>
          }
        </div>
      </div>
  );


}

export default MainPage;
