import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Authentication",
    description: "Sign in or sign up to access your account",
}

export default function RootLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body> 
                {children}
            </body>
        </html>
    )
}