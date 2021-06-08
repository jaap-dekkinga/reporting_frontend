import React from "react";

export interface FingerprintModel {
  id: number;
  name: string;
  description: string;
  type: string;
  info: string;
  createdAt: string;
  updatedAt: string;
}

export type FingerprintProps = {
  model?: FingerprintModel;
};

export type FingerprintState = {
  types: string[];
  fingerprint: FingerprintModel;
  isDialogOpen: boolean;
};
