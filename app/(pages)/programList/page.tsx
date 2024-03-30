import { fetchPrograms } from '@/app/api/program/fetchProgram/route';
import ProgramListPage from './ProgramListPage';

const ProgramsPage = async () => {
const programsData = await fetchPrograms();
  return (
    <div id="programsPage">
      <ProgramListPage programs={programsData}></ProgramListPage>
    </div>
  );
};

export default ProgramsPage;
