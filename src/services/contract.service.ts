import { API } from "./axios";

type Contract = {
  country: string;
  sessions: number;
  pageviews: number;
};

export const addContractData = async ({
  country,
  sessions,
  pageviews,
}: Contract) => {
  try {
    const data = await API.post("/contract", {
      country,
      sessions,
      pageviews,
    });

    return data;
  } catch (err) {
    console.log("Request Error ", err);
  }
};
