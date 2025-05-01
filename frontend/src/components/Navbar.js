import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box, Avatar } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import authService from "../authService";

const Navbar = () => {
    const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
    const { isAuthenticated, logout } = useContext(AuthContext);
    const username = isAuthenticated ? authService.getUsername() : "";
    const navigate = useNavigate();

    const handleUserMenuOpen = (event) => {
        setUserMenuAnchorEl(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setUserMenuAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        setUserMenuAnchorEl(null);
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ 
                justifyContent: "space-between",
                display: "flex",
                gap: 2,
            }}>
                <Typography variant="h6" component="div">
                    Blog Application
                </Typography>
                <Box sx={{ display: "flex", gap: 2, flexGrow: 1 }}>
                    {isAuthenticated && (
                        <>
                            <Link to="/" style={{ textDecoration: "none", color: "white" }}>Home</Link>
                            <Link to="/create-post" style={{ textDecoration: "none", color: "white" }}>Create Post</Link>
                            <Link to="/search" style={{ textDecoration: "none", color: "white" }}>Search</Link>
                        </>
                    )}
                </Box>
                {isAuthenticated ? (
                    <Box>
                        <IconButton onClick={handleUserMenuOpen} sx={{ p: 0 }}>
                            <Avatar>
                                {username.charAt(0).toUpperCase()}
                            </Avatar>
                        </IconButton>
                        <Menu
                            anchorEl={userMenuAnchorEl}
                            open={Boolean(userMenuAnchorEl)}
                            onClose={handleUserMenuClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </Box>
                ) : (
                    <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
                        Login
                    </Link>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;