import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import ListingPage from "./pages/ListingPage";
import AddListing from "./pages/AddListing";
// import AboutPage from './pages/About';

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/listing/:id", element: <ListingPage /> },
  { path: "/addlisting", element: <AddListing /> },
  // { path: '/about', element: <AboutPage/> }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
