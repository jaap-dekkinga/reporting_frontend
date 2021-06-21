import { WithStyles } from "@material-ui/core/styles";
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
  fingerprint?: Blob;
  id: number;
  info: string;
  name: string;
  type: string;
  url: string;
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

export type FingerprintState = {
  types: FingerprintType[];
  fingerprint: FingerprintModel;
  isDialogOpen: boolean;
  showSpinner: boolean;
  filename: string;
  errors: {
    name: string;
    fingerprint: string;
    info: string;
    type: string;

    status: boolean;
  };
};

export interface sortType {
  column: string;
  direction: string;
}
