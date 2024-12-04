import { Box, CircularProgress, Skeleton } from "@mui/material";

export const loadingApp = {
  loadingCircle: (className) => {
    return (
      <div className={className}>
        <Box sx={{ display: "flex" }}>
          <CircularProgress color="warning" />
        </Box>
      </div>
    );
  },
  skeletonItemFood: () => {
    return (
      <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-3 screenLarge:grid-cols-3 gap-7">
        {Array.from(new Array(6)).map((_, index) => (
          <div
            key={index}
            className="relative shadow-lg rounded-lg overflow-hidden pb-3 cursor-pointer"
          >
            <Skeleton variant="rectangular" height={170} />
            <div className="w-full h-[170px] bg-black absolute top-0 opacity-20"></div>
            <div className="absolute top-1 right-2 z-10">
              <Skeleton variant="circular" width={30} height={30} />
            </div>
            <div className="p-2">
              <Skeleton variant="text" height={30} width="80%" />
              <Skeleton variant="text" height={20} width="90%" />
              <Skeleton variant="text" height={20} width="80%" />
              <div className="flex items-center justify-between mt-2">
                <Skeleton variant="text" height={20} width="40%" />
                <Skeleton variant="text" height={20} width="20%" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  },

  skeletonFoodRegion: () => {
    return (
      <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 screenLarge:grid-cols-5 gap-7">
        {Array.from(new Array(5)).map((_, index) => (
          <div
            key={index}
            className="relative shadow-lg rounded-lg overflow-hidden pb-3 cursor-pointer"
          >
            <Skeleton variant="rectangular" height={170} />
            <div className="w-full h-[170px] bg-black absolute top-0 opacity-20"></div>
            <div className="absolute top-1 right-2 z-10">
              <Skeleton variant="circular" width={30} height={30} />
            </div>
            <div className="p-2">
              <Skeleton variant="text" height={30} width="80%" />
              <Skeleton variant="text" height={20} width="90%" />
              <Skeleton variant="text" height={20} width="80%" />
              <div className="flex items-center justify-between mt-2">
                <Skeleton variant="text" height={20} width="40%" />
                <Skeleton variant="text" height={20} width="20%" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  },

  skeletonNewsAndEvent: () => {
    return (
      <div className="shadow-lg p-4 border rounded-md overflow-hidden h-[400px] animate-pulse">
        <Skeleton variant="rectangular" height="60%" className="rounded-lg" />
        <Skeleton variant="text" height={40} className="mt-3" />
        <Skeleton variant="text" height={20} className="my-1 mb-2" />
        <Skeleton variant="text" height={60} className="line-clamp-2 mt-1" />
      </div>
    );
  },

  skeletonTravelThroughPictures: () => {
    return (
      <div className="shadow-lg p-4 border rounded-md overflow-hidden h-[380px]">
        <Skeleton variant="rectangular" height="70%" className="rounded-lg" />
        <Skeleton variant="text" height={40} className="mt-3" />
        <Skeleton variant="text" height={20} className="my-1" />
      </div>
    );
  },

  skeletonLatestNews: () => {
    return (
      <div className="flex justify-between gap-6">
        <div className="w-[40%] shadow-lg p-4 rounded-md h-[75vh] overflow-hidden animate-pulse">
          <Skeleton
            variant="rectangular"
            height="57vh"
            className="rounded-lg"
          />
          <Skeleton variant="text" height={30} className="mt-2" />
          <Skeleton variant="text" height={20} className="mt-2" />
        </div>
        <div className="w-[60%] h-[75vh] grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="shadow-lg px-4 py-2 border rounded-md overflow-hidden pb-10 animate-pulse"
            >
              <Skeleton
                variant="rectangular"
                height="60%"
                className="rounded-md"
              />
              <Skeleton variant="text" height={20} className="mt-3" />
              <Skeleton variant="text" height={15} className="my-1" />
              <Skeleton variant="text" height={15} className="mt-1" />
            </div>
          ))}
        </div>
      </div>
    );
  },

  skeletonHotel: () => {
    return Array.from(new Array(3)).map((_, index) => (
      <div
        className="flex gap-6 border shadow-lg rounded-md overflow-hidden h-[250px] mb-6"
        key={index}
      >
        <Skeleton variant="rectangular" width="40%" height="100%" />
        <div className="w-[60%]">
          <Skeleton variant="text" width="80%" height={30} />
          <Skeleton variant="text" width="60%" height={20} />
          <div className="flex items-center gap-2 mt-2">
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="text" width="30%" />
          </div>
          <Skeleton variant="text" width="90%" height={20} />
          <div className="flex items-center gap-4 mt-4">
            <Skeleton variant="rectangular" width={80} height={30} />
            <Skeleton variant="rectangular" width={80} height={30} />
          </div>
        </div>
      </div>
    ));
  },
};
