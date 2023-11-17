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
import { baseUrl } from "./api/baseUrl.js";

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
  const [
    number_of_students_present,
    set_number_of_students_present,
  ] = useState<number>(0);

  const fetchData = async (
    data: string
  ) => {
    console.log(data);
    try {
      const response = await axios.get(
        `${baseUrl}/location`,
        { params: { location: data } }
      );
      console.log(
        "Fetched location data"
      );
      console.log(response);
      setRecords(response.data);
      const total_students_present =
        response.data.reduce(
          (
            accumulator: number,
            current: record
          ) => {
            if (current.status == 1) {
              return accumulator + 1;
            }
            return accumulator;
          },
          0
        );
      set_number_of_students_present(
        total_students_present
      );
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
        <Box
          sx={{
            fontFamily: "Poppins",
            fontSize: 32,
          }}>
          Admin Panel
        </Box>
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
      <Box
        sx={{
          fontFamily: "Poppins",
          fontSize: 24,
          border: 2,
          borderColor: "lightgrey",
          wordWrap: "normal",
          marginTop: 10,
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 10,
          padding: 5,
          borderRadius: 10,
        }}>
        {number_of_students_present > 0
          ? `${number_of_students_present} student${
              number_of_students_present >
              1
                ? "s"
                : ""
            } present`
          : "Currently there is no student inside the location"}
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
          fontFamily: "Poppins",
        }}>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontFamily: "Poppins",
              }}>
              Id
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Poppins",
              }}>
              Name
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Poppins",
              }}>
              Roll No
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Poppins",
              }}>
              Mobile Number
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Poppins",
              }}>
              Room No
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Poppins",
              }}>
              Hostel
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Poppins",
              }}>
              Entry at
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Poppins",
              }}>
              Exit at
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Poppins",
              }}>
              Description
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => (
            <TableRow
              key={record.id}
              hover>
              <TableCell
                sx={{
                  fontFamily: "Poppins",
                }}>
                {record.id}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Poppins",
                }}>
                {record.name}
              </TableCell>
              <TableCell>
                {record.roll_no}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Poppins",
                }}>
                {record.mobile_number}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Poppins",
                }}>
                {record.room_no}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Poppins",
                }}>
                {record.hostel}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Poppins",
                }}>
                {formatDate(
                  record.entry_at
                )}
              </TableCell>
              <TableCell>
                {formatDate(
                  record.entry_at
                )}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Poppins",
                }}>
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
