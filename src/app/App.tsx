import React, { useCallback, useEffect } from "react";
import "./App.css";
import { TodolistsList } from "features/TodolistsList/TodolistsList";
import { ErrorSnackbar } from "components/ErrorSnackbar/ErrorSnackbar";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "features/Auth/Login";
import { actionsLogin } from "features/Auth";
import { asyncActionsinitializeApp } from "../app/index";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { selectors } from "app/app.index";
import { sectorAuth } from "features/Auth";
import { useActions } from "app/store";

type PropsType = {
  demo?: boolean
}


function App({ demo = false }: PropsType) {
  const status = useSelector(selectors.selectStatus);
  const isInitialized = useSelector(selectors.selectIsInitialized);
  const isLoggedIn = useSelector(sectorAuth);
  const { initializeAppTC } = useActions(asyncActionsinitializeApp)
  const{logoutTC} = useActions(actionsLogin)

  useEffect(() => {
    initializeAppTC();
  }, []);

  const logoutHandler = useCallback(() => {
    logoutTC();
  }, []);

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%"
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <ErrorSnackbar />
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <Typography variant="h6">News</Typography>
            {isLoggedIn && (
              <Button color="inherit" onClick={logoutHandler}>
                Log out
              </Button>
            )}
          </Toolbar>
          {status === "loading" && <LinearProgress />}
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path={"/"} element={<TodolistsList demo={demo} />} />
            <Route path={"/login"} element={<Login />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
