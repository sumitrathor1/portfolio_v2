import React, { useState, useEffect, useRef } from 'react';
import { personalInfo } from '../../data/personalInfo';
import { projectsData } from '../../data/projects';
import { skillsData } from '../../data/skills';
import { experienceData } from '../../data/experience';
import { educationData } from '../../data/education';
import { achievementsData } from '../../data/achievements';
import { trackResumeDownload } from '../../utils/analytics';

export default function DeveloperTerminal({ isOpen, onClose, onToggle }) {
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: `Sumit Rathor Developer Terminal [Version 2.4.0]\nType 'help' to view available commands or click quick suggestions below.\n`
    }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [inputVal, setInputVal] = useState('');
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll on new output
  useEffect(() => {
    if (isOpen) {
      terminalBodyRef.current?.scrollTo({
        top: terminalBodyRef.current.scrollHeight,
        behavior: 'smooth'
      });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [history, isOpen]);

  // Global keyboard shortcut to toggle terminal (Ctrl + ~ or backtick when not in inputs)
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if ((e.ctrlKey && e.key === '`') || (e.ctrlKey && e.key === '~')) {
        e.preventDefault();
        onToggle();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [isOpen, onClose, onToggle]);

  const executeCommand = (cmdText) => {
    const rawCmd = cmdText.trim();
    if (!rawCmd) return;

    // Add to command history
    setCommandHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const tokens = rawCmd.split(' ');
    const cmd = tokens[0].toLowerCase();
    const args = tokens.slice(1).join(' ').trim();

    const newEntries = [{ type: 'command', text: rawCmd }];

    switch (cmd) {
      case 'help':
        newEntries.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:
  help              Show this help menu
  about             Summary of background & career status
  skills            List verified technical competencies
  projects          List all featured projects and slugs
  project <slug>    Deep dive into a project architecture (e.g. 'project rakshak-ai')
  experience        DRDO internship & career timeline
  education         Degrees, institutions, and scores
  achievements      Verified NPTEL, hackathons & LOR honors
  resume            Download Sumit's verified resume PDF
  contact           Direct email & social profiles
  whoami            Print current visitor identity
  matrix            Toggle retro green digital rain mode
  clear             Clear terminal screen buffer
  exit              Close the command terminal`
        });
        break;

      case 'about':
        newEntries.push({
          type: 'output',
          text: `DEVELOPER SUMMARY:
  Name:        ${personalInfo.name}
  Role:        ${personalInfo.role}
  Standing:    B.Tech Computer Science & Design @ MITS Gwalior (CGPA 8.09)
  Status:      ${personalInfo.status}
  Location:    ${personalInfo.location}
  Response:    ${personalInfo.responseTime} (${personalInfo.workPreference})
  Lead:        ${personalInfo.lead}`
        });
        break;

      case 'skills': {
        let skillsList = 'VERIFIED TECHNICAL COMPETENCIES:\n';
        Object.entries(skillsData).forEach(([grp, list]) => {
          const names = list.map((i) => i.name).join(', ');
          skillsList += `  • ${grp.padEnd(25)}: ${names}\n`;
        });
        newEntries.push({ type: 'output', text: skillsList });
        break;
      }

      case 'projects': {
        let projList = 'FEATURED ENGINEERING PROJECTS:\n';
        projectsData.forEach((p, idx) => {
          projList += `  [${idx + 1}] ${p.slug.padEnd(26)} | ${p.title} (${p.stack.slice(0, 3).join(', ')})\n`;
        });
        projList += `\nType 'project <slug>' (e.g. 'project rakshak-ai') to inspect full architecture.`;
        newEntries.push({ type: 'output', text: projList });
        break;
      }

      case 'project': {
        if (!args) {
          newEntries.push({
            type: 'error',
            text: `Error: Please specify a project slug. Example: 'project rakshak-ai' or 'project mandola'`
          });
          break;
        }

        const match = projectsData.find(
          (p) =>
            p.slug.toLowerCase() === args.toLowerCase() ||
            p.title.toLowerCase().includes(args.toLowerCase())
        );

        if (match) {
          newEntries.push({
            type: 'output',
            text: `PROJECT: ${match.title}
  Subtitle:     ${match.subtitle || 'N/A'}
  Date:         ${match.date || 'N/A'}
  Stack:        ${match.stack.join(', ')}
  Problem:      ${match.problem || match.description}
  Architecture: ${match.architecture || 'Detailed in case study page.'}
  Features:     ${(match.features || []).map((f) => '\n    • ' + f).join('')}
  Live Demo:    ${match.live || 'Internal/Offline build'}
  GitHub:       ${match.github || 'Classified/Private repository'}`
          });
        } else {
          newEntries.push({
            type: 'error',
            text: `Project '${args}' not found. Type 'projects' to list all valid slugs.`
          });
        }
        break;
      }

      case 'experience': {
        let expText = 'WORK & INTERNSHIP TIMELINE:\n';
        experienceData.forEach((e) => {
          expText += `  • ${e.period.padEnd(22)} | ${e.role} @ ${e.company} (${e.work_mode})\n`;
          (e.bullets || []).forEach((b) => {
            expText += `      - ${b}\n`;
          });
        });
        newEntries.push({ type: 'output', text: expText });
        break;
      }

      case 'education': {
        let eduText = 'ACADEMIC CREDENTIALS:\n';
        educationData.forEach((ed) => {
          eduText += `  • ${ed.timeline.padEnd(14)} | ${ed.program} (${ed.score})\n`;
          eduText += `    Institution:   ${ed.institution}\n`;
        });
        newEntries.push({ type: 'output', text: eduText });
        break;
      }

      case 'achievements': {
        let achText = 'HONORS & VERIFIED CERTIFICATIONS:\n';
        achievementsData.forEach((a) => {
          achText += `  🏆 ${a.title} (${a.date || 'Verified'})\n`;
          achText += `     ${a.organization} — ${a.description}\n`;
        });
        newEntries.push({ type: 'output', text: achText });
        break;
      }

      case 'resume':
        trackResumeDownload();
        window.open(personalInfo.resumePath, '_blank');
        newEntries.push({
          type: 'output',
          text: `[SUCCESS] Opened verified resume PDF in browser: ${personalInfo.resumePath}`
        });
        break;

      case 'contact':
        newEntries.push({
          type: 'output',
          text: `CONTACT INFORMATION:
  Email:    ${personalInfo.email}
  LinkedIn: https://www.linkedin.com/in/sumitrathor/
  GitHub:   https://github.com/sumitrathor1
  Location: ${personalInfo.location}`
        });
        break;

      case 'whoami':
        newEntries.push({
          type: 'output',
          text: `guest@sumitrathor-portfolio [role: visitor / technical recruiter]\nPermissions: read-only access granted to verified engineering artifacts.`
        });
        break;

      case 'matrix':
        setIsMatrixActive((prev) => !prev);
        newEntries.push({
          type: 'output',
          text: `Matrix digital mode: ${!isMatrixActive ? 'ENABLED' : 'DISABLED'}. Enjoy the digital aesthetic!`
        });
        break;

      case 'sudo':
        newEntries.push({
          type: 'error',
          text: `Permission denied: User 'guest' is not in sudoers file. This incident will be reported to Santa 🎅`
        });
        break;

      case 'date':
        newEntries.push({
          type: 'output',
          text: new Date().toString()
        });
        break;

      case 'echo':
        newEntries.push({
          type: 'output',
          text: args || ''
        });
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        newEntries.push({
          type: 'error',
          text: `Command not recognized: '${cmd}'. Type 'help' to view available commands.`
        });
    }

    setHistory((prev) => [...prev, ...newEntries]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(commandHistory[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx] || '');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple autocomplete
      const available = ['help', 'about', 'skills', 'projects', 'experience', 'education', 'achievements', 'resume', 'contact', 'matrix', 'clear'];
      const match = available.find((c) => c.startsWith(inputVal.trim().toLowerCase()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="terminal-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Developer Command Terminal"
    >
      <div
        className={`terminal-modal-window ${isMatrixActive ? 'matrix-mode' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* TERMINAL TITLEBAR */}
        <div className="terminal-titlebar">
          <div className="terminal-window-buttons">
            <span className="term-btn term-close" onClick={onClose} title="Close" />
            <span className="term-btn term-minimize" onClick={onClose} title="Minimize" />
            <span className="term-btn term-maximize" title="Maximize" />
          </div>
          <div className="terminal-title">
            <i className="fa-solid fa-terminal me-1.5" /> guest@sumitrathor:~ (zsh)
          </div>
          <div className="terminal-hint text-muted">ESC to exit</div>
        </div>

        {/* TERMINAL BODY */}
        <div className="terminal-body" ref={terminalBodyRef} onClick={() => inputRef.current?.focus()}>
          {history.map((item, idx) => (
            <div key={idx} className={`term-line term-${item.type}`}>
              {item.type === 'command' && (
                <span className="term-prompt">guest@sumitrathor:~$ </span>
              )}
              <span className="term-text">{item.text}</span>
            </div>
          ))}

          {/* ACTIVE INPUT LINE */}
          <div className="term-input-line">
            <span className="term-prompt">guest@sumitrathor:~$ </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="term-input"
              spellCheck="false"
              autoComplete="off"
              autoCapitalize="off"
              aria-label="Terminal command prompt"
            />
          </div>
        </div>

        {/* QUICK COMMAND SHORTCUT BAR */}
        <div className="terminal-quick-bar">
          <span className="quick-bar-label text-muted">Suggestions:</span>
          {['help', 'about', 'skills', 'projects', 'rakshak-ai', 'resume', 'contact'].map((s) => (
            <button
              key={s}
              type="button"
              className="term-quick-chip"
              onClick={() => executeCommand(s === 'rakshak-ai' ? 'project rakshak-ai' : s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
