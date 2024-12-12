import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setIsLoading(true);
        const data = await searchGithub();
        setCandidates(data);
      } catch (err) {
        setError('Failed to fetch candidates.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, []); // Empty dependency array to run once on component mount.

  const handleAccept = () => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    saved.push(candidates[currentIndex]);
    localStorage.setItem('savedCandidates', JSON.stringify(saved));
    handleNext();
  };

  const handleReject = () => {
    handleNext();
  };

  const handleNext = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCandidates([]);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const candidate = candidates[currentIndex];

  return (
    <div>
      {candidate ? (
        <div>
          <h1>{candidate.name || 'No Name Available'}</h1>
          <p>Username: {candidate.login}</p>
          <p>Location: {candidate.location || 'Not provided'}</p>
          <img src={candidate.avatar_url} alt={`${candidate.login}'s avatar`} />
          <button onClick={handleAccept}>+</button>
          <button onClick={handleReject}>-</button>
        </div>
      ) : (
        <div>No more candidates available.</div>
      )}
    </div>
  );
};

export default CandidateSearch;
