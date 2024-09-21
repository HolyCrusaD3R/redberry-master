import Header from "../components/Header";
import Listing from "../components/Listing";
import Content from "../components/listing/Content";
import { FillterProvider } from "../contexts/FilterContext";

function HomePage() {
  return (
    <>
      <Header />
      <FillterProvider>
        <Listing />
        <Content />
      </FillterProvider>
    </>
  );
}

export default HomePage;
