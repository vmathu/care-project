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

import { alpha } from "@mui/system";
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
      {pageButtons}
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
  headers: string[];
}

function modifyStatusText(text: any) {
  if (typeof text !== "string") {
    return text;
  }

  if (text === "completed") return "Đã xác nhận";

  if (text === "rejected") return "Đã hủy";

  return "Chờ xác nhận";
}

export default function CustomTableDesktop({ rows, headers }: TableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const status =
    typeof Object.values(rows[0])[Object.values(rows[0]).length - 1] ===
    "string";

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} aria-label="custom-table">
        <TableRow>
          {headers.map((header, index) => (
            <TableCell
              key={index}
              align="center"
              sx={{ color: Colors.black500, fontWeight: "bold" }}
            >
              {header}
            </TableCell>
          ))}
        </TableRow>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row: any) => (
            <TableRow
              key={row.id}
              sx={{
                "& .MuiTableCell-root": {
                  borderBottom: 0,
                },
                "&:hover": {
                  backgroundColor: Colors.black50,
                },
                "&:hover .MuiTableCell-root": {
                  color: Colors.black500,
                },
                "&:hover .MuiTableCell-root:last-child": {
                  color: status
                    ? alpha(
                        row.status === "rejected"
                          ? Colors.error
                          : row.status === "completed"
                            ? Colors.success
                            : Colors.warning,
                        1,
                      )
                    : Colors.error,
                },
              }}
            >
              {headers.map((header, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{
                    color:
                      index === headers.length - 1 && row.status && status
                        ? row.status === "rejected"
                          ? alpha(Colors.error, 0.65)
                          : row.status === "completed"
                            ? alpha(Colors.success, 0.65)
                            : alpha(Colors.warning, 0.65)
                        : Colors.black200,
                  }}
                >
                  {index === Object.entries(row).length - 1
                    ? modifyStatusText(Object.values(row)[index])
                    : (Object.values(row)[index] as React.ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[]}
              colSpan={4}
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
