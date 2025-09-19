import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage, { blogLoader } from "./components/HomePage";
import PortfolioPage from "./components/PortfolioPage";
import "./App.css";
import RootLayout from "./pages/RootLayout";
import Error from "./components/Error";
import About, { aboutLoader } from "./components/About";

function App() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} loader={blogLoader}></Route>
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="about" element={<About />} loader={aboutLoader} />
        <Route path="*" element={<Error />}></Route>
      </Route>
    )
  );
  return <RouterProvider router={route} />;
}

export default App;
