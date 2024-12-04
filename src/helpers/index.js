import JSZip from "jszip";

function stringToUint8Array(binaryString) {
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i) & 0xff; // Get byte value
  }
  return byteArray;
}

export const handleCreateAndDownloadZip = async (files) => {
  try {
    // Create a new JSZip instance
    const zip = new JSZip();

    files.forEach(({ name, content, binary }) => {
      if (binary) {
        // const binaryData = stringToUint8Array(content);
        zip.file(name, content);
        return;
      }
      zip.file(name, content);
    });


    // zip.file("favicon.ico","/favicon.c764ea89.ico")

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
