import ProgramsPage from "./(pages)/programList/page";
import Navbar from "./components/navbar/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center" id="root">
      <Navbar></Navbar>
      <div className="container h-24"></div>
      <ProgramsPage></ProgramsPage>
    </main>
  );
}
