// import { useEffect, useState } from 'react';
// import { NavLink } from 'react-router'; // Fixed import
// import { useDispatch, useSelector } from 'react-redux';
// import axiosClient from '../utils/axiosClient';
// import { logoutUser } from '../authSlice';

// function PracticePage() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const [problems, setProblems] = useState([]);
//   const [solvedProblems, setSolvedProblems] = useState([]);
//   const [filters, setFilters] = useState({
//     difficulty: 'all',
//     tag: 'all',
//     status: 'all' 
//   });

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const { data } = await axiosClient.get('/problem/getAllProblem');
//         setProblems(data);
//       } catch (error) {
//         console.error('Error fetching problems:', error);
//       }
//     };

//     const fetchSolvedProblems = async () => {
//       try {
//         const { data } = await axiosClient.get('/problem/problemSolvedByUser');
//         setSolvedProblems(data);
//       } catch (error) {
//         console.error('Error fetching solved problems:', error);
//       }
//     };

//     fetchProblems();
//     if (user) fetchSolvedProblems();
//   }, [user]);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     setSolvedProblems([]); // Clear solved problems on logout
//   };

//   const filteredProblems = problems.filter(problem => {
//     const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
//     const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
//     const statusMatch = filters.status === 'all' || 
//                       solvedProblems.some(sp => sp._id === problem._id);
//     return difficultyMatch && tagMatch && statusMatch;
//   });

//   return (
//     <div className="min-h-screen bg-base-200">
//       {/* Navigation Bar */}
//       <nav className="navbar bg-base-100 shadow-lg px-4">
//         <div className="flex-1">
//           <NavLink to="/" className="btn btn-ghost text-xl">LeetCode</NavLink>
//         </div>
//         <div className="flex-none gap-4">
//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} className="btn btn-ghost">
//               {user?.firstName}
//             </div>
//             <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
//               <li><button onClick={handleLogout}>Logout</button></li>
//               {user.role=='admin'&&<li><NavLink to="/admin">Admin</NavLink></li>}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="container mx-auto p-4">
//         {/* Filters */}
//         <div className="flex flex-wrap gap-4 mb-6">
//           {/* New Status Filter */}
//           <select 
//             className="select select-bordered"
//             value={filters.status}
//             onChange={(e) => setFilters({...filters, status: e.target.value})}
//           >
//             <option value="all">All Problems</option>
//             <option value="solved">Solved Problems</option>
//           </select>

//           <select 
//             className="select select-bordered"
//             value={filters.difficulty}
//             onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
//           >
//             <option value="all">All Difficulties</option>
//             <option value="easy">Easy</option>
//             <option value="medium">Medium</option>
//             <option value="hard">Hard</option>
//           </select>

//           <select 
//             className="select select-bordered"
//             value={filters.tag}
//             onChange={(e) => setFilters({...filters, tag: e.target.value})}
//           >
//             <option value="all">All Tags</option>
//             <option value="array">Array</option>
//             <option value="linkedList">Linked List</option>
//             <option value="graph">Graph</option>
//             <option value="dp">DP</option>
//           </select>
//         </div>

//         {/* Problems List */}
//         <div className="grid gap-4">
//           {filteredProblems.map(problem => (
//             <div key={problem._id} className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <div className="flex items-center justify-between">
//                   <h2 className="card-title">
//                     <NavLink to={`/problem/${problem._id}`} className="hover:text-primary">
//                       {problem.title}
//                     </NavLink>
//                   </h2>
//                   {solvedProblems.some(sp => sp._id === problem._id) && (
//                     <div className="badge badge-success gap-2">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                       Solved
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="flex gap-2">
//                   <div className={`badge ${getDifficultyBadgeColor(problem.difficulty)}`}>
//                     {problem.difficulty}
//                   </div>
//                   <div className="badge badge-info">
//                     {problem.tags}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// const getDifficultyBadgeColor = (difficulty) => {
//   switch (difficulty.toLowerCase()) {
//     case 'easy': return 'badge-success';
//     case 'medium': return 'badge-warning';
//     case 'hard': return 'badge-error';
//     default: return 'badge-neutral';
//   }
// };

// export default PracticePage;


import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Filter, CheckCircle, Circle, Flag, ChevronLeft, ChevronRight, Calendar, Users, Star, Lock } from 'lucide-react';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';

// Mock data for Topics and Companies
const TOPICS = [
  { name: "Array", count: 2197 },
  { name: "String", count: 880 },
  { name: "Hash Table", count: 625 },
  { name: "Math", count: 684 },
  { name: "Dynamic Programming", count: 666 },
  { name: "Sorting", count: 527 },
  { name: "Greedy", count: 452 },
  { name: "Tree", count: 420 },
  { name: "Depth-First Search", count: 387 },
  { name: "Breadth-First Search", count: 365 },
  { name: "Linked List", count: 342 },
  { name: "Stack", count: 318 },
  { name: "Binary Search", count: 295 },
  { name: "Matrix", count: 273 },
];

const COMPANIES = [
  { name: "Google", count: 2322 },
  { name: "Amazon", count: 1989 },
  { name: "Meta", count: 1876 },
  { name: "Microsoft", count: 1789 },
  { name: "Apple", count: 1654 },
  { name: "Adobe", count: 1543 },
  { name: "Netflix", count: 1432 },
  { name: "Uber", count: 1321 },
  { name: "LinkedIn", count: 1210 },
  { name: "Spotify", count: 1109 },
  { name: "Airbnb", count: 1008 },
  { name: "Salesforce", count: 997 },
];

function PracticePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
    status: 'all',
    company: 'all'
  });
  const [currentDate, setCurrentDate] = useState(new Date());

  const [difficultyOpen, setDifficultyOpen] = useState(false);
  const [tagOpen, setTagOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/getAllProblem');
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/problemSolvedByUser');
        setSolvedProblems(data);
      } catch (error) {
        console.error('Error fetching solved problems:', error);
      }
    };

    fetchProblems();
    if (user) fetchSolvedProblems();
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  // Filter Logic
  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
    const isSolved = solvedProblems.some(sp => sp._id === problem._id);
    const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
    const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
    const statusMatch = filters.status === 'all' || 
                      (filters.status === 'solved' && isSolved) || 
                      (filters.status === 'unsolved' && !isSolved);
    const companyMatch = filters.company === 'all' || problem.companies?.includes(filters.company);

    return matchesSearch && difficultyMatch && tagMatch && statusMatch && companyMatch;
  });

  // Calendar Helper
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const daysInMonth = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  // Get unique tags and companies from problems
  const allTags = [...new Set(problems.map(p => p.tags))].filter(Boolean);
  const allCompanies = [...new Set(problems.flatMap(p => p.companies || []))].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-300 font-sans">
      
      {/* --- Fixed Navbar --- */}
      <nav className="fixed w-full z-50 bg-[#161b22] backdrop-blur-md border-b border-gray-800 h-16 flex items-center px-4 md:px-8 justify-between shadow-lg">
        <div className="flex items-center gap-8">
          <NavLink to="/" className="text-2xl font-bold text-white tracking-tight">STRIKE</NavLink>
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
            <NavLink to="/" className="hover:text-white transition">Home</NavLink>
            <NavLink to="/courses" className="hover:text-white transition">Courses</NavLink>
            <span className="text-white border-b-2 border-blue-500 pb-5">Practice</span>
            <NavLink to="/contests" className="hover:text-white transition">Contests</NavLink>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button className="hidden sm:block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium transition shadow-lg shadow-blue-900/20">
             Get Started
           </button>
           <div className="dropdown dropdown-end">
             <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
               <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                 {user?.firstName?.[0] || 'U'}
               </div>
             </div>
             <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#161b22] rounded-xl border border-gray-700 w-52">
               <li className="menu-title text-gray-400">Welcome, {user?.firstName || 'User'}</li>
               <li><a className="hover:bg-gray-800">Profile</a></li>
               <li><a className="hover:bg-gray-800">Settings</a></li>
               {user.role=='admin'&&<li><NavLink to="/admin">Admin</NavLink></li>}
               <li><button onClick={handleLogout} className="text-red-400 hover:bg-red-900/20">Logout</button></li>
             </ul>
           </div>
        </div>
      </nav>

      <div className="pt-24 px-4 md:px-8 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 pb-12">
        
        {/* --- Left Sidebar (1/4 width) --- */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Calendar Widget */}
          <div className="bg-[#161b22] rounded-xl p-4 border border-gray-800 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold text-lg">Daily Activity</h3>
              <div className="flex gap-1 bg-gray-800 rounded-lg p-1">
                <button className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition"><ChevronLeft className="w-4 h-4" /></button>
                <button className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
            
            <div className="text-sm text-gray-400 mb-4 font-medium">
              {monthName} {year}
            </div>

            {/* Calendar Grid Header */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-gray-500 font-medium">
              <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
            </div>

            {/* Calendar Grid Body */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {/* Empty slots for offset */}
              {[...Array(3)].map((_, i) => <div key={`empty-${i}`} className="h-7"></div>)}
              
              {/* Days */}
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const isActive = day > 10 && day <= 15;
                const intensity = isActive ? (day % 3 === 0 ? 'bg-green-600' : 'bg-green-500') : 'bg-gray-800';
                return (
                  <div 
                    key={day} 
                    className={`h-7 rounded flex items-center justify-center text-xs ${
                      isActive ? 'text-white' : 'text-gray-400'
                    } ${intensity} hover:ring-1 hover:ring-white transition cursor-pointer`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Trending Companies */}
          <div className="bg-[#161b22] rounded-xl p-4 border border-gray-800 shadow-xl">
            <h3 className="text-white font-semibold text-lg mb-4">Trending Companies</h3>
            <div className="flex items-center gap-2 mb-3">
              <Search className="w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search for a company..." 
                className="w-full bg-[#0d1117] border border-gray-700 rounded-lg text-xs text-white placeholder-gray-600 px-2 py-1"
              />
            </div>
            <div className="space-y-2">
              {COMPANIES.slice(0, 6).map(company => (
                <div key={company.name} className="flex items-center justify-between py-2 px-3 rounded bg-[#0d1117] hover:bg-gray-800 transition">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300 text-sm">{company.name}</span>
                  </div>
                  <span className="text-xs font-medium text-blue-400">{company.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* My Lists */}
          <div className="bg-[#161b22] rounded-xl p-4 border border-gray-800 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">My Lists</h3>
              <button className="text-blue-400 text-xs hover:text-blue-300">+</button>
            </div>
            <div className="space-y-2">
              {[
                { name: "Favorite", count: 12 },
                { name: "MY PLAYLIST", count: 8 },
                { name: "feenwick topics", count: 5 },
                { name: "greedy", count: 3 },
                { name: "square root", count: 2 },
                { name: "dp", count: 1 },
                { name: "my", count: 0 },
              ].map(list => (
                <div key={list.name} className="flex items-center justify-between py-2 px-3 rounded bg-[#0d1117] hover:bg-gray-800 transition">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300 text-sm">{list.name}</span>
                  </div>
                  <span className="text-xs font-medium text-blue-400">{list.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Right Column: Main Content (3/4 width) --- */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Top Filter Pills */}
          <div className="bg-[#161b22] rounded-xl p-4 border border-gray-800 shadow-xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <button className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium">
                All Topics
              </button>
              {TOPICS.slice(0, 8).map(topic => (
                <button 
                  key={topic.name} 
                  className="px-4 py-2 rounded-full border border-gray-700 bg-[#161b22] hover:border-blue-500 hover:text-blue-400 transition text-sm text-gray-300"
                  onClick={() => setFilters({...filters, tag: topic.name})}
                >
                  {topic.name} <span className="text-gray-500 text-xs ml-1">({topic.count})</span>
                </button>
              ))}
              <button className="px-4 py-2 rounded-full text-blue-400 border border-blue-500/30 bg-blue-500/10 text-sm font-medium hover:bg-blue-500/20 transition">
                Expand
              </button>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                type="text" 
                placeholder="Search questions" 
                className="w-full pl-10 pr-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition text-white placeholder-gray-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="flex gap-2">
                {/* Difficulty Dropdown */}
                <div className="relative">
                <button 
                    className="flex items-center gap-2 px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-sm hover:border-gray-600 transition text-gray-300"
                    onClick={() => setDifficultyOpen(!difficultyOpen)}
                >
                    <Filter className="w-4 h-4" /> Difficulty
                </button>
                {difficultyOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-[#161b22] border border-gray-700 rounded-lg shadow-lg z-10">
                    <div className="p-2">
                        <button 
                        onClick={() => { setFilters({...filters, difficulty: 'all'}); setDifficultyOpen(false); }}
                        className={`w-full text-left px-3 py-1 rounded ${filters.difficulty === 'all' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'}`}
                        >
                        All Difficulties
                        </button>
                        <button 
                        onClick={() => { setFilters({...filters, difficulty: 'easy'}); setDifficultyOpen(false); }}
                        className={`w-full text-left px-3 py-1 rounded ${filters.difficulty === 'easy' ? 'bg-green-600 text-white' : 'hover:bg-gray-800'}`}
                        >
                        Easy
                        </button>
                        <button 
                        onClick={() => { setFilters({...filters, difficulty: 'medium'}); setDifficultyOpen(false); }}
                        className={`w-full text-left px-3 py-1 rounded ${filters.difficulty === 'medium' ? 'bg-yellow-600 text-white' : 'hover:bg-gray-800'}`}
                        >
                        Medium
                        </button>
                        <button 
                        onClick={() => { setFilters({...filters, difficulty: 'hard'}); setDifficultyOpen(false); }}
                        className={`w-full text-left px-3 py-1 rounded ${filters.difficulty === 'hard' ? 'bg-red-600 text-white' : 'hover:bg-gray-800'}`}
                        >
                        Hard
                        </button>
                    </div>
                    </div>
                )}
                </div>

                {/* Tag Dropdown */}
                <div className="relative">
                <button 
                    className="flex items-center gap-2 px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-sm hover:border-gray-600 transition text-gray-300"
                    onClick={() => setTagOpen(!tagOpen)}
                >
                    <Filter className="w-4 h-4" /> Tag
                </button>
                {tagOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-[#161b22] border border-gray-700 rounded-lg shadow-lg z-10">
                    <div className="p-2">
                        <button 
                        onClick={() => { setFilters({...filters, tag: 'all'}); setTagOpen(false); }}
                        className={`w-full text-left px-3 py-1 rounded ${filters.tag === 'all' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'}`}
                        >
                        All Tags
                        </button>
                        {allTags.map(tag => (
                        <button 
                            key={tag}
                            onClick={() => { setFilters({...filters, tag}); setTagOpen(false); }}
                            className={`w-full text-left px-3 py-1 rounded ${filters.tag === tag ? 'bg-purple-600 text-white' : 'hover:bg-gray-800'}`}
                        >
                            {tag}
                        </button>
                        ))}
                    </div>
                    </div>
                )}
                </div>

                {/* Status Dropdown */}
                <div className="relative">
                <button 
                    className="flex items-center gap-2 px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-sm hover:border-gray-600 transition text-gray-300"
                    onClick={() => setStatusOpen(!statusOpen)}
                >
                    <Filter className="w-4 h-4" /> Status
                </button>
                {statusOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-[#161b22] border border-gray-700 rounded-lg shadow-lg z-10">
                    <div className="p-2">
                        <button 
                        onClick={() => { setFilters({...filters, status: 'all'}); setStatusOpen(false); }}
                        className={`w-full text-left px-3 py-1 rounded ${filters.status === 'all' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'}`}
                        >
                        All Problems
                        </button>
                        <button 
                        onClick={() => { setFilters({...filters, status: 'solved'}); setStatusOpen(false); }}
                        className={`w-full text-left px-3 py-1 rounded ${filters.status === 'solved' ? 'bg-green-600 text-white' : 'hover:bg-gray-800'}`}
                        >
                        Solved
                        </button>
                        <button 
                        onClick={() => { setFilters({...filters, status: 'unsolved'}); setStatusOpen(false); }}
                        className={`w-full text-left px-3 py-1 rounded ${filters.status === 'unsolved' ? 'bg-red-600 text-white' : 'hover:bg-gray-800'}`}
                        >
                        Unsolved
                        </button>
                    </div>
                    </div>
                )}
                </div>

                {/* DSA Sheet Button */}
                <button className="flex items-center gap-2 px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-sm hover:border-gray-600 transition text-gray-300">
                <Flag className="w-4 h-4" /> DSA Sheet
                </button>
            </div>
            </div>
          </div>

          {/* Problems List */}
          <div className="space-y-4">
            {filteredProblems.length > 0 ? (
              filteredProblems.map((problem, idx) => {
                const isSolved = solvedProblems.some(sp => sp._id === problem._id);
                return (
                  <div key={problem._id} className="bg-[#161b22] rounded-xl p-4 border border-gray-800 hover:border-blue-500/30 transition group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                                                {isSolved ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-600 group-hover:text-gray-400" />
                        )}
                        <span className="text-gray-500 text-xs font-mono">#{idx + 1}</span>
                        <h3 className="text-white font-medium group-hover:text-blue-400 transition">
                          <NavLink to={`/problem/${problem._id}`} className="hover:underline">
                            {problem.title}
                          </NavLink>
                        </h3>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          problem.difficulty === 'Easy' ? 'bg-green-900/30 text-green-400' :
                          problem.difficulty === 'Medium' ? 'bg-yellow-900/30 text-yellow-400' :
                          'bg-red-900/30 text-red-400'
                        }`}>
                          {problem.difficulty}
                        </span>
                        {problem.locked && (
                          <Lock className="w-4 h-4 text-gray-500" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div>Acceptance: {problem.acceptance || 'N/A'}</div>
                      {problem.companies && problem.companies.length > 0 && (
                        <div className="flex gap-1">
                          {problem.companies.slice(0, 2).map(company => (
                            <span key={company} className="text-gray-400">• {company}</span>
                          ))}
                          {problem.companies.length > 2 && (
                            <span className="text-gray-400">+{problem.companies.length - 2}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <Search className="w-12 h-12 mb-4 opacity-50" />
                <p className="text-lg font-medium">No problems match your filters</p>
                <button 
                  onClick={() => setFilters({difficulty: 'all', tag: 'all', status: 'all', company: 'all'})}
                  className="mt-3 text-blue-400 hover:text-blue-300 underline font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PracticePage;