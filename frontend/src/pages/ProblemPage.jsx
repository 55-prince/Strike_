
import { useState, useEffect, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Editor from '@monaco-editor/react';
import { useParams, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import axiosClient from "../utils/axiosClient"
import SubmissionHistory from "../components/SubmissionHistory"
import ChatAi from '../components/ChatAi';
import Editorial from '../components/Editorial';
import {
  FileText, BookOpen, Code2, History,
  Play, Send, TerminalSquare, ClipboardList,
  CheckCircle2, XCircle, GripVertical,
  Bug, Sparkles, Timer as TimerIcon, RotateCcw,
  Pause, X, LogOut, UserCircle, Settings, ShieldCheck
} from 'lucide-react';

const langMap = {
  cpp: 'C++',
  java: 'Java',
  javascript: 'JavaScript'
};

// ChatAI removed from here — it now lives in the top bar (see step 6)
const LEFT_TABS = [
  { id: 'description', label: 'Description', icon: FileText },
  { id: 'editorial', label: 'Editorial', icon: BookOpen },
  { id: 'solutions', label: 'Solutions', icon: Code2 },
  { id: 'submissions', label: 'Submissions', icon: History },
];

const RIGHT_TABS = [
  { id: 'code', label: 'Code', icon: Code2 },
  { id: 'testcase', label: 'Testcase', icon: TerminalSquare },
  { id: 'result', label: 'Result', icon: ClipboardList },
];

const LANGS = ['cpp', 'java', 'javascript'];

const difficultyStyles = {
  easy: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  medium: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  hard: 'text-rose-400 border-rose-400/30 bg-rose-400/10',
};

// ---- small helper: format seconds as mm:ss ----
const formatTime = (totalSeconds) => {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

const ProblemPage = () => {
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState('description');
  const [activeRightTab, setActiveRightTab] = useState('code');
  const editorRef = useRef(null);
  let { problemId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // TODO: confirm this matches your authSlice's state shape (Redux memory notes
  // mention an `authChecked` flag, so your slice likely looks like state.auth.user)
  const { user } = useSelector((state) => state.auth);

  const { handleSubmit } = useForm();

  // ---------- 1 & 2: brand button -> navigate to practice page ----------
  // TODO: replace '/practice' with your actual route from App.jsx.
  // Based on your file tree, pages/PracticePage.jsx is likely mounted there,
  // e.g. <Route path="/practice" element={<PracticePage />} />
  const goToPracticePage = () => navigate('/practice');

  // ---------- 3: profile dropdown ----------
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // TODO: replace with your real logout thunk, e.g.:
    // dispatch(logoutUser());
    setProfileOpen(false);
    navigate('/login');
  };

  // ---------- 4: stopwatch ----------
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  const resetTimer = () => {
    setSeconds(0);
    setTimerRunning(true);
  };

  // ---------- 5: bug report button ----------
  const handleReportBug = () => {
    // TODO: once your bug-report API exists, replace this with something like:
    // await axiosClient.post('/feedback/bug', { problemId, code, language: selectedLanguage });
    console.log('Report bug clicked — wire this up to your API later.');
  };

  // ---------- 6: AI drawer (moved out of the left tab list) ----------
  const [aiOpen, setAiOpen] = useState(false);

  // ---------- Resizable split panel ----------
  const [leftWidth, setLeftWidth] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleDividerMouseDown = useCallback(() => {
    isDragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      let pct = ((e.clientX - rect.left) / rect.width) * 100;
      pct = Math.min(75, Math.max(25, pct));
      setLeftWidth(pct);
    };
    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/problem/problemById/${problemId}`);
        const initialCode = response.data.startCode.find(sc => sc.language === langMap[selectedLanguage]).initialCode;
        setProblem(response.data);
        setCode(initialCode);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching problem:', error);
        setLoading(false);
      }
    };
    fetchProblem();
  }, [problemId]);

  useEffect(() => {
    if (problem) {
      const initialCode = problem.startCode.find(sc => sc.language === langMap[selectedLanguage]).initialCode;
      setCode(initialCode);
    }
  }, [selectedLanguage, problem]);

  const handleEditorChange = (value) => setCode(value || '');
  const handleEditorDidMount = (editor) => { editorRef.current = editor; };
  const handleLanguageChange = (language) => setSelectedLanguage(language);

  const handleRun = async () => {
    setLoading(true);
    setRunResult(null);
    try {
      const response = await axiosClient.post(`/submission/run/${problemId}`, {
        code,
        language: selectedLanguage
      });
      setRunResult(response.data);
      setLoading(false);
      setActiveRightTab('testcase');
    } catch (error) {
      console.error('Error running code:', error);
      setRunResult({ success: false, error: 'Internal server error' });
      setLoading(false);
      setActiveRightTab('testcase');
    }
  };

  const handleSubmitCode = async () => {
    setLoading(true);
    setSubmitResult(null);
    try {
      const response = await axiosClient.post(`/submission/submit/${problemId}`, {
        code: code,
        language: selectedLanguage
      });
      setSubmitResult(response.data);
      setLoading(false);
      setActiveRightTab('result');
    } catch (error) {
      console.error('Error submitting code:', error);
      setSubmitResult(null);
      setLoading(false);
      setActiveRightTab('result');
    }
  };

  const getLanguageForMonaco = (lang) => {
    switch (lang) {
      case 'javascript': return 'javascript';
      case 'java': return 'java';
      case 'cpp': return 'cpp';
      default: return 'javascript';
    }
  };

  if (loading && !problem) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-950">
        <span className="loading loading-spinner loading-lg text-violet-500"></span>
      </div>
    );
  }

  const TabButton = ({ tab, active, onClick }) => {
    const Icon = tab.icon;
    return (
      <button
        onClick={onClick}
        className={`relative flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-colors
          ${active ? 'text-violet-400' : 'text-zinc-400 hover:text-zinc-200'}`}
      >
        <Icon size={15} strokeWidth={2} />
        {tab.label}
        {active && (
          <span className="absolute left-2 right-2 -bottom-px h-[2px] rounded-full bg-violet-500" />
        )}
      </button>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-zinc-100">

      {/* ---------------- Top bar ---------------- */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 shrink-0 gap-4">

        {/* Left: brand -> navigates to practice/problem list page */}
        <button
          onClick={goToPracticePage}
          className="flex items-center gap-2 shrink-0 group"
          title="Back to problem list"
        >
          <span className="w-7 h-7 rounded-md bg-violet-600 flex items-center justify-center">
            <Code2 size={16} className="text-white" />
          </span>
          <span className="text-sm font-bold tracking-wide text-zinc-100 group-hover:text-violet-400 transition-colors">
            STRIKE
          </span>
        </button>

        {/* Middle-right: bug report, AI, timer */}
        <div className="flex items-center gap-2 ml-auto">

          {/* 5: bug report */}
          <button
            onClick={handleReportBug}
            title="Report a bug"
            className="w-8 h-8 flex items-center justify-center rounded-md text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 transition-colors"
          >
            <Bug size={16} />
          </button>

          {/* 6: AI, moved out of the left tab bar */}
          <button
            onClick={() => setAiOpen(true)}
            title="Ask AI"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
              text-violet-300 hover:text-white bg-violet-500/10 hover:bg-violet-600 border border-violet-500/30 transition-colors"
          >
            <Sparkles size={14} /> Ask AI
          </button>

          {/* 4: timer / stopwatch */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-800/60 border border-zinc-700 text-sm font-mono">
            <TimerIcon size={14} className="text-zinc-400" />
            <span className="text-zinc-200 min-w-[38px] text-center">{formatTime(seconds)}</span>
            <button
              onClick={() => setTimerRunning((r) => !r)}
              title={timerRunning ? 'Pause' : 'Resume'}
              className="text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              {timerRunning ? <Pause size={13} /> : <Play size={13} />}
            </button>
            <button
              onClick={resetTimer}
              title="Reset timer"
              className="text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <RotateCcw size={13} />
            </button>
          </div>

          {/* 3: profile dropdown, replaces the old Run/Submit buttons here */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen((o) => !o)}
              className="w-8 h-8 rounded-full bg-violet-600 hover:bg-violet-500 flex items-center justify-center text-sm font-semibold text-white transition-colors"
            >
              {user?.firstName ? user.firstName[0].toUpperCase() : <UserCircle size={18} />}
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl py-2 z-50">
                <div className="px-4 py-2 border-b border-zinc-800">
                  <p className="text-sm font-semibold text-zinc-100">
                    Welcome, {user?.firstName || 'there'}
                  </p>
                </div>
                <button
                  onClick={() => { setProfileOpen(false); navigate('/profile'); }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors"
                >
                  <UserCircle size={15} /> Profile
                </button>
                <button
                  onClick={() => { setProfileOpen(false); navigate('/settings'); }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors"
                >
                  <Settings size={15} /> Settings
                </button>
                {user?.role === 'admin' && (
                  <button
                    onClick={() => { setProfileOpen(false); navigate('/admin'); }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors"
                  >
                    <ShieldCheck size={15} /> Admin
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-400 hover:bg-zinc-800 transition-colors"
                >
                  <LogOut size={15} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- Split panels ---------------- */}
      <div ref={containerRef} className="flex-1 flex min-w-0 overflow-hidden">

        {/* Left Panel */}
        <div className="flex flex-col min-w-0 overflow-hidden" style={{ width: `${leftWidth}%` }}>
          <div className="flex bg-zinc-900/40 border-b border-zinc-800 px-2 shrink-0 overflow-x-auto">
            {LEFT_TABS.map(tab => (
              <TabButton
                key={tab.id}
                tab={tab}
                active={activeLeftTab === tab.id}
                onClick={() => setActiveLeftTab(tab.id)}
              />
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6 min-w-0">
            {problem && (
              <>
                {activeLeftTab === "description" && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-2xl font-bold text-zinc-50">{problem.title}</h1>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${difficultyStyles[problem.difficulty] || 'text-zinc-400 border-zinc-700'}`}>
                          {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                        </span>
                        {problem.tags && (Array.isArray(problem.tags) ? problem.tags : [problem.tags]).map((tag, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-md text-xs border border-zinc-700 text-zinc-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
                      <div className="whitespace-pre-wrap text-[15px] leading-7 text-zinc-300">
                        {problem.description}
                      </div>
                    </div>

                    {problem.visibleTestCases?.length > 0 && (
                      <div>
                        <h2 className="text-lg font-semibold mb-3 text-zinc-100">Examples</h2>
                        <div className="space-y-3">
                          {problem.visibleTestCases.map((example, index) => (
                            <div key={index} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
                              <h3 className="text-sm font-semibold mb-3 text-zinc-200">Example {index + 1}</h3>
                              <div className="space-y-2 text-sm font-mono">
                                <div><span className="text-zinc-500">Input:</span> <span className="text-violet-300">{example.input}</span></div>
                                <div><span className="text-zinc-500">Output:</span> <span className="text-emerald-300">{example.output}</span></div>
                                {example.explanation && (
                                  <div className="text-zinc-400 font-sans pt-1">
                                    <span className="text-zinc-500 font-mono">Explanation: </span>{example.explanation}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {problem.constraints?.length > 0 && (
                      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
                        <h2 className="text-lg font-semibold mb-3 text-zinc-100">Constraints</h2>
                        <ul className="space-y-2">
                          {problem.constraints.map((c, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <span className="text-violet-400 mt-1">•</span>
                              <code className="text-zinc-400">{c}</code>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {['Topics', 'Companies', 'Hint'].map((section) => (
                      <details key={section} className="group rounded-xl border border-zinc-800 overflow-hidden">
                        <summary className="cursor-pointer select-none px-5 py-3 font-medium text-zinc-200 bg-zinc-900/40 hover:bg-zinc-900/70 transition-colors flex items-center justify-between">
                          {section}
                          <span className="text-zinc-500 group-open:rotate-90 transition-transform">›</span>
                        </summary>
                        <div className="px-5 py-4 border-t border-zinc-800">
                          {section === 'Topics' && (
                            <div className="flex flex-wrap gap-2">
                              {problem.tags?.map((t, i) => (
                                <span key={i} className="px-2.5 py-1 rounded-md text-xs border border-zinc-700 text-zinc-400">{t}</span>
                              ))}
                            </div>
                          )}
                          {section === 'Companies' && (
                            <div className="flex flex-wrap gap-2">
                              {problem.companies?.map((c, i) => (
                                <span key={i} className="px-2.5 py-1 rounded-md text-xs bg-violet-500/10 text-violet-300 border border-violet-500/20">{c}</span>
                              ))}
                            </div>
                          )}
                          {section === 'Hint' && (
                            <p className="text-sm text-zinc-400">{problem.hint}</p>
                          )}
                        </div>
                      </details>
                    ))}
                  </div>
                )}

                {activeLeftTab === 'editorial' && (
                  <div>
                    <h2 className="text-lg font-semibold mb-4 text-zinc-100">Editorial</h2>
                    <Editorial secureUrl={problem.secureUrl} thumbnailUrl={problem.thumbnailUrl} duration={problem.duration} />
                  </div>
                )}

                {activeLeftTab === 'solutions' && (
                  <div>
                    <h2 className="text-lg font-semibold mb-4 text-zinc-100">Solutions</h2>
                    <div className="space-y-4">
                      {problem.referenceSolution?.map((solution, index) => (
                        <div key={index} className="rounded-xl border border-zinc-800 overflow-hidden">
                          <div className="bg-zinc-900/70 px-4 py-2 border-b border-zinc-800">
                            <h3 className="font-medium text-sm text-zinc-200">{problem?.title} — {solution?.language}</h3>
                          </div>
                          <pre className="bg-zinc-950 p-4 text-sm overflow-x-auto text-zinc-300">
                            <code>{solution?.completeCode}</code>
                          </pre>
                        </div>
                      )) || <p className="text-zinc-500 text-sm">Solutions will be available after you solve the problem.</p>}
                    </div>
                  </div>
                )}

                {activeLeftTab === 'submissions' && (
                  <div>
                    <h2 className="text-lg font-semibold mb-4 text-zinc-100">My Submissions</h2>
                    <SubmissionHistory problemId={problemId} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Divider */}
        <div
          onMouseDown={handleDividerMouseDown}
          className="w-1.5 shrink-0 cursor-col-resize bg-zinc-800 hover:bg-violet-600/60 active:bg-violet-600 transition-colors relative group flex items-center justify-center"
        >
          <GripVertical size={12} className="text-zinc-600 group-hover:text-violet-200 absolute" />
        </div>

        {/* Right Panel */}
        <div className="flex flex-col min-w-0 overflow-hidden flex-1">
          <div className="flex bg-zinc-900/40 border-b border-zinc-800 px-2 shrink-0">
            {RIGHT_TABS.map(tab => (
              <TabButton
                key={tab.id}
                tab={tab}
                active={activeRightTab === tab.id}
                onClick={() => setActiveRightTab(tab.id)}
              />
            ))}
          </div>

          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {activeRightTab === 'code' && (
              <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <div className="flex items-center gap-1 p-2 border-b border-zinc-800 shrink-0">
                  {LANGS.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors
                        ${selectedLanguage === lang
                          ? 'bg-violet-600 text-white'
                          : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'}`}
                    >
                      {lang === 'cpp' ? 'C++' : lang === 'javascript' ? 'JavaScript' : 'Java'}
                    </button>
                  ))}
                </div>

                <div className="flex-1 min-w-0 min-h-0">
                  <Editor
                    height="100%"
                    language={getLanguageForMonaco(selectedLanguage)}
                    value={code}
                    onChange={handleEditorChange}
                    onMount={handleEditorDidMount}
                    theme="vs-dark"
                    options={{
                      fontSize: 14,
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 2,
                      insertSpaces: true,
                      wordWrap: 'on',
                      lineNumbers: 'on',
                      glyphMargin: false,
                      folding: true,
                      lineDecorationsWidth: 10,
                      lineNumbersMinChars: 3,
                      renderLineHighlight: 'line',
                      selectOnLineNumbers: true,
                      roundedSelection: false,
                      readOnly: false,
                      cursorStyle: 'line',
                      mouseWheelZoom: true,
                    }}
                  />
                </div>

                <div className="p-3 border-t border-zinc-800 flex justify-between items-center shrink-0">
                  <button
                    className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1.5"
                    onClick={() => setActiveRightTab('testcase')}
                  >
                    <TerminalSquare size={14} /> Console
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={handleRun}
                      disabled={loading}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
                        bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 disabled:opacity-50 transition-colors"
                    >
                      <Play size={14} /> Run
                    </button>
                    <button
                      onClick={handleSubmitCode}
                      disabled={loading}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
                        bg-violet-600 hover:bg-violet-500 text-white disabled:opacity-50 transition-colors"
                    >
                      <Send size={14} /> Submit
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeRightTab === 'testcase' && (
              <div className="flex-1 p-4 overflow-y-auto">
                <h3 className="font-semibold mb-4 text-zinc-100 text-sm">Test Results</h3>
                {runResult ? (
                  <div className={`rounded-xl border p-4 ${runResult.success ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-rose-500/30 bg-rose-500/5'}`}>
                    {runResult.success ? (
                      <div>
                        <h4 className="font-semibold flex items-center gap-2 text-emerald-400">
                          <CheckCircle2 size={16} /> All test cases passed
                        </h4>
                        <p className="text-xs mt-2 text-zinc-400">Runtime: {runResult.runtime} sec</p>
                        <p className="text-xs text-zinc-400">Memory: {runResult.memory} KB</p>
                        <div className="mt-4 space-y-2">
                          {runResult.testCases.map((tc, i) => (
                            <div key={i} className="bg-zinc-900/60 border border-zinc-800 p-3 rounded-lg text-xs font-mono">
                              <div><span className="text-zinc-500">Input:</span> {tc.stdin}</div>
                              <div><span className="text-zinc-500">Expected:</span> {tc.expected_output}</div>
                              <div><span className="text-zinc-500">Output:</span> {tc.stdout}</div>
                              <div className="text-emerald-400 mt-1">✓ Passed</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-semibold flex items-center gap-2 text-rose-400">
                          <XCircle size={16} /> Error
                        </h4>
                        <div className="mt-4 space-y-2">
                          {runResult.testCases.map((tc, i) => (
                            <div key={i} className="bg-zinc-900/60 border border-zinc-800 p-3 rounded-lg text-xs font-mono">
                              <div><span className="text-zinc-500">Input:</span> {tc.stdin}</div>
                              <div><span className="text-zinc-500">Expected:</span> {tc.expected_output}</div>
                              <div><span className="text-zinc-500">Output:</span> {tc.stdout}</div>
                              <div className={tc.status_id == 3 ? 'text-emerald-400 mt-1' : 'text-rose-400 mt-1'}>
                                {tc.status_id == 3 ? '✓ Passed' : '✗ Failed'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-zinc-500 text-sm">Click "Run" to test your code with the example test cases.</div>
                )}
              </div>
            )}

            {activeRightTab === 'result' && (
              <div className="flex-1 p-4 overflow-y-auto">
                <h3 className="font-semibold mb-4 text-zinc-100 text-sm">Submission Result</h3>
                {submitResult ? (
                  <div className={`rounded-xl border p-4 ${submitResult.accepted ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-rose-500/30 bg-rose-500/5'}`}>
                    {submitResult.accepted ? (
                      <div>
                        <h4 className="font-semibold flex items-center gap-2 text-emerald-400 text-base">
                          <CheckCircle2 size={18} /> Accepted
                        </h4>
                        <div className="mt-3 space-y-1 text-sm text-zinc-400">
                          <p>Test Cases Passed: {submitResult.passedTestCases}/{submitResult.totalTestCases}</p>
                          <p>Runtime: {submitResult.runtime} sec</p>
                          <p>Memory: {submitResult.memory} KB</p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-semibold flex items-center gap-2 text-rose-400 text-base">
                          <XCircle size={18} /> {submitResult.error}
                        </h4>
                        <div className="mt-3 text-sm text-zinc-400">
                          <p>Test Cases Passed: {submitResult.passedTestCases}/{submitResult.totalTestCases}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-zinc-500 text-sm">Click "Submit" to submit your solution for evaluation.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- 6: AI drawer ---------------- */}
      {aiOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setAiOpen(false)}
          />
          <div className="relative w-full max-w-md h-full bg-zinc-950 border-l border-zinc-800 flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 shrink-0">
              <div className="flex items-center gap-2 text-zinc-100 font-semibold text-sm">
                <Sparkles size={16} className="text-violet-400" /> Ask AI
              </div>
              <button
                onClick={() => setAiOpen(false)}
                className="text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <ChatAi problem={problem}></ChatAi>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemPage;