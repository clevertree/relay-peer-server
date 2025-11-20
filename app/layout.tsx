export const metadata = {
  title: 'Relay Peer Server',
  description: 'List and update peer sockets',
};

import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 20 }}>{children}</body>
    </html>
  );
}
