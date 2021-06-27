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
    expired: null as null | number,
    uid: null as null | string,
  },
};

export enum interestActions {
  "heard" = "heard",
  "interested" = "interested",
  "acted" = "acted",
  "shared" = "shared",
}

const base_url1 = "https://65neejq3c9.execute-api.us-east-2.amazonaws.com/"; // prod
const base_url = "https://pnz3vadc52.execute-api.us-east-2.amazonaws.com/dev/"; // dev

export const API = {
  getTuneUrlIDs: base_url1 + "getTuneURL_IDs",
  getGraphData: base_url1 + "getGraphData",
  getTop10minuties: base_url1 + "getTop10minuties",
  createFingerprintURL: base_url + "create-fingerprint",
  updateFingerprintURL: base_url + "update-fingerprint",
  deleteFingerprintURL: base_url + "delete-fingerprint?id=",
  getFingerprintsURL: base_url + "get-fingerprint?limit=10&offset=[PAGE]",
  typesURL: base_url + "type",
};

export const drawerWidth = 240;
