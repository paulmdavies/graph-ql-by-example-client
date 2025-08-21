import JobList from '../components/JobList';
import {useCompany, useJobs} from "../lib/graphql/hooks.js";


function HomePage() {
  const { jobs, loading, error } = useJobs();

  console.log('[CompanyPage]: ', { jobs, loading, error })
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div className="has-text-danger">Not found</div>
  }

  console.log('[HomePage] jobs: ', jobs)
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
