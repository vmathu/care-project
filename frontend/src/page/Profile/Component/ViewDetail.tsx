import React, { useState, useEffect } from "react";
import {
  useMediaQuery,
  useTheme,
  Button,
  Grid,
  Box,
  Divider,
  Rating,
  Typography,
  TextField,
} from "@mui/material";
import {
  CameraAlt as CameraAltIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { AppDispatch } from "libs/redux/store";
import { setToast } from "libs/redux/slice/toastSlice";

import { RatingValues } from "../interface";
import Colors from "../../../libs/ui/color";
import Toast from "libs/ui/components/CustomToast";
import { doPostFile, doPost } from "libs/utils/axios";

function modifyStatusText(text: any) {
  if (typeof text !== "string") {
    return text;
  }
  if (text === "completed") return "Đã xác nhận";
  if (text === "rejected") return "Đã hủy";
  return "Chờ xác nhận";
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function dataCard(isMobile: boolean, data: any) {
  const modifiedData = [
    { title: "Mã đơn hàng", value: data._id },
    { title: "Tên quán", value: data.fullname },
    { title: "Địa chỉ", value: data.address },
    { title: "Thời gian bắt đầu", value: data.time_start },
    { title: "Loại bàn", value: data.type },
    { title: "Liên hệ", value: data.contact },
  ];

  return (
    <Box marginBottom={2}>
      <Grid container columns={{ lg: 9, xs: 4 }}>
        {modifiedData.map((item, index) => (
          <Grid
            container
            columnSpacing={4}
            columns={{ lg: 9, xs: 4 }}
            key={index}
          >
            <Grid item xs={2} lg={2}>
              <Typography style={{ fontWeight: "bold" }}>
                {item.title}
              </Typography>
            </Grid>
            <Grid item xs={2} lg={4}>
              <Typography style={{ textAlign: isMobile ? "right" : "left" }}>
                {item.value}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default function ViewDetail() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [isRatingExist, setIsRatingExist] = useState(true);

  let pathname = window.location.pathname;
  pathname += pathname[pathname.length - 1] === "/" ? "" : "/";
  const detailQuery = pathname.split("/")[3];

  const [ratingValues, setRatingValues] = useState<RatingValues>({
    star: 5,
    comment: "",
    images: [],
  });

  const handleChangeStar = (_: React.SyntheticEvent, value: number | null) => {
    setRatingValues((prevState) =>
      prevState
        ? { ...prevState, star: value || 0 }
        : { star: value || 0, comment: "", images: [] },
    );
  };

  const handleChangeImages = (value: File[]) => {
    setRatingValues((prevState) =>
      prevState
        ? { ...prevState, images: value }
        : { star: 0, comment: "", images: value },
    );
  };

  const handleChangeComment = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRatingValues((prevState) =>
      prevState
        ? { ...prevState, comment: event.target.value }
        : { star: 0, comment: event.target.value, images: [] },
    );
  };

  useEffect(() => {
    const validateRating = async () => {
      const response = await doPost("rating/is-exist", {
        orderId: detailQuery,
      });
      setIsRatingExist(response.data);

      if (response.data) {
        const ratingResponse = await doPost("rating/get-rating", {
          orderId: detailQuery,
        });
        setRatingValues({
          star: ratingResponse.data.rating,
          comment: ratingResponse.data.comment,
          images: ratingResponse.data.file,
        });
      }
    };

    validateRating();
  }, []);

  const data = {
    _id: "1234567",
    fullname: "Quán gần nhà",
    address: "123 Nguyễn Văn A",
    time_start: "2021-10-10 03:00",
    time_end: "2025-10-10 05:00",
    type: "3 người",
    contact: "0123456789",
    status: "completed",
  };

  const expDate = new Date(data.time_end);
  expDate.setDate(expDate.getDate() + 2);
  const currentDate = new Date();
  console.log("Is rating exist: ", isRatingExist);
  return (
    <>
      <Box
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "16px 16px",
        }}
      >
        <Grid item xs={4} lg={12}>
          <Button
            variant="text"
            size="large"
            onClick={() => {
              window.location.href = "/Profile/MyOrder";
            }}
          >
            <KeyboardArrowLeftIcon />
            Trở lại
          </Button>
          <Typography variant="h3" style={{ marginBottom: "1rem" }}>
            Chi tiết đơn hàng
          </Typography>

          {dataCard(isMobile, data)}

          {!isRatingExist && expDate > currentDate && !showRatingForm && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography style={{ color: Colors.black200 }}>
                Đánh giá trải nghiệm tại quán trước{" "}
                {expDate.toLocaleDateString()}
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => setShowRatingForm(true)}
              >
                Đánh giá
              </Button>
            </div>
          )}

          <Box marginTop={2}>
            {(showRatingForm || isRatingExist) && (
              <Box>
                <Divider />
                <Typography variant="h3" style={{ margin: "1rem 0" }}>
                  Đánh giá đơn đặt chỗ
                </Typography>
                <Grid container columns={{ lg: 4, xs: 4 }}>
                  <Typography component="legend">Chất lượng dịch vụ</Typography>
                  <Rating
                    value={ratingValues.star}
                    onChange={handleChangeStar}
                    readOnly={isRatingExist}
                  />
                </Grid>
              </Box>
            )}

            {showRatingForm && (
              <Box
                marginTop={2}
                marginBottom={2}
                padding={2}
                style={{
                  backgroundColor: Colors.black25,
                  borderRadius: "16px",
                }}
              >
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  style={{ backgroundColor: "white" }}
                  value={ratingValues.comment}
                  onChange={handleChangeComment}
                />

                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CameraAltIcon />}
                  style={{ marginTop: "1rem" }}
                >
                  Thêm hình ảnh
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event) => {
                      if (event.target.files) {
                        const newImages = Array.from(event.target.files);
                        if (ratingValues.images.length + newImages.length > 5) {
                          dispatch(
                            setToast({
                              open: true,
                              message: "Chỉ được chọn tối đa 5 ảnh",
                              type: "error",
                            }),
                          );
                        } else {
                          handleChangeImages([
                            ...ratingValues.images,
                            ...newImages,
                          ]);
                        }
                      }
                    }}
                  />
                </Button>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: ratingValues.images.length > 0 ? "1rem" : "0",
                  }}
                >
                  {ratingValues.images.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Selected ${index}`}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        margin: "5px",
                      }}
                    />
                  ))}
                </div>
              </Box>
            )}

            {isRatingExist && (
              <Box>
                <div style={{ margin: "1rem 0" }}>{ratingValues.comment}</div>
                {ratingValues.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:3000/images/${image._id}`}
                    alt={`Image ${index}`}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      margin: "5px",
                    }}
                  />
                ))}
              </Box>
            )}

            {showRatingForm && (
              <Grid container justifyContent="flex-end">
                <Box marginTop={2}>
                  <Button
                    variant="text"
                    size="large"
                    onClick={() => {
                      setShowRatingForm(false);

                      setRatingValues({
                        star: 0,
                        comment: "",
                        images: [],
                      });
                    }}
                  >
                    Hủy
                  </Button>

                  <Button
                    variant="contained"
                    size="large"
                    onClick={async () => {
                      const formData = new FormData();
                      formData.append("star", String(ratingValues.star));
                      formData.append("comment", ratingValues.comment);
                      formData.append("orderId", detailQuery),
                        ratingValues.images.forEach((image, index) => {
                          formData.append("images", image);
                        });

                      try {
                        const response = await doPostFile("rating", formData);

                        if (response.data.status === 200)
                          window.location.reload();
                        else {
                          dispatch(
                            setToast({
                              open: true,
                              message: response.data.message,
                              type: "error",
                            }),
                          );
                        }
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                  >
                    Lưu thay đổi
                  </Button>
                </Box>
              </Grid>
            )}
          </Box>
        </Grid>
      </Box>
      <Toast />
    </>
  );
}
