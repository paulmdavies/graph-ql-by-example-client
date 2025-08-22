import JobList from '../components/JobList';
import {useJobs} from "../lib/graphql/hooks.js";
import {useState} from "react";
import PaginationBar from "../components/PaginationBar.jsx";

const JOBS_PER_PAGE = 20;

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { jobs, totalCount, loading, error } = useJobs(JOBS_PER_PAGE, (currentPage - 1) * JOBS_PER_PAGE);

  console.log('[CompanyPage]: ', { jobs, totalCount, loading, error })
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div className="has-text-danger">Not found</div>
  }

  const totalPages = Math.ceil(totalCount / JOBS_PER_PAGE);

  console.log('[HomePage] jobs: ', jobs)
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <PaginationBar currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
