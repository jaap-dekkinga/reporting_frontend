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

export const API = {
  getTuneUrlIDs:
    "https://65neejq3c9.execute-api.us-east-2.amazonaws.com/getTuneURL_IDs",
  getGraphData:
    "https://65neejq3c9.execute-api.us-east-2.amazonaws.com/getGraphData",
  getTop10minuties:
    "https://65neejq3c9.execute-api.us-east-2.amazonaws.com/getTop10minuties",
  createFingerprintURL:
    "https://pnz3vadc52.execute-api.us-east-2.amazonaws.com/dev/create-fingerprint",
  updateFingerprintURL:
    "https://pnz3vadc52.execute-api.us-east-2.amazonaws.com/dev/update-fingerprint",
  deleteFingerprintURL:
    "https://pnz3vadc52.execute-api.us-east-2.amazonaws.com/dev/delete-fingerprint?id=",
  getFingerprintsURL:
    "https://pnz3vadc52.execute-api.us-east-2.amazonaws.com/dev/get-fingerprint?limit=10&offset=[PAGE]",
  typesURL: "https://pnz3vadc52.execute-api.us-east-2.amazonaws.com/dev/type",
};

export const drawerWidth = 240;
