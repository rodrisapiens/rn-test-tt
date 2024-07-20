import { useQuery } from "@tanstack/react-query";

const staleTime = 1000 * 60 * 1;
const refetchInterval = 1000 * 60 * 1;

export const LAUNCHES = "launches";
export const LAUNCH_DETAILS = "launchDetails";

export type Launch = {
  id: string;
  mission_name: string;
  details: string;
  launch_date_utc: string;
  img: string;
  rocket: string;
};

type LaunchDetails = {
  mission_name: string;
  details: string;
  launch_date_utc: string;
  links: {
    article_link: string;
    video_link: string;
  };
  img: string;
  rocket: string;
};

const fetchLaunches = async () => {
  const response = await fetch("https://api.spacexdata.com/v4/launches");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  return data.map((launch: any) => ({
    id: launch.id,
    mission_name: launch.name,
    details: launch.details,
    launch_date_utc: launch.date_utc,
    img: launch.links.patch.small,
    rocket: launch.rocket,
  })) as Launch[];
};

const fetchRockets = async () => {
  const response = await fetch("https://api.spacexdata.com/v4/rockets");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.map((rocket: any) => ({
    id: rocket.id,
    name: rocket.name,
    type: rocket.type,
    image: rocket.flickr_images[0] || null,
  }));
};

const fetchLaunchDetails = async (id: string) => {
  const response = await fetch(`https://api.spacexdata.com/v4/launches/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  return {
    mission_name: data.name,
    details: data.details,
    launch_date_utc: data.date_utc,
    links: {
      article_link: data.links.article,
      video_link: data.links.webcast,
    },
    img: data.links.patch.large,
    rocket: data.rocket,
  } as LaunchDetails;
};

export const useLaunches = () => {
  return useQuery({
    queryKey: [LAUNCHES],
    queryFn: fetchLaunches,
    staleTime,
    refetchInterval,
  });
};

export const useLaunchDetails = (id: string) => {
  return useQuery({
    queryKey: [LAUNCH_DETAILS, id],
    queryFn: () => fetchLaunchDetails(id),
    staleTime,
    refetchInterval,
  });
};

export const useRockets = () => {
  return useQuery({
    queryKey: ["rockets"],
    queryFn: fetchRockets,
    staleTime,
    refetchInterval,
  });
};
