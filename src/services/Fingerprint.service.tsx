import { promises } from "dns";
import { FingerprintModel } from "../types/FingerprintModel";
// POST -
const createFingerprintURL =
  "https://ru4sd4wcr2.execute-api.us-east-2.amazonaws.com/dev/create-fingerprint";

// PUT -
const updateFingerprintURL =
  "https://ru4sd4wcr2.execute-api.us-east-2.amazonaws.com/dev/update-fingerprint";

//DELETE -
const deleteFingerprintURL =
  "https://ru4sd4wcr2.execute-api.us-east-2.amazonaws.com/dev/delete-fingerprint";

// GET -
const getFingerprintsURL =
  "https://ru4sd4wcr2.execute-api.us-east-2.amazonaws.com/dev/get-fingerprint?start=1&limit=10";

// GET -
const typesURL =
  "https://ru4sd4wcr2.execute-api.us-east-2.amazonaws.com/dev/type";

/// returns the type of fingerprints
export const getFingerprintTypes = () => {
  fetch(typesURL, {
    method: "GET",
    mode: "cors",
  })
    .then((res) => {
      // setShowSpinner(false);
      return res.json();
    })
    .then((data) => {
      if (data.status !== "OK") {
        console.log("Can't receive report data: ", data.message);
        return;
      }
      return data.data as string[];
    });
};

//create
export const createFingerprint = async (
  data: FingerprintModel
): Promise<any> => {
  // setShowSpinner(true);
  const formData = new FormData();

  formData.append("mp3file", data.id.toString());
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("type", data.type);
  formData.append("info", data.info);
  // formData.append(name, data.url);

  let response = await fetch(updateFingerprintURL, {
    method: "POST",
    mode: "cors",
    body: formData,
  });
  let result = await response.json().then((data) => {
    return data;
  });

  return result;
};

//update
export const updateFingerprint = async (
  data: FingerprintModel
): Promise<any> => {
  const formData = new FormData();

  formData.append("mp3file", data.id.toString());
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("type", data.type);
  formData.append("info", data.info);
  // formData.append(name, data.url);

  let response = await fetch(updateFingerprintURL, {
    method: "PUT",
    mode: "cors",
    body: formData,
  });
  let result = await response.json().then((data) => {
    return data;
  });

  return result;
};

//delete
export const deleteFingerprint = async (id: string): Promise<any> => {
  // setShowSpinner(true);
  let response = await fetch(deleteFingerprintURL, {
    method: "DELETE",
    mode: "cors",
  });
  let result = await response.json().then((data) => {
    return data;
  });

  return result;
};

//list
export const getFingerprints = async (): Promise<FingerprintModel[]> => {
  let response = await fetch(getFingerprintsURL, {
    method: "GET",
    mode: "cors",
  });
  let result = await response.json().then((data) => {
    return data.data;
  });

  return result as FingerprintModel[];
};
