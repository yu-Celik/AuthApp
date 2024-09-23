import localFont from "next/font/local";

const geistSans = localFont({
    src: "../../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "../../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <body className={`
            ${geistSans.variable} 
            ${geistMono.variable} 
            bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800
            antialiased
        `}>
            {children}
        </body>
    );
};

export default DashboardLayout;