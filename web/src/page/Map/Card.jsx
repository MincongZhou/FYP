import * as React from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Rating,
} from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import fetch from "../../fetch";
import NewMap from "../../component/NewMap";
import Alert from "../../component/Alert";
import { red } from "@mui/material/colors";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./card.scss";
import { useEffect } from "react";
import { useState } from "react";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const MyCarousel = ({ images }) => {
  return (
    <Slider {...settings}>
      {images.map((img, i) => (
        <div key={i}>
          <img src={img} alt={img} />
        </div>
      ))}
    </Slider>
  );
};

// Review list component
function ReviewList({ reviews, reveinfos }) {
  return (
    <div style={{ marginTop: "20px" }}>
      {(reviews || []).map((review, index) => (
        <Card key={review.id} style={{ marginTop: "20px" }}>
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: red[500] }}
                alt={reveinfos[index]?.name}
                aria-label="recipe"
                src={"few"}
              />
            }
            title={review.user_name}
            subheader={
              <>
                <Rating
                  name="review_rating"
                  value={review.star}
                  precision={0.5}
                  size="small"
                  readOnly
                  style={{ marginRight: "10px" }}
                />
                {new Date(review.updated_at).toLocaleDateString()}
              </>
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {review.comment}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// main component
export default function RecipeReviewCard(props) {
  const history = useNavigate();
  const message = React.useMemo(() => props.message || {}, [props.message]);
  const [reveinfos, setReveInfos] = useState(
    new Array((message.reserve || []).length).fill(null)
  );

  var userInfo = {};
  try {
    userInfo = JSON.parse(sessionStorage.userInfo);
  } catch (error) {}

  const [info, setInfo] = useState({});
  const [isFavorite, setIsFavorite] = useState({});
  const [reviews, setReviews] = useState([]);
  const [indexFa, setIndexFa] = useState(0);
  // pay function
  function Pay() {
    sessionStorage.seconds = "";
    if (!sessionStorage.userInfo) {
      Alert("not log");
      history("/login");
      return;
    }
    if (JSON.parse(sessionStorage.userInfo).id == message.user_id) {
      return Alert("You can't reserve your own parking space");
    }
    var mess = JSON.parse(JSON.stringify(message));
    mess.info = info;
    sessionStorage.item = JSON.stringify(mess);
    history("/pay");
  }

  function copyCode() {
    const href =
      window.location.href + `?lat=${message.lat}&lng=${message.lng}`;
    var item = new ClipboardItem({
      "text/plain": new Blob([href], { type: "text/plain" }),
    });
    navigator.clipboard.write([item]);
    Alert("Copy successfully, paste and share");
  }

  // favorite function
  function favoriteLink() {
    if (isFavorite) {
      fetch(
        `/favorite/${message.id}`,
        {
          method: "DELETE",
        },
        (res) => {
          setIndexFa((res) => res + 1);
        }
      );
      return;
    }
    if (!userInfo.id) {
      return "no login";
    }
    const data = {
      user_id: userInfo.id,
      parking_id: message.id,
    };

    fetch(
      `/favorite`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      (res) => {
        setIndexFa((res) => res + 1);
      }
    );
  }
  useEffect(() => {
    fetch(`/user/${message.user_id}`, {}, (res) => {
      setInfo(res.data);
    });
    setReviews(message.reserve.filter((item) => item.comment));
    message.reserve
      .filter((item) => item.comment)
      .map((item, index) => {
        fetch(`/user/${item.user_id}`, {}, (res) => {
          var data = reveinfos;
          data[index] = res.data;
          setReveInfos(data);
        });
      });
  }, [message]);

  useEffect(() => {
    fetch(`favorite?id=${userInfo.id}`, {}, (res) => {
      setIsFavorite(!!res.data.find((item) => item.parkingId === message.id));
    });
  }, [indexFa, message]);

  return (
    <div>
      {message.name && (
        <Card>
          <div>
            <div className="card-gb">
              <ClearIcon onClick={props.clear}></ClearIcon>
            </div>
            <CardHeader
              avatar={
                <Avatar
                  alt={info.name}
                  src={info.avatar}
                  sx={{ bgcolor: red[500] }}
                  aria-label="recipe"
                >
                  {info?.name && info?.name[0]}
                </Avatar>
              }
              title={info?.name}
              subheader={info?.intro}
            />
          </div>
          <MyCarousel images={message.images}></MyCarousel>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <p style={{ fontSize: "24px", color: "#333" }}>{message.name}</p>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <p style={{ color: "rgb(64 105 227)", marginTop: "7px" }}>
                Description
              </p>
              {message.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <p style={{ color: "rgb(64 105 227)", marginTop: "7px" }}>
                Address
              </p>
              {message.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <p style={{ color: "rgb(64 105 227)", marginTop: "7px" }}>time</p>
              {moment(message.start_time.split(".")[0]).format(
                "YYYY-MM-DD HH:mm:ss"
              )}{" "}
              -{" "}
              {moment(message.end_time.split(".")[0]).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <p style={{ color: "rgb(64 105 227)", marginTop: "7px" }}>size</p>
              {message.size}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <p style={{ color: "rgb(64 105 227)", marginTop: "7px" }}>
                standard
              </p>
              {message.standard}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <div className="typo-newMap">
                <NewMap
                  lng={message.lng}
                  lat={message.lat}
                  onClick={() => {}}
                ></NewMap>
              </div>
            </Typography>
          </CardContent>
          <CardActions disableSpacing style={{ float: "right" }}>
            <Button onClick={favoriteLink} size="small" color="primary">
              {isFavorite ? "Collected" : "Collect"}
            </Button>
            <Button onClick={Pay} size="small" color="primary">
              Book
            </Button>
          </CardActions>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <h4>Reviews</h4>
              <ReviewList reviews={reviews} reveinfos={reveinfos} />
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
