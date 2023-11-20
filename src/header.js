import { useState } from "react";

import SendButton from "./Button.js";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function HeaderDiv() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [weight, setWeight] = useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    

    return (
        <div className="header">
            <FormControl
                sx={{ m: 0.5, width: "12.5ch", mb: 1, mt: 1.3 }}
                variant="outlined"
                size="small"
            >
                <InputLabel
                    htmlFor="outlined-username"
                    sx={{ fontSize: "14px" }}
                >
                    Name
                </InputLabel>
                <OutlinedInput
                    id="username"
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </FormControl>

            <FormControl
                sx={{ m: 0.5, width: "12.5ch", mb: 1, mt: 1.3 }}
                variant="outlined"
                size="small"
            >
                <InputLabel
                    htmlFor="outlined-password"
                    sx={{ fontSize: "14px" }}
                >
                    Key
                </InputLabel>
                <OutlinedInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormControl>

            <FormControl
                sx={{ m: 0.5, width: "10ch", mb: 1, mt: 1.3 }}
                variant="outlined"
                size="small"
            >
                <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={
                        <InputAdornment
                            position="end"
                            sx={{ fontSize: "14px" }}
                        >
                            kg
                        </InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                        "aria-label": "weight",
                    }}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
            </FormControl>

            <SendButton username={username} password={password} weight={weight} />
        </div>
    );
}
