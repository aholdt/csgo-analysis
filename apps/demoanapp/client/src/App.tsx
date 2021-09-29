import { Container, CssBaseline, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import SideMenu from "./components/side-menu/side-menu";
import Routes from "./Routes";

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={clsx("App", classes.root)}>
      <CssBaseline />
      <SideMenu drawerWidth={drawerWidth}></SideMenu>
      <Switch>
        {Routes.map((route: any) => (
          <Route exact path={route.path} key={route.path}>
            <main className={classes.content}>
              <Container maxWidth="lg" className={classes.container}>
                <route.component />
              </Container>
            </main>
          </Route>
        ))}
      </Switch>
    </div>
  );
};

const drawerWidth = 240;

const useStyles: any = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

export default App;
