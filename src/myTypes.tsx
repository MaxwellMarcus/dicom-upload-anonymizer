export class myFile {
  fileName;
  size;
  dicomTags: dicomTags;
  anonymizedFile;

  constructor(
    fileName: string,
    size: number,
    dicomTags: dicomTags,
    anonymizedFile: Blob,
  ) {
    this.fileName = fileName;
    this.size = size;
    this.dicomTags = dicomTags;
    this.anonymizedFile = anonymizedFile;
  }
}

export type myFiles = Array<myFile>;

export type dateTimeErrors = {
  dateTimeError: boolean;
  studyInstanceUidError: boolean;
};

type dicomTags = {
  date: string;
  time: string;
  UID: string;
};

export type InputFieldsProps = {
  setProjectId: Function;
  setSubjectId: Function;
  setDateTime: Function;
};

export type SubmitButtonProps = {
  isUploadDisabled: boolean;
  fileCheck: dateTimeErrors;
  areFilesReady: boolean;
  sendingFiles: boolean;
  onSubmit: Function;
};

export type UploadButtonProps = {
  onFileUpload: Function;
  isUploadDisabled: boolean;
  totalVolume: number;
  totalFiles: number;
  numOfAnonomyzedFiles: number;
  fileCheck: dateTimeErrors;
};
