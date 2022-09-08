import React, { useEffect, useRef } from "react";
import Uppy from "@uppy/core";
import AwsS3 from "@uppy/aws-s3";
import { Dashboard } from "@uppy/react";

import { getMD5Hash } from "./lib";

import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

const Uploader = ({
  allowMultipleUploads,
  autoProceed,
  getSignedUrl,
  height,
  id,
  locale,
  meta,
  onBeforeFileAdded,
  onBeforeUpload,
  restrictions,
  width
}) => {
  const uppyConfig = {
    allowMultipleUploads,
    autoProceed,
    debug: false,
    id,
    locale,
    meta,
    onBeforeFileAdded,
    onBeforeUpload,
    restrictions
  };

  const uppy = useRef(Uppy(uppyConfig));

  uppy.current.use(AwsS3, {
    limit: 10,
    getUploadParameters(file) {
      return getMD5Hash(file.data)
        .then(md5Hash => getSignedUrl(file.name, md5Hash))
        .then(data => {
          return {
            method: data.method,
            url: data.url,
            fields: {},
            headers: {
              "x-amz-acl": "public-read",
              "Content-Disposition": `attachment; filename="${file.name}"`,
              "Content-Length": file.size,
              "Content-MD5": data.md5Hash,
              "Content-Type": file.type
            }
          };
        });
    }
  });

  uppy.current.on("complete", result => {
    console.log(result);
  });

  useEffect(() => {
    const uppyInstance = uppy.current;
    return () => uppyInstance.close();
  }, []);

  return <Dashboard width={width} height={height} uppy={uppy.current} />;
};

Uploader.defaultProps = {
  allowMultipleUploads: true,
  autoProceed: false,
  height: "200px",
  id: Math.round(Math.random() * 100).toString(),
  locale: {},
  meta: {},
  onBeforeFileAdded: (currentFile, files) => currentFile,
  onBeforeUpload: files => {},
  restrictions: {
    // allowedFileTypes: null
    // maxFileSize: null,
    // maxNumberOfFiles: null,
    // minNumberOfFiles: null,
  },
  width: "100%"
};

export default Uploader;
