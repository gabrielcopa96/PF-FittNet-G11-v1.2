import { useEffect, useState } from "react";
import style from "./styles/GymCards.module.css";
import { useDispatch, useSelector } from "react-redux";
import { CardShop } from "../../helpers/Cards/Cards";
import { sortByDistance } from "../../redux/actions";

export default function GymsCards(): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sortByDistance("menor")); // eslint-disable-next-line
  }, []);

  const gyms = useSelector((state: any) => state.pageToShow);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  let pages = [];

  for (let i = 1; i < Math.ceil(gyms.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexItem = currentPage * itemsPerPage;
  const indexFirstItem = indexItem - itemsPerPage;

  const currentGyms = gyms.slice(indexFirstItem, indexItem);

  const handleNext = (e: any) => {
    e.preventDefault();
    if (currentPage <= pages.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = (e: any) => {
    e.preventDefault();
    if (currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };


  const handleClickPage = (page: any) => {
    setCurrentPage(page)
  }


  return (
    <div className={style.mainBoxCards}>
      <div className={style.boxCards}>
        {gyms.length
          ? currentGyms.map((x: any, y: any) => (
              <CardShop
                key={y}
                id={x._id}
                title={x.name}
                services={x.services}
                price={x.price}
                imagen={x.image}
                favourite={x.favourite}
                logo={x.logo}
              />
            ))
          : gyms.length === 0 && (
              <img
                id="loading"
                src="https://www.sanfranciscohm.com/static/img/loading.gif"
                alt="loading..."
              />
            )}
      </div>
      <div className={style.containerPagination}>
        <ul className={style.paginationPrueba}>
          <li onClick={(e) => handlePrev(e)} style={{ cursor: "pointer" }}>
            <span>Prev</span>
          </li>
          {pages ? (
            pages.map((page, num) => (
              <li key={num}>
                <span
                  onClick={() => handleClickPage(page)}
                  style={{ cursor: "pointer" }}
                  className={(currentPage === page) ? style.itemActive : ""}
                >
                  {page}
                </span>
              </li>
            ))
          ) : (
            <li style={{ cursor: "pointer" }}></li>
          )}
          <li onClick={(e) => handleNext(e)} style={{ cursor: "pointer" }}>
            <span>Next</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
