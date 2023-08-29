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
  currentIn: number;
  roll_no: string;
  name: string;
  description: string;
  hostel: string;
  room_no: string;
  mobile_number: string;
  status: number;
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
      setRecords(response.data);
    } catch (e) {
      console.error(
        "There was an error fetching the location" +
          e
      );
    }
  };

  //handleValue after user presses enter.
  const handleValue = async (
    newValue: string | undefined
  ) => {
    setValue(newValue);
    newValue = newValue?.toUpperCase();
    if (newValue == undefined) {
      console.log(
        "The value was undefined"
      );
      return;
    }
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
                {record.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default App;
