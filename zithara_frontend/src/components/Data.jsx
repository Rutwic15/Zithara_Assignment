import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

const Data = () => {
  const [userData, setUserData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const limit = 3;
  const [filteredData, setFilteredData] = useState([]);
  const [searchMessage, setSearchMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = (cp) => {
    const payload = {
      "pageNumber": cp || currentPage,
      "pageSize": pageSize
    };

    axios.get('http://localhost:8001/api/v1/data/getdata', {
      params: payload
    })
      .then(response => {
        // Handle the response data
        setUserData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
  };

  const handleSortByDate = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      return new Date(a.created_at) - new Date(b.created_at);
    });
    setFilteredData(sortedData);
    setSortBy('date');
  };

  const handleSortByTime = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });
    setFilteredData(sortedData);
    setSortBy('time');
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = userData.filter(user => (
        user.customer_name.toLowerCase() === query ||
        user.location.toLowerCase().includes(query)
    ));
    setFilteredData(filtered);
    if (filtered.length === 0) {
        setSearchMessage('No results found');
    } else {
        setSearchMessage('');
    }
};

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
    fetchData(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prevPage => prevPage - 1);
      fetchData(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto px-5 py-5">
      <div className="flex justify-between items-center mt-8">
        <div className="flex space-x-4">
          <div className="px-4 py-2 rounded-md focus:outline-none">
            <button onClick={handleSortByDate} className="px-4 py-2 bg-blue-500 text-white rounded-md">Sort by Date</button>
          </div>
          <div className="px-4 py-2 rounded-md focus:outline-none">
            <button onClick={handleSortByTime} className="px-4 py-2 bg-blue-500 text-white rounded-md">Sort by Time</button>
          </div>
        </div>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search by name or location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded-md">Search</button>
        </div>
      </div>
      <div className="mt-8 px-6 py-6">
        <table className="w-full px-4 py-4">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">s.no</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Customer Name</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Age</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Phone</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Location</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Date</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(user => (
              <tr key={user.sno} className="border-b border-gray-200">
                <td className="text-sm text-gray-700 ">{user.sno}</td>
                <td className="text-sm text-gray-700 ">{user.customer_name}</td>
                <td className="px-4 py-2">{user.age}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2">{user.location}</td>
                <td className="px-4 py-2">{new Date(user.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-2">{new Date(user.created_at).toLocaleTimeString()}</td>
              </tr>
            ))}
            {searchMessage && <p className="text-red-500 text-xl font-semibold flex items-center justify-center">{searchMessage}</p>}
          </tbody>
        </table>
        <div className="px-2 py-2 mt-2 flex justify-around items-end">
          <button onClick={prevPage} className="px-4 py-2 bg-blue-500 text-white rounded-md" disabled={currentPage === 1} >Previous</button>
          <p>Page {currentPage}</p>
          <button onClick={() => (nextPage())} className="px-4 py-2 bg-blue-500 text-white rounded-md" disabled={currentPage === limit}>next</button>
        </div>
      </div>
    </div>
  );
};

export default Data;
