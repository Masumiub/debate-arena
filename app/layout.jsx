import '../styles/globals.css';
import ClientLayout from './ClientLayout';
import '../styles/globals.css'


export const metadata = {
  title: 'Debate Arena',
  icons: {
    icon: "/icons8-vote-100.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      {/* <head>
        <link rel="icon" href="/icons8-vote-100.png" type="image/png" />
      </head> */}
      <body className="min-h-screen bg-base-100">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
