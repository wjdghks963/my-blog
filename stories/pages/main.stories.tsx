import Home from "../../pages/index";
import React from "react";
import "../../styles/globals.css";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Pages/Home",
  component: "Home",
};

export const HomePage = () => (
  <Home data={{ categories: [], popularPosts: [], recentPosts: [] }} />
);