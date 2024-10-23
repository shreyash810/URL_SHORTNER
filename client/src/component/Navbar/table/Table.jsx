/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import customstyle from "./CustomeStyle";
import axios from "axios";
import Popup from "reactjs-popup";
import Cookies from "js-cookie";

function Table({ handelDelete }) {
  const [data, setData] = useState([]);
  const [expandedRow, SetExpandedRow] = useState([]);
  const [qrcode, setqrcode] = useState("");
  const [open, setOpen] = useState(false);

  const closePopup = () => {
    setOpen(false);
    setqrcode("");
  };

  // Function to toggle between truncated and full text

  const toggleRow = (rowId) => 
    const isRowExpanded = expandedRow.includes(rowId);

    if (isRowExpanded) {
      SetExpandedRow(expandedRow.filter((id) => id !== rowId));
    } else {
      SetExpandedRow([...expandedRow, rowId]);
    }
  };

  const dispalyQrcode = (rowid) => {
    setqrcode(rowid);
  };
  useEffect(() => {
    const config = {
      headers: { "content-type": "application/json" },
      withCredentials: true,
    };
    async function fetchall() {
      axios
        .get("https://url-shortnerapi-git-main-sams-projects-daccedfc.vercel.app/all", config)
        .then((response) => {
          setData(response.data.Data);
        })
        .catch((e) => {
          if (e.response.data.msg === "token exp") {
            Cookies.remove("uuid");
          }
          console.log();
        });
    }
    fetchall();
  }, [data, handelDelete]);

    console.log(data);
  const coloum = [
    {
      name: "Short Link",
      selector: (row) => <p>http://localhost:8000/{row._doc.shortId}</p>,
      sortable: true,
      fixed: true,
      grow: 2,
    },
    {
      name: "Original Link",
      cell: (row) => (
        <div onClick={() => toggleRow(row._doc._id)}>
          {expandedRow.includes(row._doc._id)
            ? row._doc.redirectUrl
            : row._doc.redirectUrl?.slice(0, 20) + "..."}
        </div>
      ),
      sortable: true,
      hide: "md",
    },
    {
      name: "QR Code",
      selector: (row) => (
        <div
          onClick={() => {
            dispalyQrcode(row.qrcode);
            setOpen(true);
          }}
        >
          <img src={row.qrcode} alt="qr img" className="w-[4vw] h-auto p-2" />
        </div>
      ),
      sortable: true,
      fixed: true,
      hide: "md",
    },
    {
      name: "Click",
      selector: (row) => row._doc.NumOfvisit.length,
      sortable: true,
      fixed: true,
      hide: "md",
    },
    {
      name: "Status",
      selector: (row) => (
        <span className="text-green-500">{row._doc.status}</span>
      ),
      sortable: true,
      fixed: true,
      hide: "md",
    },
    {
      name: "Date",

      selector: (row) => row._doc.createdAt.split("T")[0],
      sortable: true,
      fixed: true,
    },
    {
      name: "Delet",

      selector: (row) => (
        <div
          onClick={() => {
            handelDelete(row._doc._id);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-red-500"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ),
      sortable: true,
      fixed: true,
    },
  ];

  return (
    <>
      <div className="p-5 mt-10 w-full cursor-pointer">
        <DataTable
          columns={coloum}
          data={data}
          customStyles={customstyle}
        ></DataTable>
        <Popup open={open} closeOnDocumentClick onClose={closePopup}>
          <div className="cursor-pointer bg-white rounded mt-[10vw]  w-[20vw] h-[15vw]">
            <div className="flex justify-between ">
              <h1 className="p-2 font-bold">QRCODE</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10 text-indigo-500 p-2"
                onClick={closePopup}
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="model text-white  rounded  flex justify-center items-center">
              <img src={qrcode} />
            </div>
          </div>
        </Popup>
      </div>
    </>
  );
}

export default Table;
