"use client";

import dynamic from "next/dynamic";

const BlogClientComponents = dynamic(
  () => import("@/components/BlogClientComponents"),
  { ssr: false }
);

export default BlogClientComponents;
