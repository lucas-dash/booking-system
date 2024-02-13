import DynamicNavbar from './components/features/dynamic-navbar';
import Home from './components/home';
import Logo from './components/logo';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <div className="bg-primary">
      <Logo />
      <DynamicNavbar />
      <Home />
      <Toaster />
    </div>
  );
}

export default App;
