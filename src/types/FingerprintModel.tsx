import { WithStyles } from "@material-ui/core/styles";
import React from "react";

export interface FingerprintModel {
  id: number;
  mp3data?: Blob;
  fileNameOrUrl: string;
  name: string;
  description: string;
  type: string;
  info: string;
  createdAt: string;
  updatedAt: string;
}
export interface FingerprintProps extends WithStyles {
  model?: FingerprintModel;
  isEditMode?: boolean;
  title?: string;
  component?: React.Component;
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
};
