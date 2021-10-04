import { FingerprintModel, FingerprintsData } from "../types/FingerprintModel";
import { API } from "../common/consts";
import store from "../store";


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

// returns the type of fingerprints
export const loadTriggerSoundTypes = async (): Promise<any> => {
  let response = await fetch(API.triggerTypesURL, {
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
  data: FingerprintModel,
  triggerId: string
): Promise<any> => {
  // setShowSpinner(true);
  const formData = new FormData();
  const uid = store.getState().authorization.uid;

  if (undefined !== data.fingerprint || null !== data.fingerprint) {
    formData.append("mp3file", data.fingerprint!);
  }
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("type", data.type);
  formData.append("info", data.info);
  formData.append("triggerSoundId", triggerId);

  formData.append("uid", uid ?? "");

  let response = await fetch(API.createTuneUrl, {
    method: "POST",
    mode: "cors",
    body: formData,
  }).then(handleErrors);
  // const resp = await response;
  // // console.log(response)
  // console.log(resp)
  //   console.log(await resp.json())
  
  // let result = await response.json().then((data) => {
  //   console.log(JSON.parse(data));
  //   return data;
  // });
// console.log(result)
  return response;
};

const handleErrors = (response: Response) => {
  console.log(" response ", response);
  console.log(" response.statusText ", response.statusText);
  if(!response.ok && response.status == 409){
    throw Error("Error: the audio you selected is too similar to an existing TuneURL");
  } if(!response.ok && response.status == 422){
    throw Error("Error: This Poll already exist");
  } else if (!response.ok) {
    throw Error("Some error occured");
  }
  return response;
};

//update
export const updateFingerprint = async (
  data: FingerprintModel,
  triggerId: string
): Promise<any> => {
  const formData = new FormData();
  const uid = store.getState().authorization.uid;

  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("type", data.type);
  formData.append("info", data.info);
  formData.append("id", data.id.toString());
  formData.append("uid", uid ?? "");
  formData.append("triggerSoundId", triggerId);

  let response = await fetch(API.updateTuneUrl, {
    method: "POST",
    mode: "cors",
    body: formData,
  });
  // let result = await response.json().then((data) => {
  //   return data;
  // });

  return response;
};

//delete
export const deleteFingerprint = async (id: string): Promise<any> => {
  // setShowSpinner(true);
  const uid = store.getState().authorization.uid;

  let response = await fetch(
    API.deleteTuneUrl +
      id +
      "&" +
      new URLSearchParams({ uid: uid as string }),
    {
      method: "GET",
      mode: "cors",
    }
  ).then(handleErrors);
  let result = await response.json().then((data) => {
    return data;
  });

  return result;
};

//listing figerprint
export const getFingerprints = async (
  page: number
): Promise<FingerprintsData> => {
  const uid = store.getState().authorization.uid;
  const role = store.getState().authorization.role || '';
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Authorization', role);
  console.log("uid ", uid);
  console.log("Get Fingerprint");
  let url = API.getTuneUrls.replace("[PAGE]", page.toString());
  url = url + "&" + new URLSearchParams({ uid: uid as string });
  console.log(url);
  let response = await fetch(url, {
    method: "GET",
    headers: requestHeaders,
    mode: "cors",
  }).then(handleErrors);
  let result = await response.json().then((data) => {
    console.log(data);
    return data;
  });

  return result;
};

export const getAllFingerPrints = async (): Promise<any> => {
  const uid = store.getState().authorization.uid;
  console.log("uid ", uid);
    console.log("Get Fingerprint");
    // let url = API.getAllTuneUrls.replace("[PAGE]", page.toString());
  let  url = API.getAllTuneUrls + "&" + new URLSearchParams({ uid: uid as string });
    console.log(url);
  let response = await fetch(url, {
    method: "GET",
    mode: "cors",
  }).then(handleErrors);

  let result = await response.json().then((data) => {
    return data;
  });

  return result;
  // }
};