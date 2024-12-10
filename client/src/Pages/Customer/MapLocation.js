import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import debounce from "lodash.debounce";
import "../../App.css";
import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
} from "react-map-gl";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Rating, Tab, Tabs } from "@mui/material";
import Header from "../../Layouts/Header";
import Button from "../../Components/Button";
import NavTravel from "../../Layouts/Home/NavTravel";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { useLocation } from "react-router-dom";
import { getApi } from "../../API/GetApi";
import image_not_found from "../../Assets/Images/image-not-found.png";
import { motion } from "framer-motion";
import Footer from "../../Layouts/Footer";
import ModalAdmin from "../../Configs/ModalAdmin";
import ReviewRestaurant from "../../Layouts/Review/ReviewRestaurant";
import Star from "../../Components/Star";
import SliderImages from "../../Components/SliderImages";

const REACT_APP_MAPBOX_TOKEN =
  "pk.eyJ1IjoiaGhvYWkxMTA0MSIsImEiOiJjbTFxODA2eXUwYjgxMmpyOGM3MjB0d2x1In0.YReiikKlMSIx5ssZll0pNg";

const MapLocation = () => {
  const mapRef = useRef();
  const location = useLocation();
  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const { selectedMarker: initialSelectedMarker } = location.state || {};
  const [selectedMarker, setSelectedMarker] = useState(
    initialSelectedMarker || null
  );
  const [showDirections, setShowDirections] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Điểm du lịch");
  const [showMarkers, setShowMarkers] = useState(true);
  const [viewport, setViewport] = useState({
    latitude: 21.028511,
    longitude: 105.804817,
    zoom: 10,
    width: "100%",
    height: "100%",
  });

  const [modalRestaurant, setModalRestaurant] = useState(false);
  const [renderUI, setRenderUI] = useState(false);
  const directionsControl = useRef(null);

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [locations]);

  useEffect(() => {
    if (initialSelectedMarker) {
      const delay = 2000;
      setTimeout(() => {
        setSelectedMarker(initialSelectedMarker);
        setViewport({
          latitude: initialSelectedMarker.location.coordinates[1],
          longitude: initialSelectedMarker.location.coordinates[0],
          zoom: 15,
          width: "100%",
          height: "100%",
        });
      }, delay);
    }
  }, [initialSelectedMarker]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        if (initialSelectedMarker) {
          setViewport((prev) => ({
            ...prev,
            latitude: initialSelectedMarker.location.coordinates[1],
            longitude: initialSelectedMarker.location.coordinates[0],
            zoom: 15,
          }));
        } else {
          setViewport((prevViewport) => ({
            ...prevViewport,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 15,
          }));
        }
      },
      (error) => console.error("Error getting geolocation: ", error),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, [initialSelectedMarker]);

  const handleMapLoad = () => {
    setIsMapLoaded(true);
    console.log("Map loaded successfully!");
  };

  const handleShowDirections = () => {
  if (
    userLocation &&
    selectedMarker &&
    userLocation.latitude &&
    userLocation.longitude &&
    selectedMarker.location.coordinates
  ) {
    setShowDirections(true);

    if (mapRef.current) {
      const map = mapRef.current.getMap();

      // Nếu đã tồn tại Directions Control, xóa nó trước
      if (directionsControl.current) {
        map.removeControl(directionsControl.current);
        directionsControl.current = null; // Reset control
      }

      // Tạo và thêm Directions Control mới
      const directions = new MapboxDirections({
        accessToken: REACT_APP_MAPBOX_TOKEN,
        unit: "metric",
        profile: "mapbox/driving",
      });

      directionsControl.current = directions; // Lưu tham chiếu
      map.addControl(directions, "top-right");

      // Thiết lập điểm đi và điểm đến
      directions.setOrigin([userLocation.longitude, userLocation.latitude]);
      directions.setDestination([
        selectedMarker.location.coordinates[0],
        selectedMarker.location.coordinates[1],
      ]);
    }
  } else {
    console.error("Missing user location or selected marker");
  }
};

  const handleClosePopup = () => {
  setSelectedMarker(null);
  setShowDirections(false);

  if (mapRef.current && directionsControl.current) {
    const map = mapRef.current.getMap();
    map.removeControl(directionsControl.current);
    directionsControl.current = null; // Reset control reference
  }
};

  const filteredPlaces = useMemo(() => {
    if (selectedCategory === "Tất cả") {
      return locations;
    }
    return locations.filter((place) => place.category === selectedCategory);
  }, [locations, selectedCategory]);

  const handleButtonClick = (category) => {
    setSelectedCategory(category);
  };

  // useEffect(() => {
  //   console.log("Filtered places: ", filteredPlaces);
  // }, [filteredPlaces]);

  const handleMarkerClick = (place) => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();

      const existingDirections = map._controls.find(
        (control) => control.constructor.name === "MapboxDirections"
      );
      if (existingDirections) {
        map.removeControl(existingDirections);
      }
    }

    setShowDirections(false);
    setSelectedMarker(place);
  };

  const getViewportBounds = () => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      const bounds = map.getBounds();
      return {
        sw_lat: bounds.getSouthWest().lat,
        sw_lng: bounds.getSouthWest().lng,
        ne_lat: bounds.getNorthEast().lat,
        ne_lng: bounds.getNorthEast().lng,
      };
    }
    return null;
  };

  const getLocationsInViewport = useCallback(
    debounce(() => {
      const bounds = getViewportBounds();
      if (bounds) {
        getApi.apiGetLocationViewport(
          (data) => {
            // console.log("API Response:", data);
            setLocations(data);
          },
          bounds.sw_lat,
          bounds.sw_lng,
          bounds.ne_lat,
          bounds.ne_lng
        );
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      const onMoveHandler = () => {
        getLocationsInViewport();
      };
      map.on("move", onMoveHandler);
      return () => {
        map.off("move", onMoveHandler);
      };
    }
  }, [viewport]);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      map.once("load", () => {
        getLocationsInViewport();
      });
    }
  }, []);

  const MemoizedMarker = React.memo(({ place, onClick }) => {
    return (
      <Marker
        latitude={place.location.coordinates[1]}
        longitude={place.location.coordinates[0]}
      >
        <LocationOnIcon
          onClick={() => onClick(place)}
          sx={{ fontSize: "2rem", color: "red", cursor: "pointer" }}
        />
      </Marker>
    );
  });


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div>
        {/* <Header /> */}
        <NavTravel />
        <div className="screenLarge:mt-[130px] desktop:mt-[130px] laptop:mt-[130px] tablet:mt-[130px] mobile:mt-[150px] h-[100vh] w-[100%] relative flex items-center justify-center">
          <div>
            <ModalAdmin
              openModal={modalRestaurant}
              isIconClose={true}
              setOpenModal={setModalRestaurant}
              children={
                <div className="h-full overflow-y-scroll reviewRestaurant">
                  <div className="relative">
                    {selectedMarker?.images ? (
                      <SliderImages
                        slides={selectedMarker?.images}
                        height="screenLarge:h-[35vh] desktop:h-[30vh] laptop:h-[30vh]  w-full object-cover rounded-none"
                      />
                    ) : (
                      <p>No images available.</p>
                    )}
                  </div>

                  <h2 className="text-xl font-semibold h-[90px] leading-[90px] sticky top-0 text-center bg-white z-10">
                    {selectedMarker?.name}
                  </h2>
                  <div className="px-7">
                    <div className="flex items-center justify-center space-x-2 text-gray-500 mb-4">
                      <LocationOnIcon />
                      <p className="">
                        {selectedMarker?.location?.address ||
                          "Địa chỉ không có sẵn"}
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                      <Star value={selectedMarker?.rating}></Star>
                      <strong>{selectedMarker?.rating?.toFixed(1)}</strong>
                      <p>({selectedMarker?.rating_count} lượt đánh giá)</p>
                    </div>
                    <div className="mt-4">
                      <Box sx={{ width: "100%" }}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                          >
                            <Tab label="Tổng quan" {...a11yProps(0)} />
                            <Tab label="Đánh giá" {...a11yProps(1)} />
                          </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                          <p className="text-justify leading-8">
                            {selectedMarker?.description}
                          </p>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                          <ReviewRestaurant
                            slug={selectedMarker?.name}
                            restaurantId={selectedMarker?.id}
                            setRender={setRenderUI}
                            render={renderUI}
                          ></ReviewRestaurant>
                        </CustomTabPanel>
                      </Box>
                    </div>
                  </div>
                </div>
              }
              overlayOpacity="bg-opacity-70"
              className="screenLarge:w-[30%] desktop:w-[40%] laptop:w-[70%] tablet:w-[80%] mobile:w-[95%] bg-white rounded-md h-[95vh]"
            />
          </div>

          <ReactMapGL
            {...viewport}
            ref={mapRef}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={REACT_APP_MAPBOX_TOKEN}
            onMove={(evt) => setViewport(evt.viewState)}
            // onMove={handleViewportChange}
            onLoad={() => getLocationsInViewport()}
            className="absolute"
          >
            <NavigationControl position="top-left" />
            <GeolocateControl
              position="top-left"
              trackUserLocation={true}
              showUserLocation={true}
            />

            <div className="absolute top-4 left-12 space-x-4 flex flex-row">
              {["Tất cả", "Khách sạn", "Điểm du lịch", "Nhà hàng"].map(
                (category) => (
                  <button
                    key={category}
                    className={`p-2 rounded shadow cursor-pointer ${
                      selectedCategory === category
                        ? "bg-orange-500 text-white" // Màu cam khi được chọn
                        : "bg-white text-black" // Màu mặc định
                    }`}
                    onClick={() => handleButtonClick(category)}
                  >
                    {category}
                  </button>
                )
              )}

              <button
                className={`p-2 rounded shadow cursor-pointer ${
                  showMarkers ? "bg-red-500 text-white" : "bg-white text-black"
                }`}
                onClick={() => setShowMarkers((prev) => !prev)}
              >
                {showMarkers ? "Tắt Marker" : "Bật Marker"}
              </button>
            </div>

            {showMarkers &&
              filteredPlaces
                .filter((place) => place.location && place.location.coordinates) // Chỉ lọc các place có đầy đủ thông tin location
                .map((place) => (
                  <MemoizedMarker
                    key={place._id}
                    place={place}
                    onClick={handleMarkerClick}
                  />
                ))}

            {selectedMarker && (
              <Popup
                latitude={selectedMarker.location.coordinates[1]}
                longitude={selectedMarker.location.coordinates[0]}
                // onClose={handleClosePopup}
                closeOnClick={false}
                anchor="top"
                closeButton={false}
                className="mt-3"
              >
                <div className="mt-[10px] dark:text-black">  

                  <button
                    onClick={handleClosePopup}
                    className="text-red-500 font-bold px-2 py-1 rounded hover:bg-gray-200"
                  >
                    X
                  </button>
                  
                  <h2 className="screenLarge:text-lg desktop:text-lg laptop:text-lg font-semibold text-center">
                    {selectedMarker?.name || "No name available"}
                  </h2>

                  {selectedMarker?.category === "Khách sạn" ? (
                    <img
                      src={selectedMarker?.image
                        .replace("url('", "")
                        .replace("')", "")}
                      alt={selectedMarker?.name || "No name available"}
                      className="screenLarge:h-1/2 desktop:h-[30%] laptop:h-[30%] mobile:h-[100px] mobile:w-[100%] object-cover w-full mt-2 rounded-sm"
                      loading="lazy"
                    />
                  ) : selectedMarker?.images &&
                    selectedMarker.images.length > 0 ? (
                    <img
                      src={selectedMarker?.images[0] || image_not_found}
                      alt={selectedMarker?.name || "No name available"}
                      className="screenLarge:h-1/2 desktop:h-[200px] laptop:h-[200px] mobile:h-[100px] mobile:w-[100%]  screenLarge:w-full desktop:w-full laptop:w-full object-cover mt-2 rounded-sm"
                    />
                  ) : null}

                  <div>
                    <div className="mt-2 flex items-center gap-4">
                      <Rating
                        name="read-only"
                        value={
                          selectedMarker?.stars || selectedMarker?.rating || 0
                        }
                        precision={0.5}
                        readOnly
                        sx={{ fontSize: 20 }}
                      />
                      <p className="text-lg text-gray-500">
                        {selectedMarker?.stars?.toFixed(1) ||
                          selectedMarker?.rating?.toFixed(1) ||
                          0}
                      </p>
                    </div>

                    <p className="text-sm text-gray-500">
                      (
                      {selectedMarker?.numberOfReview ||
                        selectedMarker?.rating_count ||
                        0}{" "}
                      lượt đánh giá)
                    </p>
                  </div>
                  <p className="mt-2">
                    {selectedMarker.location.address || "No address available"}
                  </p>
                  <div className="flex justify-between text-white font-semibold mt-2 gap-4">
                    <div className="w-1/2">
                      {selectedMarker.category === "Điểm du lịch" ? (
                        <Button
                          to={`/destination/detail/${encodeURIComponent(
                            selectedMarker.name.replace(/\s+/g, "-")
                          )}`}
                          className="py-2 bg-bgPrimary rounded"
                        >
                          Xem chi tiết
                        </Button>
                      ) : selectedMarker.category === "Khách sạn" ? (
                        <Button
                          to={`/hotel/${selectedMarker.hotelSlug}/${selectedMarker.name}`}
                          className="py-2 bg-bgPrimary rounded"
                        >
                          Xem chi tiết
                        </Button>
                      ) : (
                        <Button
                          className="py-2 bg-bgPrimary rounded"
                          onClick={() => setModalRestaurant(true)}
                        >
                          Xem chi tiết
                        </Button>
                      )}
                    </div>

                    <div className="w-1/2">
                      <Button
                        className="p-2 bg-[#2563EB] rounded"
                        onClick={handleShowDirections}
                      >
                        Đường đi
                      </Button>
                    </div>
                  </div>
                </div>
              </Popup>
            )}
          </ReactMapGL>
        </div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default MapLocation;
