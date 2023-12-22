import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Skeleton from "@mui/material/Skeleton";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Colors from "../../../libs/ui/color";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  const totalPages = Math.ceil(count / rowsPerPage);
  const pageButtons = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === 2 ||
      i === totalPages - 1 ||
      i === totalPages ||
      i === page ||
      i === page + 1 ||
      i === page + 2
    ) {
      pageButtons.push(
        <IconButton
          key={i}
          onClick={(event) => onPageChange(event, i - 1)}
          disabled={page === i - 1}
        >
          {i}
        </IconButton>,
      );
    } else if (i === page - 1 || i === page + 3) {
      pageButtons.push(
        <IconButton key={i} disabled={true}>
          {"..."}
        </IconButton>,
      );
    }
  }

  return (
    <Box
      sx={{ flexShrink: 0, ml: 2.5 }}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>

      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

interface Row {
  [key: string]: string | number | JSX.Element | Object | undefined;
}

interface TableProps {
  rows: Row[];
}

function modifyStatusText(text: any) {
  if (typeof text !== "string") {
    return text;
  }

  // if (text === 'completed')
  //   return 'Đã xác nhận'

  // if (text === 'rejected')
  //   return 'Đã hủy'

  // return 'Chờ xác nhận'

  if (text === "completed") return <TaskAltIcon />;

  if (text === "rejected") return <HighlightOffIcon />;

  return <RunningWithErrorsIcon />;
}

export default function CustomTableMobile({ rows }: TableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const status =
    typeof Object.values(rows[0])[Object.values(rows[0]).length - 1] ===
    "string";

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let requiredPage = Number(queryParams.get('page')) - 1;

  if (requiredPage === null) requiredPage = 0;
  if (requiredPage < 0) requiredPage = 0;
  if (requiredPage > Math.ceil(rows.length / rowsPerPage) - 1) requiredPage = Math.ceil(rows.length / rowsPerPage) - 1;

  React.useEffect(() => {
    setPage(requiredPage);
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    navigate(`/Profile/MyOrder?page=${newPage + 1}`, { replace: true });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table sx={{ width: "100%" }} aria-label="custom-table">
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row: any, index) => (
            <TableRow
              key={row.id ? row.id : index}
              onClick={() => { 
                if (status) {
                  window.location.href = `/Profile/MyOrder/${row.id}`;
                }
              }}
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                padding: "8px 0px",
                width: "100%",
              }}
            >
              <Box>
                <Skeleton
                  variant="rectangular"
                  width="75px"
                  height="75px"
                  sx={{ bgcolor: Colors.orange100, borderRadius: "4px" }}
                />
              </Box>

              <Box sx={{ width: "calc(100vw - 12.375rem)" }}>
                <Box
                  sx={{
                    fontWeight: "bold",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    textAlign: "left",
                  }}
                >
                  {row.fullname}
                </Box>
                {Object.entries(row)
                  .filter(([key]) => key !== "fullname")
                  .slice(0, -1)
                  .map(([key, value], i) => (
                    <Box
                      sx={{
                        color: Colors.black200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "left",
                      }}
                    >
                      {`${value}`}
                    </Box>
                  ))}
              </Box>
              <Box
                sx={{
                  color: status
                    ? row.status === "rejected"
                      ? Colors.error
                      : row.status === "completed"
                        ? Colors.success
                        : Colors.warning
                    : Colors.black200,
                }}
              >
                {modifyStatusText(
                  Object.entries(row).slice(-1)[0][1] as React.ReactNode,
                )}
              </Box>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={1} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[]}
              colSpan={1}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              ActionsComponent={TablePaginationActions}
              labelDisplayedRows={() => ""}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
