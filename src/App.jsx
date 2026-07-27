import { Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./component/Layout";
import NotFound from "./pages/NotFound";
import { routs } from "./routes";
import "./i18n";

import {
  getFilmsTC,
  getProgramsTC,
  getShowsTC,
} from "./redux/reducers/ProgramsAndShows";
import { connect } from "react-redux";

import EachProgram from "./pages/EachProgram";
import HeaderContainer from "./component/Header/HeaderContainer";
import FooterContainer from "./component/Footer/FooterContainer";
import {
  getContentStateTC,
  getEachfacesStateTC,
} from "./redux/reducers/FacesReducer";
import {
  getContactUsTC,
  getLiveLinkTC,
  setLoaderAC,
} from "./redux/reducers/MainReducer";
import Loader from "./pages/Loader";
import Results from "./pages/Results";
function App({
  getPrograms,
  getFaces,
  getLiveLink,
  getFilms,
  getContactUs,
  main,
  setLoader,
  search,
}) {
  useEffect(() => {
    getPrograms();
    getFaces();
    getLiveLink();
    getFilms();
    getContactUs();
    setLoader(true);
  }, []);

  return (
    <div className="App transit dark:bg-darkBG">
      {main.loader && <Loader />}
      <Suspense fallback={<Loader />}>
        <div className="sticky w-full top-0 z-20">
          <HeaderContainer />
        </div>{" "}
        <Routes>
          {routs.map((rout) => (
            <Route
              path={rout.path}
              element={<Layout>{rout.component}</Layout>}
              key={rout.path}
            />
          ))}
          <Route
            path="/tab_:id"
            element={
              <>
                <EachProgram />
                <FooterContainer />
              </>
            }
          />
          {search.searchItem && (
            <Route
              path="/results"
              element={
                <Layout>
                  <Results />
                </Layout>
              }
            />
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

const mapState = (state) => {
  return { main: state.main, search: state.search };
};
const mapDispatch = (dispatch) => {
  return {
    getPrograms() {
      dispatch(getProgramsTC());
      dispatch(getShowsTC());
    },
    getFaces() {
      dispatch(getContentStateTC());
      dispatch(getEachfacesStateTC());
    },
    getLiveLink() {
      dispatch(getLiveLinkTC());
    },
    getFilms() {
      dispatch(getFilmsTC());
    },
    getContactUs() {
      dispatch(getContactUsTC());
    },
    setLoader(data) {
      dispatch(setLoaderAC(data));
    },
  };
};

export default connect(mapState, mapDispatch)(App);
