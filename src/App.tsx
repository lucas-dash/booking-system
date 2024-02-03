import DynamicNavbar from './components/features/dynamic-navbar';
import Home from './components/home';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="bg-primary">
      <Navbar />
      <DynamicNavbar />
      <Home />
    </div>
  );
}

export default App;
