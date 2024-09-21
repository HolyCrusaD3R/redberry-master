import useRealEstate from "./hooks/useRealEstate";
import notFound from "../../assets/not-found.webp";
import { formatPrice } from "./util/formatPrice";

import Location from "./svg/Location";
import Bedroom from "./svg/Bedroom";
import Area from "./svg/Area";
import Zipcode from "./svg/Zipcode";
import Mail from "./svg/Mail";
import Phone from "./svg/Phone";

import formatDate from "./util/formatDate";
import DetailsSkeleton from "./DetailsSkeleton";
import formatPhoneNumber from "./util/formatPhoneNumber";
import useDelete from "./hooks/useDelete";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import Carousel from "./Carousel";

import Spinner from "./loading/Spinner";
import { useNavigate } from "react-router-dom";
import Skeleton from "./Skeleton";

export default function ListingDetails({ id }) {
  const { data, loading, error } = useRealEstate(id);
  const {
    data: allData,
    error: nearestError,
    loading: nearestLoading,
  } = useRealEstate();

  const {
    deleteRealEstate,
    error: deleteErrorMessage,
    loading: deleteLoading,
  } = useDelete();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  if (isModalOpen || deleteLoading) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  useEffect(() => {
    function closeModal(e) {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    }

    const esqClose = window.addEventListener("keydown", closeModal);

    return () => {
      window.removeEventListener("keydown", closeModal);
    };
  }, []);

  if (loading) {
    return <DetailsSkeleton />;
  }

  if (error) {
    return (
      <section className="w-[1600px] mx-auto flex gap-12 mt-6 mb-20">
        <p>შეცდომა: {error.message}</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="w-[1600px] mx-auto flex gap-12 mt-6 mb-20">
        <p>მონაცემები არ მოიძებნა</p>
      </section>
    );
  }

  let nearestData = [];

  if (allData) {
    nearestData = allData?.filter(
      (item) =>
        item?.city.region_id === data?.city.region_id && item?.id !== data?.id
    );
  }

  function handleClose() {
    setIsModalOpen(false);
  }

  async function handleDelete() {
    handleClose();

    const isDeleted = await deleteRealEstate(id);
    document.body.style.overflow = "auto";
    if (isDeleted) {
      navigate("/");
    } else {
      alert(`ლისტინგი ვერ წაიშალა ${deleteErrorMessage}`);
    }
  }

  const formatedPrice = formatPrice(data?.price || 0, true);
  const formatedDate = formatDate(data?.created_at);
  const formatedPhoneNumber = formatPhoneNumber(data?.agent?.phone);

  return (
    <>
      <section className="w-[1600px] mx-auto flex gap-12 mt-6 mb-20 items-center">
        <div className="relative flex-1">
          <p className="absolute px-4 py-2 text-sm font-semibold text-white top-4 left-4 bg-black/40 rounded-3xl">
            {data.is_rental === 0 ? "იყიდება" : "ქირავდება"}
          </p>
          <img
            src={data?.image || notFound}
            className="w-full h-auto rounded-t-xl"
            alt={data?.description || "სახლის სურათი"}
          />
          <p className="text-[#808A93] text-end mt-3">
            გამოქვეყნების თარიღი {formatedDate}
          </p>
        </div>
        <div className="flex-1 text-[#021526]">
          <h1 className="text-5xl font-bold">{formatedPrice} ₾</h1>
          <ul className="mt-8 space-y-4">
            <li className="text-[#021526B2] flex gap-2 items-center -translate-x-1">
              <Location />
              <span className="text-2xl">
                {data?.city?.name || "უცნობი"}, {data?.address || ""}
              </span>
            </li>
            <li className="text-[#021526B2] flex gap-2 items-center">
              <Area />
              <span className="text-2xl">
                ფართი {data?.area || 0} მ<sup>2</sup>
              </span>
            </li>
            <li className="text-[#021526B2] flex gap-2 items-center -translate-x-1">
              <Bedroom />
              <span className="text-2xl">საძინებელი {data?.bedrooms || 0}</span>
            </li>
            <li className="text-[#021526B2] flex gap-2 items-center">
              <Zipcode />
              <span className="text-2xl">
                საფოსტო ინდექსი {data?.zip_code || 0}
              </span>
            </li>
          </ul>
          <p className="text-[#021526B2] mt-16 max-w-[500px]">
            {data?.description || 0}
          </p>
          <div className="p-4 mt-12 border rounded-lg border-black/20">
            <div className="flex items-center gap-4">
              <img
                className="size-[72px] rounded-full"
                src={data?.agent?.avatar}
                alt={data?.agent?.name + "" + data?.agent?.surname}
              />
              <div>
                <p className="text-[#021526]">
                  {data?.agent?.name} {data?.agent?.surname}
                </p>
                <p className="text-[#676E76] text-sm">აგენტი</p>
              </div>
            </div>

            <p className="text-[#808A93] text-sm flex gap-2 items-center mt-4 mb-2">
              <Mail />
              <span>{data?.agent?.email}</span>
            </p>
            <p className="text-[#808A93] text-sm flex gap-2 items-center">
              <Phone />
              <span>{formatedPhoneNumber}</span>
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-[#808A93] p-2 border-[1px] border-[#808A93] mt-6 rounded-xl font-medium text-sm hover:bg-[#808A93] hover:text-white transition-all duration-150"
          >
            ლისტინგის წაშლა
          </button>

          {isModalOpen && (
            <Modal onClose={handleClose} onDelete={handleDelete} />
          )}
        </div>
      </section>
      <section className="mt-20 w-[1600px] mx-auto mb-20">
        <h2 className="text-3xl text-[rgb(2,21,38)] font-medium">
          {nearestData?.length === 0 || !allData
            ? "ბინები მსგავს ლოკაციაზე არ მოიძებნა"
            : "ბინები მსგავს ლოკაციაზე"}
        </h2>
        {nearestLoading ? (
          <div className="w-[1600px] mx-auto grid grid-cols-4 gap-5 mb-20 mt-12">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ) : (
          <Carousel data={nearestData} />
        )}
      </section>

      {deleteLoading && (
        <div className="fixed inset-0 bg-black/40 z-[9999]">
          <Spinner />
        </div>
      )}
    </>
  );
}
