import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute, LayoutSplashScreen } from "../_metronic/layout"; 
import DashboardPage from "./pages/DashboardPage"; 
import News from "../_metronic/components/News/News";
import Category from "../_metronic/components/Category/Category";
export default function BasePage() { 

  return (
    <>
      <Suspense fallback={<LayoutSplashScreen />}>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <ContentRoute exact path="/dashboard" component={DashboardPage} />
          <ContentRoute exact path="/newsletter" component={News} />
          <ContentRoute exact path="/category" component={Category} />
          <Redirect to="error/error-v6" />
        </Switch>
      </Suspense>
    </>
  );
}
