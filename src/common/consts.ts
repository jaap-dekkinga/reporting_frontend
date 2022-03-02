export enum reports {
  impact = "Impact graph",
  top10Slots = "Top 10 slots",
  fingerprints = "Fingerprints",
}

export const initialState = {
  reports: {
    activeReport: reports.impact,
    tuneUrlIDs: [] as number[],
  },
  authorization: {
    email: null as null | string,
    name: null as null | string,
    role: null as null | string,
    expired: null as null | number,
    uid: "a659bbfb-a584-4abf-b8f8-05a8dca4fc4c",
  },
};

export enum interestActions {
  "heard" = "heard",
  "interested" = "interested",
  "acted" = "acted",
  "shared" = "shared",
}

// const base_url1 = "https://65neejq3c9.execute-api.us-east-2.amazonaws.com/";
const base_url1 = "https://pnz3vadc52.execute-api.us-east-2.amazonaws.com/dev/";
const base_url = "https://pnz3vadc52.execute-api.us-east-2.amazonaws.com/dev/";

export const API = {
  getTuneUrlIDs: base_url1 + "getTuneURL_IDs",
  getGraphData: base_url1 + "getGraphData",
  getTop10minuties: base_url1 + "getTop10minuties",
  createTuneUrl: base_url + "create-tuneurl",
  updateTuneUrl: base_url + "update-tuneurl",
  deleteTuneUrl: base_url + "delete-tuneurl?id=",
  getTuneUrls: base_url + "get-tuneurl?limit=10&offset=[PAGE]",
  getAllTuneUrls: base_url + "get-tuneurl",
  typesURL: base_url + "type",
  triggerTypesURL: base_url + "get-sound",
};

export const drawerWidth = 240;
