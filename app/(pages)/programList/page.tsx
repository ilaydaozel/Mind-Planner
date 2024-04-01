import getAllPrograms from '@/app/actions/getPrograms';
import ProgramListPage from './ProgramListPage';
export const dynamic = 'force-dynamic';
import { cookies } from 'next/headers'

const ProgramsPage = async () => {
  const cookieStore = cookies()
  const theme = cookieStore.get('theme')
  console.log("theme", theme)
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