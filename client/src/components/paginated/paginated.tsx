import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setPageNumber,
  setCurrentLimit,
} from "../../redux/actions/index";
// @ts-expect-error TS(2307): Cannot find module './styles/paginated.module.css'... Remove this comment to see the full error message
import style from "./styles/paginated.module.css";

export default function Paginated() {

  const dispatch = useDispatch();

  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const defaultRecipesXPage = useSelector((state) => state.currentLimit);

  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const gymsToShow = useSelector((state) => state.gymsToShow);
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const currentPage = useSelector((state) => state.currentPage);

  const [recipesXPage, setRecipesXPage] = useState(defaultRecipesXPage);

  const totalPages = Math.ceil(gymsToShow.length / recipesXPage);

  const limit = currentPage * recipesXPage;
  const offset = limit - recipesXPage;

  useEffect(() => {
    const payload = {
      currentPage: currentPage,
      offset: offset,
      limit: limit,
    };
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => void' is not ... Remove this comment to see the full error message
    dispatch(setCurrentPage(payload));
  }, [dispatch, offset, limit, currentPage]);

  const defaultButtonsPerPage = 6;
  const halfPages = Math.ceil(defaultButtonsPerPage / 2);
  const maxButtons = (() => {
    if (totalPages <= defaultButtonsPerPage) {
      return totalPages;
    } else if (
      currentPage + halfPages <= totalPages &&
      currentPage >= halfPages
    ) {
      return currentPage + halfPages;
    } else if (currentPage < halfPages) {
      return defaultButtonsPerPage;
    } else {
      return totalPages;
    }
  })();

  const initButton = (() => {
    if (totalPages <= defaultButtonsPerPage) {
      return 1;
    } else if (
      currentPage + halfPages <= totalPages &&
      currentPage >= halfPages
    ) {
      return currentPage - halfPages + 1;
    } else if (currentPage < halfPages) {
      return 1;
    } else {
      return totalPages - defaultButtonsPerPage + 1;
    }
  })();

  const pages = [];
  for (let i = initButton; i <= maxButtons; i++) {
    pages.push(i);
  }

  const pagination = (pageNumber: any) => {
    const payload = {
      currentPage: pageNumber,
      offset: 0,
      limit: recipesXPage,
    };
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => void' is not ... Remove this comment to see the full error message
    dispatch(setCurrentPage(payload));
  };

  const nextPage = () => {
    if (currentPage === totalPages) return;
    if (currentPage < gymsToShow.length) {
      // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => void' is not ... Remove this comment to see the full error message
      dispatch(setPageNumber(currentPage + 1));
    }
  };
  const prevPage = () => {
    if (currentPage === 1) return;
    if (currentPage !== 1) {
      // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => void' is not ... Remove this comment to see the full error message
      dispatch(setPageNumber(currentPage - 1));
    }
  };

  function handlePageSelect(e: any) {
    e.preventDefault();
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => void' is not ... Remove this comment to see the full error message
    dispatch(setPageNumber(1));
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => void' is not ... Remove this comment to see the full error message
    dispatch(setCurrentLimit(e.target.value));
    setRecipesXPage(e.target.value);
  }

  return (
    <div className={style.cont}>
      {/* Bloque de seleccion de pagina */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
        <section className={style.toShowSelector}>
          <label className={style.selectLageLabel}>Pages to show:</label>
          <select
            className={style.selectPage}
            value={recipesXPage}
            onChange={(e) => handlePageSelect(e)}
          >
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </section>
        <div className={style.containerPagination}>
          <ul className={style.paginationPrueba}>
            <li onClick={() => prevPage()} style={{ cursor: "pointer" }}>
              <span>Prev</span>
            </li>
            {pages ? (
              pages.map((page, num) => (
                <li key={num}>
                  <span
                    onClick={() => pagination(page)}
                    style={{ cursor: "pointer" }}
                    // @ts-expect-error TS(2322): Type '{ children: number; onClick: () => void; sty... Remove this comment to see the full error message
                    value={currentPage}
                  >
                    {page}
                  </span>
                </li>
              ))
            ) : (
              <li style={{ cursor: "pointer" }}></li>
            )}
            <li onClick={() => nextPage()} style={{ cursor: "pointer" }}>
              <span>Next</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
