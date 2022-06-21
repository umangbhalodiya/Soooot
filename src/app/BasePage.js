import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute, LayoutSplashScreen } from "../_metronic/layout"; 
import DashboardPage from "./pages/DashboardPage"; 
import News from "../_metronic/components/News/News";
import Category from "../_metronic/components/Category/Category";
import SubCategory from "../_metronic/components/SubCategory/SubCategory";
import SubSubCategory from "../_metronic/components/SubSubCategory/SubSubCategory";
export default function BasePage() { 

  return (
    <>
      <Suspense fallback={<LayoutSplashScreen />}>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <ContentRoute exact path="/dashboard" component={DashboardPage} />
          <ContentRoute exact path="/newsletter" component={News} />
          <ContentRoute exact path="/category" component={Category} />
          <ContentRoute exact path="/subcategory" component={SubCategory} />
          <ContentRoute exact path="/subsubcategory" component={SubSubCategory} />
          <Redirect to="error/error-v6" />
        </Switch>
      </Suspense>
    </>
  );
}
