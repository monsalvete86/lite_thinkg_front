import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

import * as AuthService from "./services/auth.service";
import IUser from "./types/user.type";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
import Company from "./components/Company";
import EventBus from "./common/EventBus";
import Products from "./components/Products";
import ProductForm from "./components/ProductForm";
import Clientes from "./components/Clientes";
import ClienteForm from "./components/ClienteForm";
import Pagos from "./components/Pagos";
import PagoForm from "./components/PagoForm";
import DailyList from "./components/DailyList/DailyList";
import ClientDailyLists from "./components/DailyList/ClientDailyList";
import ClientDailyListForm from "./components/DailyList/ClientDailyListForm";
import SubscriptionForm from "./components/Subscription/SubscriptionForm";
import Subscriptions from "./components/Subscription/Subscription";
import ProcessorForm from "./components/Processor/ProcessorForm";
import Processors from "./components/Processor/ProcessorList";
import Users from "./components/User/UserList";

const App: React.FC = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false);
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", logOut);

    return () => {
      EventBus.remove("logout", logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Cristhiam Monsalve
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/company"} className="nav-link">
              Company
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/products"} className="nav-link">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/clientes"} className="nav-link">
              Clientes
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/dailyList"} className="nav-link">
              Listado diario
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/subscriptions"} className="nav-link">
              Suscripciones
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/processors"} className="nav-link">
              Procesadoras
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/pagos"} className="nav-link">
              Pagos
            </Link>
          </li>

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tutorials" element={<TutorialsList />} />
          <Route path="/company" element={<Company />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/:id" element={<ProductForm />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/new" element={<ClienteForm />} />
          <Route path="/clientes/:id" element={<ClienteForm />} />
          <Route path="/tutorials/:id" element={<Tutorial />} />
          <Route path="/dailyList" element={<DailyList />} />
          <Route path="/pagos" element={<Pagos />} />
          <Route path="/users" element={<Users />} />
          <Route path="/pagos/new" element={<PagoForm />} />
          <Route path="/pagos/:id" element={<PagoForm />} />
          <Route path="/clientDailyList" element={<ClientDailyLists />} />
          <Route path="/clientDailyList/:id" element={<ClientDailyListForm/>}   />
          <Route path="/subscriptions" element={<Subscriptions/>}   />
          <Route path="/subscription/new" element={<SubscriptionForm />} />
          <Route path="/subscription/:id" element={<SubscriptionForm />} />
          <Route path="/processors" element={<Processors/>}   />
          <Route path="/processor/new" element={<ProcessorForm />} />
          <Route path="/processor/:id" element={<ProcessorForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

