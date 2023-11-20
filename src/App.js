import logo from "./logo.svg";
import "./App.css";

import StickyHeadTable from "./table.js";
import BasicLineChart from "./plot.js";
import HeaderDiv from "./header.js";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import * as React from "react";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className="App">

                <HeaderDiv/>

                <div className="body">
                    <div className="weight-plot">
                        <BasicLineChart />
                    </div>

                    <div className="weight-table">
                        <StickyHeadTable />
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;
