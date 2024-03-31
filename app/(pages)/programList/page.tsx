import { fetchPrograms } from '@/app/actions/getPrograms';
import ProgramListPage from './ProgramListPage';

const ProgramsPage = async () => {
const programsData = await fetchPrograms();
  return (
    <div id="programsPage" className='w-full flex flex-col items-center justify-center '>
      <ProgramListPage programs={programsData}></ProgramListPage>
    </div>
  );
};

export default ProgramsPage;
