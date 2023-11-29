import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "libs/redux/store";
import { setToast } from "libs/redux/slice/toastSlice";
import Snackbar from "@mui/material/Snackbar";
import ToastMessageWrapper from "./ToastMessageWrapper";

const Toast = () => {
  const toast = useSelector((state: RootState) => state.toastReducer);
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => {
    dispatch(setToast({ ...toast, open: false }));
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={toast.open}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <div>
        <ToastMessageWrapper
          onClose={handleClose}
          variant={toast.type}
          message={toast.message}
          title={toast.title}
        />
      </div>
    </Snackbar>
  );
};

export default Toast;
