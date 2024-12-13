import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Fetch saved candidates from localStorage on component mount
  useEffect(() => {
    const storedCandidates = localStorage.getItem('savedCandidates');
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []); // Runs only once on mount

  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.length > 0 ? (
        <ul>
          {savedCandidates.map((candidate) => (
            <li key={candidate.login}>
              <div>
                <img
                  src={candidate.avatar_url}
                  alt={`${candidate.login}'s avatar`}
                  style={{ width: '100px', borderRadius: '50%' }}
                />
                <h2>{candidate.name || candidate.login}</h2>
                <p>Username: {candidate.login}</p>
                <p>Location: {candidate.location || 'Not provided'}</p>
                <p>Email: {candidate.email || 'Not provided'}</p>
                <p>Company: {candidate.company || 'Not provided'}</p>
                <a href={candidate.html_url} target="_blank" rel="noreferrer">
                  GitHub Profile
                </a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No candidates have been saved yet.</p>
      )}
    </div>
  );
};

export default SavedCandidates;
