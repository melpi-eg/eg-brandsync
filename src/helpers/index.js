"use client";
import JSZip from "jszip";

export const handleCreateAndDownloadZip = async (files) => {
  try {
    // Create a new JSZip instance
    const zip = new JSZip();

    // Add files to the ZIP
    zip.file(
      "file1.svg",
      `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
        </svg>
        `
    );
    zip.file("file2.txt", "This is the content of file 2.");
    zip.file("file3.txt", "This is the content of file 3.");

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
