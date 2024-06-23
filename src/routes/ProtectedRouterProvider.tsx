import React from "react";

import {Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthProvider.tsx";

interface ProtectedRoutesProps {
    children: React.ReactNode;
}

const ProtectedRouterProvider = ({ children }: ProtectedRoutesProps) => {
    const {  user, isLoading } = useAuth();

    if (isLoading) {
        return null;
    }
    return user ? (
        <>{children}</>
    ) : (
        <Navigate to="/" replace />
    );
};

export default ProtectedRouterProvider;