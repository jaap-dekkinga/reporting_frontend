import { WithStyles } from "@material-ui/core/styles";
import { type } from "os";
import React from "react";

export interface FingerprintModel {
  // id: number;
  // mp3data?: Blob;
  // fileNameOrUrl: string;
  // name: string;
  // description: string;
  // type: string;
  // info: string;
  // createdAt: string;
  // updatedAt: string;
  date_created: string;
  date_updated: string;
  description: string;
  triggerSound: string;
  fingerprint?: Blob;
  id: number;
  info: string;
  name: string;
  type: string;
}
export interface FingerprintProps extends WithStyles {
  model?: FingerprintModel;
  isEditMode?: boolean;
  title?: string;
  component?: React.Component;
  variant?: "text" | "outlined" | "contained";
  submitCancelCallback?: Function;
}

export interface FingerprintType {
  id: string;
  type: string;
  status: string;
}

export interface TriggerType {
  id: string;
  name: string;
  status: string;
}

export type FingerprintsData = {
  count: number;
  data: FingerprintModel[];
};

export type FingerprintState = {
  types: FingerprintType[];
  fingerprint: FingerprintModel;
  triggerSound:TriggerType[];
  fingerprintdata:Blob;
  isDialogOpen: boolean;
  isDownloadOpen: boolean;
  showSpinner: boolean;
  filename: string;
  typeVal: string;
  descType: string;
  errors: {
    name: string;
    fingerprint: string;
    info: string;
    type: string;
    description: string;
    triggerSound:string;
    status: boolean;
  };
};

export interface sortType {
  column: string;
  direction: string;
}
