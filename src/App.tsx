import "./App.css";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  TableBody,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

const locations = [
  "Library",
  "SAC",
  "Jasper",
];

interface record {
  id: number;
  currentIn: number | null;
  roll_no: string | null;
  name: string | null;
  description: string | null;
  hostel: string | null;
  room_no: string | null;
  mobile_number: string | null;
  status: number | null;
  entry_at: string | null;
  exit_at: string | null;
}

function App() {
  const [value, setValue] = useState<
    string | undefined
  >("");
  const [inputValue, setInputValue] =
    useState("");
  const [records, setRecords] =
    useState<record[]>([]);

  const fetchData = async (
    data: string
  ) => {
    console.log(data);
    try {
      const response = await axios.get(
        "http://localhost:8080/location",
        { params: { location: data } }
      );
      console.log(
        "Fetched location data"
      );
      console.log(response);
      setRecords(response.data);
    } catch (e) {
      console.error(
        "There was an error fetching the location" +
          e
      );
    }
  };

  //handleValue of location after user presses enter.
  const handleValue = async (
    newValue: string | undefined
  ) => {
    setValue(newValue);
    if (newValue == undefined) {
      console.log(
        "The value was undefined"
      );
      return;
    }
    newValue =
      newValue.charAt(0).toUpperCase() +
      newValue.slice(1);
    await fetchData(newValue);
  };
  return (
    <Box
      sx={{
        display: "flex-column",
        padding: "2rem",
        boxSizing: "border-box",
        justifyContent: "space-between",
        width: "100%",
      }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "auto",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}>
        <h1>Admin Panel</h1>
        <Autocomplete
          style={{
            width: "30%",
          }}
          freeSolo
          disableClearable
          value={value}
          onChange={(
            _event: unknown,
            newValue: string | undefined
          ) => {
            handleValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(
            _event,
            newInputValue
          ) => {
            setInputValue(
              newInputValue
            );
          }}
          options={locations.map(
            (location) => {
              return location;
            }
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Locations"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </Box>
      <RecordComponent
        records={records}
      />
    </Box>
  );
}

const RecordComponent = ({
  records,
}: {
  records: record[];
}) => {
  return (
    <TableContainer
      sx={{
        border: 1,
        borderRadius: 2,
        borderColor: "#E0E0E0",
      }}>
      <Table
        stickyHeader
        sx={{
          minWidth: 650,
        }}>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>
              Roll No
            </TableCell>
            <TableCell>
              Mobile Number
            </TableCell>
            <TableCell>
              Room No
            </TableCell>
            <TableCell>
              Hostel
            </TableCell>
            <TableCell>
              Entry at
            </TableCell>
            <TableCell>
              Exit at
            </TableCell>
            <TableCell>
              Description
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => (
            <TableRow
              key={record.id}
              hover>
              <TableCell>
                {record.id}
              </TableCell>
              <TableCell>
                {record.name}
              </TableCell>
              <TableCell>
                {record.roll_no}
              </TableCell>
              <TableCell>
                {record.mobile_number}
              </TableCell>
              <TableCell>
                {record.room_no}
              </TableCell>
              <TableCell>
                {record.hostel}
              </TableCell>
              <TableCell>
                {formatDate(
                  record.entry_at
                )}
              </TableCell>
              <TableCell>
                {formatDate(
                  record.entry_at
                )}
              </TableCell>
              <TableCell>
                {record.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const formatDate = (
  dateString: string | null
) => {
  if (dateString === null) return "";
  const date = new Date(dateString);

  // Format time to HH:MM:SS
  const hours = date
    .getUTCHours()
    .toString()
    .padStart(2, "0");
  const minutes = date
    .getUTCMinutes()
    .toString()
    .padStart(2, "0");
  const seconds = date
    .getUTCSeconds()
    .toString()
    .padStart(2, "0");
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  // Format date to YYYY-MM-DD
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1)
    .toString()
    .padStart(2, "0");
  const day = date
    .getUTCDate()
    .toString()
    .padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  return (
    formattedTime + " " + formattedDate
  );
};

export default App;
