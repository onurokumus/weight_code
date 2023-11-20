import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function StickyHeadTable() {
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);

    const getColumns = (rows) => {
        let formattedColumns = [];

        if (rows.length > 0) {
            let columnNames = Object.keys(rows[0]);

            for (let columnName of columnNames) {
                let currentColumn = {};
                if (columnName === "Date") {
                    currentColumn = {
                        id: columnName,
                        label: columnName,
                        minWidth: 50,
                        align: "left",
                    };
                } else {
                    currentColumn = {
                        id: columnName,
                        label: columnName,
                        minWidth: 50,
                        align: "center",
                        format: (value) => value.toFixed(1),
                    };
                }

                formattedColumns.push(currentColumn);
            }
            return formattedColumns;
        } else {
            return [];
        }
    };

    useEffect(() => {
        const fetchData = () => {
            // Make an API request to your backend here and update the state with the fetched data
            fetch("https://35.197.207.152:5000/get_table_data")
                .then((response) => response.json())
                .then((rows) => {
                    setColumns(getColumns(rows));
                    setRows(rows.reverse());
                })
                .catch((error) => console.error("Error fetching data:", error));
        };

        // Fetch data initially when the component mounts
        fetchData();

        // Set up an interval to fetch data every 5 seconds (for example)
        const intervalId = setInterval(fetchData, 10000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: "43vh" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    sx={{ fontSize: 16 }}
                                    size="small"
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.Date}
                                >
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                sx={{ fontSize: 12 }}
                                                style={{ width: "10%" }}
                                                size="small"
                                            >
                                                {column.format &&
                                                typeof value === "number"
                                                    ? column.format(value)
                                                    : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
