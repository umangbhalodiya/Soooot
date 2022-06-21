import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import { ApiGet } from "../../../helpers/API/ApiData";
// import Slide from "@material-ui/core/Slide";
import { ToastContainer } from "react-toastify";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

const Creators = () => {
  const [creatorData, setCreatorData] = useState([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [
    count,
    // setCount
  ] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  const [filteredReport, setFilteredReport] = useState();

  useEffect(() => {
    const getCompanyData = async () => {
      setIsLoaderVisible(true);
      await ApiGet("creator/find-all")
        .then((res) => {
          console.log("creator data", res.data.creator);
          setCreatorData(res.data.creator);
          setFilteredReport(res.data.creator);
        })
        .catch((err) => {
          console.log("err", err);
        });
      setIsLoaderVisible(false);
    };
    getCompanyData();
  }, []);

  // const getCompanyData = async () => {
  //   setIsLoaderVisible(true);
  //   await ApiGet("creator/find-all")
  //     .then((res) => {
  //       console.log("creator data", res.data.creator);
  //       setCreatorData(res.data.creator);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });

  //   setIsLoaderVisible(false);
  // };

  const columns = [
    {
      name: "SNo",
      cell: (row, index) => (page - 1) * countPerPage + (index + 1),
      width: "65px",
    },

    {
      name: "Creator Name",
      cell: (row) => {
        return <>{row.creatorName ? row.creatorName : "-"}</>;
      },
      selector: "firstName",
      sortable: true,
    },

    {
      name: "Email",
      cell: (row) => {
        return <>{row.email ? row.email : "-"}</>;
      },
      selector: "email",
      sortable: true,
    },

    {
      name: "Country",
      cell: (row) => {
        return <>{row.country ? row.country : "-"}</>;
      },
      selector: "country",
      sortable: true,
    },
    {
      name: "Platform And Followers",
      cell: (row) => {
        return (
          <>
            {row.social.map((data) => {
            return <> {data.type + "(" + data.count + ")"}&nbsp;</>;
            })}
          </>
        );
      },
      selector: "projectName",
      sortable: true,
    },
  ];
  // * Table Style
  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: defaultThemes.default.divider.default,
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
      },
    },
  };

  //for search data

  const handleSearch = (e) => {
    var value = e.target.value.toLowerCase();
    setFilteredReport(() =>
      creatorData.filter((item) =>
        item?.creatorName.toLowerCase().includes(value)
      )
    );
  };

  // Hook
  // function useDebounce(value, delay) {
  //   const [debouncedValue, setDebouncedValue] = useState(value);
  //   useEffect(() => {
  //     const handler = setTimeout(() => {
  //       setDebouncedValue(value);
  //     }, delay);

  //     return () => {
  //       clearTimeout(handler);
  //     };
  //   }, [value, delay]);
  //   return debouncedValue;
  // }

  // const [dataCSV, setDataCSV] = useState([]);

  return (
    <>
      <div className="card p-1">
        <ToastContainer />
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">Creators</h2>
            </div>
            <div className="col">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid `}
                  name="search"
                  placeholder="Search.."
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredReport}
            customStyles={customStyles}
            style={{
              marginTop: "-3rem",
            }}
            progressPending={isLoaderVisible}
            // progressComponent={
            //   <Loader type="Puff" color="#334D52" height={30} width={30} />
            // }
            highlightOnHover
            pagination
            paginationServer
            paginationTotalRows={count}
            paginationPerPage={countPerPage}
            paginationRowsPerPageOptions={[10, 20, 25, 50, 100]}
            paginationDefaultPage={page}
            onChangePage={(page) => {
              setPage(page);
            }}
            onChangeRowsPerPage={(rowPerPage) => {
              setCountPerPage(rowPerPage);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Creators;
