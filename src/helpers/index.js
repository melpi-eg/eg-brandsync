"use client";
import JSZip from "jszip";

export const handleCreateAndDownloadZip = async (files) => {
  try {
    // Create a new JSZip instance
    const zip = new JSZip();

    files.forEach(({ name, content }) => {
      zip.file(name, content);
    });

    // Generate the ZIP file as a Blob
    const zipBlob = await zip.generateAsync({ type: "blob" });

    // Create a download link
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "files.zip"; // Name of the downloaded ZIP file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Revoke the object URL to free up memory
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error creating ZIP file:", error);
  }
};
