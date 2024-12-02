import "./globals.css";
import { ContextWrapper } from "@/components";

export const metadata = {
  title: "EG BrandSync",
  description: "An EG application to standardize brand logo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="hide-scrollbar scroll-smooth">
      <head>
        {/* <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css"
          integrity="sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        /> */}
      </head>
      <body>
        <ContextWrapper>{children}</ContextWrapper>
      </body>
    </html>
  );
}
