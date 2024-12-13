import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setIsLoading(true);

        // Fetch a list of GitHub users
        const users = await searchGithub();

        // Fetch detailed information for all users
        const detailedCandidates = await Promise.all(
          users.map((user: { login: string }) => searchGithubUser(user.login))
        );

        setCandidates(detailedCandidates);
      } catch (err) {
        setError('Failed to fetch candidates.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleAccept = () => {
    if (candidates[currentIndex]) {
      // Save current candidate to the saved list
      const candidateToSave = candidates[currentIndex];
      const updatedSavedCandidates = [...savedCandidates, candidateToSave];
      setSavedCandidates(updatedSavedCandidates);

      // Persist to local storage
      localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));

      // Move to the next candidate
      handleNextCandidate();
    }
  };

  const handleNextCandidate = () => {
    // Check if there are more candidates
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // If no more candidates, clear the current candidate
      setCandidates([]);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const currentCandidate = candidates[currentIndex];

  return (
    <div>
      {currentCandidate ? (
        <div>
          <h1>{currentCandidate.name || 'No Name Available'}</h1>
          <p>Username: {currentCandidate.login}</p>
          <p>Location: {currentCandidate.location || 'Not provided'}</p>
          <img
            src={currentCandidate.avatar_url}
            alt={`${currentCandidate.name || currentCandidate.login}'s avatar`}
            style={{ width: '150px', borderRadius: '50%' }}
          />
          <p>Email: {currentCandidate.email || 'Not provided'}</p>
          <p>Company: {currentCandidate.company || 'Not provided'}</p>
          <a href={currentCandidate.html_url} target="_blank" rel="noreferrer">
            GitHub Profile
          </a>

          {/* Accept and Next Buttons */}
          <button onClick={handleAccept}>+</button>
          <button onClick={handleNextCandidate}>-</button>
        </div>
      ) : (
        <div>No more candidates available.</div>
      )}
    </div>
  );
};

export default CandidateSearch;
