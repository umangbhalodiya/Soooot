import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import { ApiGet } from "../../../helpers/API/ApiData";
// import Slide from "@material-ui/core/Slide";
import { ToastContainer } from "react-toastify";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

const Companies = () => {
  const [allCompany, setAllCompany] = useState([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [count, 
    // setCount
  ] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  // const [search, setSearch] = useState("");
  const [filteredReport, setFilteredReport] = useState();

  useEffect(() => {
    const getCompanyData = async () => {
      setIsLoaderVisible(true);
      await ApiGet("company/find-all")
        .then((res) => {
          console.log("company data", res.data.companys);
          setAllCompany(res.data.companys);
          setFilteredReport(res.data.companys);
        })
        .catch((err) => {
          console.log("err", err);
        });

      setIsLoaderVisible(false);
    };
    getCompanyData();
  }, []);

  const columns = [
    {
      name: "SNo",
      cell: (row, index) => (page - 1) * countPerPage + (index + 1),
      width: "65px",
    },

    {
      name: "Project Name",
      cell: (row) => {
        return <>{row.projectName ? row.projectName : "-"}</>;
      },
      selector: "projectName",
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
      name: "Web Site",
      cell: (row) => {
        return <>{row.website ? row.website : "-"}</>;
      },
      selector: "website",
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
      allCompany.filter(
        (item) =>
          item?.projectName.toLowerCase().includes(value) ||
          item?.email.toLowerCase().includes(value)
      )
    );
  };

  // Hook
  // function useDebounce(value, delay) {
  //   // State and setters for debounced value
  //   const [debouncedValue, setDebouncedValue] = useState(value);
  //   useEffect(
  //     () => {
  //       // Update debounced value after delay
  //       const handler = setTimeout(() => {
  //         setDebouncedValue(value);
  //       }, delay);
  //       // Cancel the timeout if value changes (also on delay change or unmount)
  //       // This is how we prevent debounced value from updating if value is changed ...
  //       // .. within the delay period. Timeout gets cleared and restarted.
  //       return () => {
  //         clearTimeout(handler);
  //       };
  //     },
  //     [value, delay] // Only re-call effect if value or delay changes
  //   );
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
              <h2 className="pl-3 pt-2">Companies</h2>
            </div>
            <div className="col">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid `}
                  name="search"
                  placeholder="Search Menu"
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

export default Companies;
