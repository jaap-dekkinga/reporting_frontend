import { FingerprintModel } from "../types/FingerprintModel";
import { API } from "../common/consts";

/// returns the type of fingerprints
export const getFingerprintTypes = async (): Promise<any> => {
  let response = await fetch(API.typesURL, {
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

  if (undefined !== data.fingerprint || null !== data.fingerprint) {
    formData.append("mp3file", data.fingerprint!);
  }
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("type", data.type);
  formData.append("info", data.info);
  // formData.append("id", data.id.toString());
  formData.append("url", data.url);

  let response = await fetch(API.createFingerprintURL, {
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

  if (undefined !== data.fingerprint || null !== data.fingerprint) {
    formData.append("mp3file", data.fingerprint!);
  }
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("type", data.type);
  formData.append("info", data.info);
  formData.append("id", data.id.toString());
  formData.append("url", data.url);

  let response = await fetch(API.updateFingerprintURL, {
    method: "POST",
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
  let response = await fetch(API.deleteFingerprintURL + id, {
    method: "GET",
    mode: "cors",
  }).then(handleErrors);
  let result = await response.json().then((data) => {
    return data;
  });

  return result;
};

//listing figerprint
export const getFingerprints = async (
  page: number
): Promise<FingerprintModel[]> => {
  console.log("Get Fingerprint");
  let url = API.getFingerprintsURL.replace("[PAGE]", page.toString());
  console.log(url);
  let response = await fetch(url, {
    method: "GET",
    mode: "cors",
  }).then(handleErrors);
  let result = await response.json().then((data) => {
    console.log(data);
    return data;
  });

  return result as FingerprintModel[];
};
