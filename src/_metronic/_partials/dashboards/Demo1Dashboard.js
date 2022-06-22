import React, { useState } from "react"; // useState
import {
  MixedWidget1,
  // StatsWidget11,
  // StatsWidget12
} from "../widgets";
// import TextField from "@material-ui/core/TextField";
// import { Button } from "react-bootstrap";
// import { ApiPost } from "../../../helpers/API/ApiData";
import { ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
import Category from "../../components/Category/Category";
import SubCategory from "../../components/SubCategory/SubCategory";
import SubSubCategory from "../../components/SubSubCategory/SubSubCategory";

export function Demo1Dashboard() {
  const [tableType, setTableType] = useState("Category");
  return (
    <>
      <ToastContainer />
      <div className=" ">
        <div className="col-lg-12 col-xxl-12 p-0">
          <div className="row">
            <div className="col-xl-4 col-md-6 mb-4">
              <div className="card rounded-3 border-5 border-bottom-success shadow h-100 py-2">
                <div
                  className="card-body cursor-pointer"
                  onClick={() => {
                    setTableType("Category");
                  }}
                >
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                        Categories
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {/* <CountUp
                      end={countdata?.totalUser ? countdata?.totalUser : 0}
                    /> */}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas  fa-users fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6 mb-4">
              <div className="card rounded-3 border-5 border-bottom-warning shadow h-100 py-2">
                <div
                  className="card-body cursor-pointer"
                  onClick={() => {
                    setTableType("SubCategory");
                  }}
                >
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                        Sub Category
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {/* <CountUp
                      end={
                        countdata?.totalUserActive
                          ? countdata?.totalUserActive
                          : 0
                      }
                    /> */}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-user-check fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6 mb-4">
              <div className="card rounded-3 border-5 border-bottom-primary shadow h-100 py-2">
                <div
                  className="card-body cursor-pointer"
                  onClick={() => {
                    setTableType("SubSubCategory");
                  }}
                >
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        Product Category
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {/* <CountUp
                      end={
                        countdata?.totalUserInActive
                          ? countdata?.totalUserInActive
                          : 0
                      }
                    /> */}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-user-slash fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            {tableType === "Category" ? (
              <Category />
            ) : tableType === "SubCategory" ? (
              <SubCategory />
            ) : tableType === "SubSubCategory" ? (
              <SubSubCategory />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
