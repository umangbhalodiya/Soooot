import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import {
  ApiGet,
  ApiDelete,
  ApiPut,
  ApiPost,
} from "../../../helpers/API/ApiData";
import { Tooltip } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import Toolbar from "@material-ui/core/Toolbar";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
// import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Category = ({ getNewCount, title }) => {
  const [filteredInterest, setFilteredInterest] = useState({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAddInterest, setIsAddInterest] = useState(false);
  const [idForUpdateInterest, setIdForUpdateInterest] = useState("");
  const [inputValueForAdd, setInputValueForAdd] = useState({});
  const [errorsForAdd, setErrorsForAdd] = useState({});
  const [idForDeleteInterest, setIdForDeleteInterest] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [isEditApi, setIsEditApi] = useState(false);

  const handleOnChnageAdd = (e) => {
    const { name, value } = e.target;
    setInputValueForAdd({ ...inputValueForAdd, [name]: value });
    setErrorsForAdd({ ...errorsForAdd, [name]: "" });
  };

  const handleOnChnageAddImg = (e) => {
    const { name } = e.target;
    setInputValueForAdd({ ...inputValueForAdd, [name]: e.target.files[0] });
    setErrorsForAdd({ ...errorsForAdd, [name]: "" });
  };

  const handleAddAdminClose = () => {
    setInputValueForAdd({});
    setErrorsForAdd({});
    setIsAddInterest(false);
    setIsEditApi(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    console.log("log");
    getAllUpdate();
  }, [page, countPerPage]);

  const getAllUpdate = async () => {
    setIsLoaderVisible(true);
    if (!search) {
      await ApiGet(`category`)
        .then((res) => {
          console.log("category", res?.data?.payload?.findCategory);

          setIsLoaderVisible(false);
          setFilteredInterest(res?.data?.payload?.findCategory);
          setCount(res?.data?.data?.length);
        })
        .catch((err) => {});
    } else {
      await ApiGet(`category`)
        .then((res) => {
          console.log("category", res?.data?.payload?.findCategory);
          setIsLoaderVisible(false);
          setFilteredInterest(res?.data?.payload?.findCategory);
          setCount(res?.data?.data?.length);
        })
        .catch((err) => {});
    }
  };

  const validateFormForAddAdmin = () => {
    let formIsValid = true;
    let errorsForAdd = {};

    if (inputValueForAdd && !inputValueForAdd.name) {
      formIsValid = false;
      errorsForAdd["name"] = "*Please enter name!";
    }
    if (inputValueForAdd && !inputValueForAdd.description) {
      formIsValid = false;
      errorsForAdd["description"] = "*Please enter description!";
    }

    // if (inputValueForAdd && !inputValueForAdd.image) {
    //   formIsValid = false;
    //   errorsForAdd["image"] = "*Please upload image!";
    // }

    setErrorsForAdd(errorsForAdd);
    return formIsValid;
  };

  const handleAddInterest = (e) => {
    e.preventDefault();
    if (validateFormForAddAdmin()) {
      setLoading(true);
      let formData = new FormData();
      formData.append("name", inputValueForAdd?.name);
      formData.append("description", inputValueForAdd?.description);
      // formData.append("image", inputValueForAdd?.image);

      ApiPost(`category/create`, formData)
        .then((res) => {
          if (res?.status == 200) {
            setIsAddInterest(false);
            toast.success(res?.data?.message);
            setInputValueForAdd({});
            getAllUpdate();
            // { document.title === "T | Dashboard" && getNewCount() }
            setLoading(false);
          } else {
            toast.error(res?.data?.message);
            setLoading(false);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
          setLoading(false);
        });
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let errorsForAdd = {};
    if (inputValueForAdd && !inputValueForAdd.name) {
      formIsValid = false;
      errorsForAdd["name"] = "*Please enter Name!";
    }
    if (inputValueForAdd && !inputValueForAdd.description) {
      formIsValid = false;
      errorsForAdd["description"] = "*Please enter description!";
    }
    setErrorsForAdd(errorsForAdd);
    return formIsValid;
  };

  const handleDeleteAnnouncement = () => {
    ApiDelete(`category/delete/${idForDeleteInterest}`)
      .then((res) => {
        if (res?.status == 200) {
          setShow(false);
          toast.success("Deleted Successfully");
          getAllUpdate();
          // { document.title === "Talktomii | Dashboard" && getNewCount() }
          setPage(1);
          setCount(0);
          setCountPerPage(countPerPage);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleUpdateInterest = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      let formData = new FormData();
      formData.append("name", inputValueForAdd?.name);
      formData.append("description", inputValueForAdd?.description);
      // {
      //   inputValueForAdd?.imageForUpdate &&
      //     formData.append("image", inputValueForAdd?.imageForUpdate);
      // }
      ApiPut(`category/update/${idForUpdateInterest}`, formData)
        .then((res) => {
          if (res?.status == 200) {
            setInputValueForAdd({});
            setIsAddInterest(false);
            setIsEditApi(false);
            toast.success(res?.data?.message);
            getAllUpdate();
            setLoading(false);
          } else {
            toast.error(res?.data?.message);
            setLoading(false);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
          setLoading(false);
        });
    }
  };

  let i = 0;
  const columns = [
    {
      name: " ",
      cell: (row, index) => (page - 1) * countPerPage + (index + 1),
      width: "65px",
    },
 
    {
      name: "Name",
      cell: (row) => {
        return <>{!row.name ? "-" : row?.name}</>;
      },
      selector: "name",
      sortable: true,
    },
    {
      name: "Description",
      cell: (row) => {
        return <>{!row.description ? "-" : row?.description}</>;
      },
      selector: "description",
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => {
        return (
          <>
            <div className="d-flex justify-content-between">
              <div
                className="cursor-pointer pl-2"
                onClick={() => {
                  setIsAddInterest(true);
                  setIsEditApi(true);
                  setInputValueForAdd({
                    name: row?.name,
                    description: row?.description,
                    // image: row?.image,
                  });
                  setIdForUpdateInterest(row?._id);
                }}
              >
                <Tooltip title="Edit Interest" arrow>
                  <CreateIcon />
                </Tooltip>
              </div>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShow(true);
                setIdForDeleteInterest(row?._id);
              }}
            >
              <Tooltip title="Delete Interest" arrow>
                <DeleteIcon />
              </Tooltip>
            </div>
          </>
        );
      },
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
        borderTopColor: "transparent",
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "transparent",
        },
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "transparent",
        },
      },
    },
  };

  //for search data

  //   const handleSearch = (e) => {
  //     let val = e.target.value.replace(/[^\w\s]/gi, "");
  //     setSearch(val);
  //   };

  const debouncedSearchTerm = useDebounce(search, 500);

  // Hook
  function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
      () => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsLoaderVisible(true);
      setPage(1);
      setCount(0);
      setCountPerPage(countPerPage);
      getAllUpdate();
    } else {
      setPage(1);
      setCount(0);
      setCountPerPage(countPerPage);
      getAllUpdate();
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <ToastContainer />
      <div className="card p-1">
        {document.title === "Talktomii | Interest"}
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">Category </h2>
            </div>
            {/* <div className="col">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid `}
                  name="search"
                  value={search}
                  placeholder="Search Interest"
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div> */}
            <div className="cus-medium-button-style button-height">
              <button
                onClick={() => {
                  setIsAddInterest(true);
                }}
                className="btn btn-success mr-2"
              >
                Add Interest
              </button>
            </div>
          </div>

          {/* delete model */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="text-danger">Alert!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure to want to delete this category ?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDeleteAnnouncement();
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
          {/* end delete model */}

          <DataTable
            columns={columns}
            data={filteredInterest}
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

      {isAddInterest ? (
        <Dialog
          fullScreen
          open={isAddInterest}
          onClose={handleAddAdminClose}
          TransitionComponent={Transition}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleAddAdminClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <List>
            {isAddInterest === true ? (
              <div className="form ml-30 ">
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Enter Name
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="name"
                        name="name"
                        value={inputValueForAdd.name}
                        onChange={(e) => {
                          handleOnChnageAdd(e);
                        }}
                      />
                    </div>
                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errorsForAdd["name"]}
                    </span>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Description
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="description"
                        name="description"
                        value={inputValueForAdd.description}
                        onChange={(e) => {
                          handleOnChnageAdd(e);
                        }}
                      />
                    </div>
                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errorsForAdd["description"]}
                    </span>
                  </div>
                </div>

                {/* {isEditApi ? (
                  <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label">
                      Image
                    </label>
                    <div className="col-lg-9 col-xl-6">
                      <div>
                        <input
                          type="file"
                          className={`form-control form-control-lg form-control-solid `}
                          name="imageForUpdate"
                          // value={productValues.image || null}
                          onChange={(e) => {
                            handleOnChnageAddImg(e);
                          }}
                          accept="image/*"
                          required
                        />
                      </div>
                      <div>
                        {inputValueForAdd?.imageForUpdate && <img style={{ height: "128px", width: "128px" }} src={URL.createObjectURL(inputValueForAdd?.imageForUpdate)} />}
                      </div>

                      <span
                        style={{
                          color: "red",
                          top: "5px",
                          fontSize: "12px",
                        }}
                      >
                        {errorsForAdd["imageForUpdate"]}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label">
                      Image
                    </label>
                    <div className="col-lg-9 col-xl-6">
                      <div>
                        <input
                          type="file"
                          className={`form-control form-control-lg form-control-solid `}
                          name="image"
                          // value={productValues.image || null}
                          onChange={(e) => {
                            handleOnChnageAddImg(e);
                          }}
                          accept="image/*"
                          required
                        />
                      </div>
                      <div>
                        {inputValueForAdd?.image && <img style={{ height: "128px", width: "128px" }} src={URL.createObjectURL(inputValueForAdd?.image)} />}
                      </div>
                      <span
                        style={{
                          color: "red",
                          top: "5px",
                          fontSize: "12px",
                        }}
                      >
                        {errorsForAdd["image"]}
                      </span>
                    </div>
                  </div>
                )}

                {isEditApi && !inputValueForAdd?.imageForUpdate ? (
                  <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label">
                      Uploded Image
                    </label>
                    <div className="col-lg-9 col-xl-6">
                      <div>
                        <img src={inputValueForAdd?.image} />
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )} */}

                <div className="d-flex align-items-center justify-content-center">
                  {loading ? (
                    <button className="btn btn-success mr-2">
                      <span>{isEditApi ? "Edit" : "Add"} Details</span>
                      {loading && (
                        <span className="mx-3 spinner spinner-white"></span>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        {
                          isEditApi
                            ? handleUpdateInterest(e)
                            : handleAddInterest(e);
                        }
                      }}
                      className="btn btn-success mr-2"
                    >
                      <span>{isEditApi ? "Edit" : "Add"} Details</span>
                      {loading && (
                        <span className="mx-3 spinner spinner-white"></span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ) : null}
          </List>
        </Dialog>
      ) : null}
    </>
  );
};

export default Category;
