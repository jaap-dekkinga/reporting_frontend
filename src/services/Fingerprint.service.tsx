import { promises } from "dns";
import { FingerprintModel, FingerprintType } from "../types/FingerprintModel";
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
  "https://ru4sd4wcr2.execute-api.us-east-2.amazonaws.com/dev/get-fingerprint?limit=10&offset=1";

// GET -
const typesURL =
  "https://ru4sd4wcr2.execute-api.us-east-2.amazonaws.com/dev/type";

/// returns the type of fingerprints
export const getFingerprintTypes = async (): Promise<any> => {
  let response = await fetch(typesURL, {
    method: "GET",
    mode: "cors",
  }).then(handleErrors);

  let result = await response.json().then((data) => {
    return data;
  });

  return result;
  // }
};

//create
export const createFingerprint = async (
  data: FingerprintModel
): Promise<any> => {
  // setShowSpinner(true);
  const formData = new FormData();

  if (undefined !== data.mp3data || null !== data.mp3data) {
    formData.append("mp3file", data.mp3data!);
  }
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("type", data.type);
  formData.append("info", data.info);
  // formData.append("id", data.id.toString());
  // formData.append(name, data.url);

  let response = await fetch(createFingerprintURL, {
    method: "POST",
    mode: "cors",
    body: formData,
  }).then(handleErrors);

  let result = await response.json().then((data) => {
    console.log(data);
    return data;
  });

  return result;
};

const handleErrors = (response: Response) => {
  if (!response.ok) {
    throw Error("Some error occured");
  }
  return response;
};

//update
export const updateFingerprint = async (
  data: FingerprintModel
): Promise<any> => {
  const formData = new FormData();

  if (undefined !== data.mp3data || null !== data.mp3data) {
    formData.append("mp3file", data.mp3data!);
  }
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("type", data.type);
  formData.append("info", data.info);
  formData.append("id", data.id.toString());
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
  }).then(handleErrors);
  let result = await response.json().then((data) => {
    return data;
  });

  return result;
};

//list
export const getFingerprints = async (): Promise<FingerprintModel[]> => {
  console.log("Get Fingerprint");
  let response = await fetch(getFingerprintsURL, {
    method: "GET",
    mode: "cors",
  }).then(handleErrors);
  let result = await response.json().then((data) => {
    return data.data;
  });

  return result as FingerprintModel[];
};
