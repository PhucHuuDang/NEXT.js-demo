"use client";
// got this error "Error: React Context is unavailable in Server Components" so add "use client"

import React from "react";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
