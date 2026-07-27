import { lazy } from "react";
import Programs from "src/pages/Programs";
import Shows from "src/pages/Shows";
import ContactUs from "./pages/ContactUs";
import EachProgram from "./pages/EachProgram";
import Faces from "./pages/Faces";
import Films from "./pages/Films";
import Schedule from "./pages/Schedule";

const Home = lazy(() => import("./pages/Home"));

export const routs = [
  {
    enabled: true,
    title: "home",
    path: "/",
    component: <Home />,
  },
  {
    enabled: true,
    title: "programs",
    path: "/programs",
    component: <Programs />,
  },
  {
    enabled: true,
    title: "shows",
    path: "/shows",
    component: <Shows />,
  },
  {
    enabled: true,
    title: "faces",
    path: "/faces",
    component: <Faces />,
  },
  {
    enabled: true,
    title: "films",
    path: "/films",
    component: <Films />,
  },
  {
    enabled: true,
    title: "schedule",
    path: "/schedule",
    component: <Schedule />,
  },
  {
    enabled: true,
    title: "contact_us",
    path: "/contact_us",
    component: <ContactUs />,
  },
];
