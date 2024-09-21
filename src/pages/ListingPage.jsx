import Header from "../components/Header";
import { useParams } from "react-router-dom";
import ListingDetails from "../components/listing/ListingDetails";
import BackButton from "../components/listing/BackButton";

export default function ListingPage() {
  const { id } = useParams();
  return (
    <>
      <Header />
      <div className="w-[1600px] mx-auto">
        <BackButton />
      </div>
      <ListingDetails id={id} />
    </>
  );
}
