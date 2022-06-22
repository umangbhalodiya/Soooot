import React, {useEffect, useState} from "react";
import DataTable, {defaultThemes} from "react-data-table-component";
import {ApiGet, ApiDelete, ApiPut, ApiPost} from "../../../helpers/API/ApiData";
import {Tooltip} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import Toolbar from "@material-ui/core/Toolbar";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Disapprove from "../../layout/components/Logos/cross.png";
import Approve from "../../layout/components/Logos/checked1.png";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import {Button} from "react-bootstrap";
import {Modal} from "react-bootstrap";
// import Loader from "react-loader-spinner";
import {ToastContainer, toast} from "react-toastify";
import moment from "moment";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up"
        ref={ref}
        {...props}/>;
});

const SubCategory = ({getNewCount, title}) => {
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
    const [categoryList, setCategoryList] = useState([]);
    const [category_id, setCategory_id] = useState("");
    const [sId, setServiceId] = useState();
    const [approve, setApprove] = useState(false);
    const [decline, setDecline] = useState(false);


    const handleOnChnageAdd = (e) => {
        const {name, value} = e.target;
        setInputValueForAdd({
            ...inputValueForAdd,
            [name]: value
        });
        setErrorsForAdd({
            ...errorsForAdd,
            [name]: ""
        });
    };

    const handleOnChnageAddImg = (e) => {
        const {name} = e.target;
        setInputValueForAdd({
            ...inputValueForAdd,
            [name]: e.target.files[0]
        });
        setErrorsForAdd({
            ...errorsForAdd,
            [name]: ""
        });
    };

    const handleAddAdminClose = () => {
        setInputValueForAdd({});
        setErrorsForAdd({});
        setIsAddInterest(false);
        setIsEditApi(false);
    };

    const handleClose = () => {
        setShow(false);
        setDecline(false);
        setApprove(false);
    };

    useEffect(() => {
        getAllUpdate();
    }, [page, countPerPage]);

    const getAllUpdate = async () => {
        setIsLoaderVisible(true);
        if (!search) {
            await ApiGet(`sub_category`).then((res) => {
                console.log("category22", res ?. data ?. payload ?. findSubCategory ?. map((data) => {
                    return {
                        value: data ?. categoryId ?. _id,
                        label: data ?. categoryId ?. name
                    };
                }));
                // setCategory_id(
                // res?.data?.payload?.findSubCategory?.map((data) => {
                //     return { value: data?.categoryId?._id};
                // })
                // );

                setIsLoaderVisible(false);
                setFilteredInterest(res ?. data ?. payload ?. findSubCategory);
                setCount(res ?. data ?. data ?. length);
            }).catch((err) => {});
        } else {
            await ApiGet(`sub_category`).then((res) => {
                console.log("category11", res ?. data ?. payload ?. findSubCategory);
                setIsLoaderVisible(false);
                setFilteredInterest(res ?. data ?. payload ?. findSubCategory);
                setCount(res ?. data ?. data ?. length);
                setCategory_id(res ?. data ?. payload ?. findCategory ?. map((data) => {
                    return {
                        value: data ?. categoryId ?. _id,
                        label: data ?. categoryId ?. name
                    };
                }));
            }).catch((err) => {});
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
        if (!category_id) {
            formIsValid = false;
            errorsForAdd["category_id"] = "*Please select category!";
        }

        // if (inputValueForAdd && !inputValueForAdd.image) {
        // formIsValid = false;
        // errorsForAdd["image"] = "*Please upload image!";
        // }

        setErrorsForAdd(errorsForAdd);
        return formIsValid;
    };

    const handleAddInterest = (e) => {
        e.preventDefault();
        if (validateFormForAddAdmin()) {
            setLoading(true);
            const data = {
                name: inputValueForAdd ?. name,
                description: inputValueForAdd ?. description,
                cid: category_id
            }
            // let formData = new FormData();
            // formData.append("name", inputValueForAdd?.name);
            // formData.append("description", inputValueForAdd?.description);
            // formData.append("image", inputValueForAdd?.image);

            ApiPost(`sub_category/create`, data).then((res) => {
                if (res ?. status == 200) {
                    setIsAddInterest(false);
                    toast.success(res ?. data ?. message);
                    setInputValueForAdd({});
                    getAllUpdate();
                    // { document.title === "T | Dashboard" && getNewCount() }
                    setLoading(false)
                } else {
                    toast.error(res ?. data ?. message);
                    setLoading(false)
                }
            }).catch((err) => {
                toast.error(err ?. response ?. data ?. message);
                setLoading(false)
            });
        }
    };

    const validateForm = () => {
        let formIsValid = true;
        let errorsForAdd = {};
        if (inputValueForAdd && !inputValueForAdd ?. name.trim()) {
            formIsValid = false;
            errorsForAdd["name"] = "*Please enter name!";
        }
        if (inputValueForAdd && !inputValueForAdd ?. description.trim()) {
            formIsValid = false;
            errorsForAdd["description"] = "*Please enter description!";
        }
        setErrorsForAdd(errorsForAdd);
        return formIsValid;
    };

    useEffect(() => {
        console.log("caid", category_id);
        getCategory();
    }, []);

    // const getCategory = () = > {
    // ApiGet("category")
    //       .then((res) => {
    //         // console.log("object",res);
    //         console.log(
    //           "cats",
    //           res?.data?.payload?.findCategory?.map((data) => {
    //             return { value: data?._id, label: data?.name };
    //           })
    //         );
    //         setCategoryList(
    //           res?.data?.payload?.findCategory?.map((data) => {
    //             return { value: data?._id, label: data?.name };
    //           })
    //         );
    //       })
    //       .catch((error) => console.log(error));

    // }
    const getCategory = () => {
        ApiGet("category").then((res) => {
            if (res ?. status == 200) {
                setCategoryList(res ?. data ?. payload ?. findCategory ?. map((data) => {
                    return {
                        value: data ?. _id,
                        label: data ?. name
                    };
                }));
            } else {
                toast.error(res ?. data ?. message);
            }
        }).catch((err) => {
            console.log(err.message);
        });
    };

    const handleDeleteAnnouncement = () => {
        ApiDelete(`sub_category/delete?id=${idForDeleteInterest}`).then((res) => {
            if (res ?. status == 200) {
                setShow(false);
                toast.success("Deleted Successfully");
                getAllUpdate();
                // { document.title === "Talktomii | Dashboard" && getNewCount() }
                setPage(1);
                setCount(0);
                setCountPerPage(countPerPage);
            } else {
                toast.error(res ?. data ?. message);
            }
        }).catch((err) => {
            toast.error(err.message);
        });
    };

    const handleUpdateInterest = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setLoading(true);
            const data = {
                name: inputValueForAdd ?. name,
                description: inputValueForAdd ?. description,
                cid: category_id
            }
            // let formData = new FormData();
            // formData.append("name", inputValueForAdd?.name);
            // formData.append("description", inputValueForAdd?.description);
            // {
            // inputValueForAdd?.imageForUpdate &&
            //     formData.append("image", inputValueForAdd?.imageForUpdate);
            // }
            ApiPut(`sub_category/update?id=${idForUpdateInterest}`, data).then((res) => {
                if (res ?. status == 200) {
                    setInputValueForAdd({});
                    setIsAddInterest(false);
                    setIsEditApi(false);
                    toast.success(res ?. data ?. message);
                    getAllUpdate();
                    setLoading(false)
                } else {
                    toast.error(res ?. data ?. message);
                    setLoading(false)
                }
            }).catch((err) => {
                toast.error(err ?. response ?. data ?. message);
                setLoading(false)
            });
        }
    };

    let i = 0;
    const columns = [
        {
            name: "SNo",
            cell: (row, index) => (page - 1) * countPerPage + (index + 1),
            width: "65px"
        },

        // {
        // name: "Image",
        // selector: "image",
        // cell: (row) => {
        //     return (
        //       <>
        //         <div className="p-3">
        //           <img className="max-w-50px zoom" alt="img" src={row?.image} />
        //         </div>
        //       </>
        //     );
        // },
        // wrap: true,
        // sortable:true
        // },
        {
            name: "Name",
            cell: (row) => {
                return <>{
                    !row ?. name ? "-" : row ?. name
                }</>;
            },
            selector: "name",
            sortable: true
        },
        {
            name: "Description",
            cell: (row) => {
                return <>{
                    !row ?. description ? "-" : row ?. description
                }</>;
            },
            selector: "description",
            sortable: true
        },
        {
            name: "Category",
            cell: (row) => {
                return <>{
                    !row ?. categoryId ?. name ? "-" : row ?. categoryId ?. name
                }</>;
            },
            selector: "categoryId",
            sortable: true
        }, {
            name: "status",
            cell: (row) => {
                return (
                    <>
                        <div className="d-flex justify-content-between">
                            {
                            row ?. isActive === true ? (
                                <span className=" badge badge-pill bg-light-success text-success ">
                                    Active
                                </span>
                            ) : (
                                <span className="badge badge-pill bg-light-danger text-danger ">
                                    DeActive
                                </span>
                            )
                        } </div>
                    </>
                );
            },
            sortable: true,
            width: "110px"
        }, {
            name: "Actions",
            cell: (row) => {
                return (
                    <>
                        <div className="d-flex justify-content-between">
                            {
                            row ?. isActive === false && (
                                <>
                                    <div className="cursor-pointer pr-1 pt-1"
                                        onClick={
                                            () => {
                                                setApprove(true);
                                                setServiceId(row._id);
                                                console.log("object", row._id);
                                            }
                                    }>
                                        <Tooltip title="Activate" arrow>
                                            <img alt="" width="27px"
                                                src={Approve}></img>
                                        </Tooltip>
                                    </div>
                                </>
                            )
                        }
                            {
                            row ?. isActive === true && (
                                <div className="cursor-pointer pr-1 pt-1"
                                    onClick={
                                        () => {
                                            setDecline(true);
                                            setServiceId(row._id);
                                            console.log("object", row._id);
                                        }
                                }>
                                    <Tooltip title="DeActivate" arrow>
                                        <img alt="" width="27px"
                                            src={Disapprove}></img>
                                    </Tooltip>
                                </div>
                            )
                        }


                            <div className="cursor-pointer pl-2"
                                onClick={
                                    () => {
                                        setIsAddInterest(true);
                                        setIsEditApi(true);
                                        setInputValueForAdd({
                                            name: row ?. name,
                                            description: row ?. description,
                                            // image: row?.image,
                                        });
                                        setIdForUpdateInterest(row ?. _id);
                                        setCategory_id(row ?. categoryId ?. _id)
                                    }
                            }>
                                <Tooltip title="Edit Sub-Category" arrow>
                                    <CreateIcon/>
                                </Tooltip>
                            </div>
                        </div>
                    </>
                );
            },
            width: "100px"
        },

        // {
        // name: "Actions",
        // cell: (row) => {
        //     return (
        //       <>
        //         <div className="d-flex justify-content-between">
        //           <div
        //             className="cursor-pointer pl-2"
        //             onClick={() => {
        //               setIsAddInterest(true);
        //               setIsEditApi(true);
        //               setInputValueForAdd({
        //                 name: row?.name,
        //                 description: row?.description,
        //                 // image: row?.image,
        //               });
        //               setIdForUpdateInterest(row?._id);
        //             }}
        //           >
        //             <Tooltip title="Edit Interest" arrow>
        //               <CreateIcon />
        //             </Tooltip>
        //           </div>
        //         </div>
        //         <div
        //           className="cursor-pointer"
        //           onClick={() => {
        //             setShow(true);
        //             setIdForDeleteInterest(row?._id);
        //           }}
        //         >
        //           <Tooltip title="Delete Interest" arrow>
        //             <DeleteIcon />
        //           </Tooltip>
        //         </div>
        //       </>
        //     );
        // },
        // },
    ];
    // * Table Style
    const customStyles = {
        header: {
            style: {
                minHeight: "56px"
            }
        },
        headRow: {
            style: {
                borderTopStyle: "solid",
                borderTopWidth: "1px",
                borderTopColor: defaultThemes.default.divider.default
            }
        },
        headCells: {
            style: {
                "&:not(:last-of-type)": {
                    borderRightStyle: "solid",
                    borderRightWidth: "1px",
                    borderRightColor: defaultThemes.default.divider.default
                }
            }
        },
        cells: {
            style: {
                "&:not(:last-of-type)": {
                    borderRightStyle: "solid",
                    borderRightWidth: "1px",
                    borderRightColor: defaultThemes.default.divider.default
                }
            }
        }
    };

    // for search data

    // const handleSearch = (e) => {
    //     let val = e.target.value.replace(/[^\w\s]/gi, "");
    //     setSearch(val);
    // };

    const debouncedSearchTerm = useDebounce(search, 500);

    // Hook
    function useDebounce(value, delay) { // State and setters for debounced value
        const [debouncedValue, setDebouncedValue] = useState(value);
        useEffect(() => { // Update debounced value after delay
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            // Cancel the timeout if value changes (also on delay change or unmount)
            // This is how we prevent debounced value from updating if value is changed ...
            // .. within the delay period. Timeout gets cleared and restarted.
            return() => {
                clearTimeout(handler);
            };
        }, [value, delay] // Only re-call effect if value or delay changes
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

    const handleDecline = async () => {

        await ApiDelete(`sub_category/delete?id=${sId}&isActive=false`).then((res) => {
            
            if (res ?. status == 200) {
                setCategoryList(res ?. data ?. payload ?. findCategory ?. map((data) => {
                    return {
                        value: data ?. _id,
                        label: data ?. name
                    };
                }));
                console.log("res.data", res.data);
            getAllUpdate();
            toast.success("Sub-category de-activated successfully");
            handleClose();
            } else {
                handleClose();
                getAllUpdate();
                toast.error(res?.message);
            }
        }).catch((err) => {
            console.log("err", err);
        });
    };
    const handleApprove = async (e) => {
        await ApiDelete(`sub_category/delete?id=${sId}&isActive=true`).then((res) => {
            if (res ?. status == 200) {
            console.log("res.data", res.data);
            getAllUpdate();
            handleClose();
            toast.success("Sub-category activated successfully");
        } else {
            getAllUpdate();
            handleClose();
            toast.error(res?.message);
        }
        }).catch((err) => {
            console.log("err", err);
        });
    };

    return (
        <>
            <ToastContainer/>
            <div className="card p-1">
                {
                document.title === "Talktomii | Interest"
            }
                <div className="p-2 mb-2">
                    <div className="row mb-4 pr-3">
                        <div className="col d-flex justify-content-between">
                            <h2 className="pl-3 pt-2">Sub - Category
                            </h2>
                        </div>

                        <div className="cus-medium-button-style button-height">
                            <button onClick={
                                    () => {
                                        setIsAddInterest(true);
                                        setCategory_id("");
                                    }
                                }
                                className="btn btn-success mr-2">
                                Add Sub-Category
                            </button>
                        </div>
                    </div>

                    {/* delete model */}
                    <Modal show={show}
                        onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title className="text-danger">Alert!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure to want to delete this category ?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary"
                                onClick={handleClose}>
                                cancel
                            </Button>
                            <Button variant="danger"
                                onClick={
                                    () => {
                                        handleDeleteAnnouncement();
                                    }
                            }>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {/* end delete model */}

                    <DataTable columns={columns}
                        data={filteredInterest}
                        customStyles={customStyles}
                        style={
                            {marginTop: "-3rem"}
                        }
                        progressPending={isLoaderVisible}
                        // progressComponent={
                        //   <Loader type="Puff" color="#334D52" height={30} width={30} />
                        // }
                        highlightOnHover
                        pagination
                        paginationServer
                        paginationTotalRows={count}
                        paginationPerPage={countPerPage}
                        paginationRowsPerPageOptions={
                            [
                                10,
                                20,
                                25,
                                50,
                                100
                            ]
                        }
                        paginationDefaultPage={page}
                        onChangePage={
                            (page) => {
                                setPage(page);
                            }
                        }
                        onChangeRowsPerPage={
                            (rowPerPage) => {
                                setCountPerPage(rowPerPage);
                            }
                        }/>
                </div>
    </div>

    {
    isAddInterest ? (
        <Dialog fullScreen
            open={isAddInterest}
            onClose={handleAddAdminClose}
            TransitionComponent={Transition}>
            <Toolbar>
                <IconButton edge="start" color="inherit"
                    onClick={handleAddAdminClose}
                    aria-label="close">
                    <CloseIcon/>
                </IconButton>
            </Toolbar>
            <List> {
                isAddInterest === true ? (
                    <div className="form ml-30 ">
                        <div className="form-group row">
                            <label className="col-xl-3 col-lg-3 col-form-label">
                                Enter Name
                            </label>
                            <div className="col-lg-9 col-xl-6">
                                <div>
                                    <input type="text"
                                        className={`form-control form-control-lg form-control-solid `}
                                        id="name"
                                        name="name"
                                        value={
                                            inputValueForAdd.name
                                        }
                                        onChange={
                                            (e) => {
                                                handleOnChnageAdd(e);
                                            }
                                        }/>
                                </div>
                            <span style={
                                {
                                    color: "red",
                                    top: "5px",
                                    fontSize: "12px"
                                }
                            }>
                                {
                                errorsForAdd["name"]
                            } </span>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">
                            Description
                        </label>
                        <div className="col-lg-9 col-xl-6">
                            <div>
                                <input type="text"
                                    className={`form-control form-control-lg form-control-solid `}
                                    id="description"
                                    name="description"
                                    value={
                                        inputValueForAdd.description
                                    }
                                    onChange={
                                        (e) => {
                                            handleOnChnageAdd(e);
                                        }
                                    }/>
                            </div>
                        <span style={
                            {
                                color: "red",
                                top: "5px",
                                fontSize: "12px"
                            }
                        }>
                            {
                            errorsForAdd["description"]
                        } </span>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label" for="category_id">
                        Choose Category
                    </label>
                    <div className="col-lg-9 col-xl-6">
                        <select className={`form-control form-control-lg form-control-solid `}
                            name="category_id"
                            id="category_id"
                            value={category_id}
                            onChange={
                                (e) => {
                                    setCategory_id(e.target.value);
                                    setErrorsForAdd({
                                        ...errorsForAdd,
                                        category_id: ""
                                    });
                                }
                        }>
                            <option value="" disabled selected hidden>Select</option>
                            {
                            categoryList ?. length > 0 && categoryList ?. map((item, index) => { // console.log("qqq", item);
                                return (
                                    <option key={index}
                                        value={
                                            item ?. value
                                    }>
                                        {
                                        item ?. label
                                    } </option>
                                );
                            })
                        } </select>
                        <span style={
                            {
                                color: "red",
                                top: "5px",
                                fontSize: "12px"
                            }
                        }>
                            {
                            errorsForAdd["category_id"]
                        } </span>
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
                    {
                    loading ? <button className="btn btn-success mr-2">
                        <span>{
                            isEditApi ? "Edit" : "Add"
                        }
                            Details</span>
                        {
                        loading && (
                            <span className="mx-3 spinner spinner-white"></span>
                        )
                    } </button> : <button onClick={
                            (e) => {
                                {
                                    isEditApi ? handleUpdateInterest(e) : handleAddInterest(e);
                                }
                            }
                        }
                        className="btn btn-success mr-2">
                        <span>{
                            isEditApi ? "Edit" : "Add"
                        }
                            Details</span>
                        {
                        loading && (
                            <span className="mx-3 spinner spinner-white"></span>
                        )
                    } </button>
                } </div>
            </div>
                ) : null
            } </List>
        </Dialog>
    ) : null
}
    <Modal show={approve}
        onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title className="text-success">Alarm!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h6>Are you sure to want to activate this sub-category ?</h6>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary"
                onClick={handleClose}>
                cancel
            </Button>
            <Button variant="success"
                onClick={
                    (e) => {
                        handleApprove(e);
                    }
            }>
                Activate
            </Button>
        </Modal.Footer>
    </Modal>

    <Modal show={decline}
        onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title className="text-danger">Alert!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h6>Are you sure to want to deactivate this sub-category ?</h6>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary"
                onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="danger"
                onClick={
                    (e) => {
                        handleDecline(e);
                    }
            }>
                DeActivate
            </Button>
        </Modal.Footer>
    </Modal>
</>
    );
};

export default SubCategory;
