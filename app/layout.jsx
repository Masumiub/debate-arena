import '../styles/globals.css';
import ClientLayout from './ClientLayout';
import '../styles/globals.css'


export const metadata = {
  title: 'Debate Arena',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className="min-h-screen bg-base-100">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
