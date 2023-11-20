import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

export default function SendButton({username, password, weight}) {
    function postData() {
        const url = "https://35.197.207.152:5000/set_weight";
        const data = {
            username: username,
            password: password,
            weight: weight
        };

        console.log(username, password, weight)

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Set the content type to JSON
            },
            body: JSON.stringify(data), // Convert the data object to a JSON string
        })
            .then((response) => response.json()) // Parse the response as JSON
            .then((responseData) => {
                // Handle the response data
                console.log(responseData);
            })
            .catch((error) => {
                // Handle any errors
                console.error("Error:", error);
            });
    }

    return (
        <Button
            variant="contained"
            size="small"
            sx={{ m: 0.5, minWidth: "5ch", width: "5ch", mb: 1, mt: 1.3 }}
            onClick={()=>postData()}
        >
            <SendIcon sx={{ transform: "scale(0.8)" }} />
        </Button>
    );
}
