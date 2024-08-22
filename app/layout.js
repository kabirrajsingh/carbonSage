// app/layout.js
import { ProjectFilesProvider } from './context/ProjectFilesContext';
import { SessionProvider } from './context/SessionContext';
import './globals.css';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <SessionProvider> */}
          <ProjectFilesProvider>
          {children}
          </ProjectFilesProvider>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
