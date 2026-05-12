import './globals.css';

export const metadata = {
  title: 'Junk or No',
  description: 'Check if a food item is likely junk food or not.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
