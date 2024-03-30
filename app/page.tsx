import ProgramsPage from "./(pages)/programList/page";
import Navbar from "./components/navbar/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navbar></Navbar>
      <div className="container mt-24"></div>
      <ProgramsPage></ProgramsPage>
    </main>
  );
}
