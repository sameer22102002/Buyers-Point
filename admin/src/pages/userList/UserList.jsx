import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";

export default function UserList() {
  // const [data, setData] = useState(userRows);
  const [data, setData] = useState({});

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await userRequest.get("/users");
        const modifiedData = response.data.map((row) => ({
          id: row._id,
          is_Admin: row.isAdmin ? "Yes" : "No",
          ...row,
        }));

        const calculateTransaction = async () => {
          try {
            const ordersResponse = await userRequest.get("/orders");
            const orders = ordersResponse.data;

            const modifiedDataWithTransaction = modifiedData.map((row) => {
              const userOrders = orders.filter(
                (order) => order.userId === row.id
              );
              const totalTransaction = userOrders.reduce(
                (sum, order) => sum + order.amount,
                0
              );
              return {
                ...row,
                transaction: totalTransaction,
              };
            });

            setData(modifiedDataWithTransaction);
          } catch (error) {
            console.error("Error getting orders:", error);
          }
        };

        calculateTransaction();
      } catch (error) {
        console.error("Error getting users:", error);
      }
    };

    getUsers();
  }, []);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 220,
    },
    {
      field: "user",
      headerName: "User",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={
                "https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600w-418179865.jpg"
              }
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
    {
      field: "is_Admin",
      headerName: "isAdmin",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Net Transaction",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
