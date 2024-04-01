import getAllPrograms from '@/app/actions/getPrograms';
import ProgramListPage from './ProgramListPage';

const ProgramsPage = async () => {
  try{
    const programsData = await getAllPrograms();
    return (
      <div id="programsPage" className='w-full flex flex-col items-center justify-center '>
        <ProgramListPage programs={programsData}></ProgramListPage>
      </div>
    );
  }catch (error: any) {
    throw new Error(error);
  }

  
};

export default ProgramsPage;