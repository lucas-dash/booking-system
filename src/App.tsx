import DynamicNavbar from './components/features/dynamic-navbar';
import Home from './components/home';
import Navbar from './components/navbar';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <div className="bg-primary">
      <Navbar />
      <DynamicNavbar />
      <Home />
      <Toaster />
    </div>
  );
}

export default App;
