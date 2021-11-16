import { textAlign } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div>
      <h1>ページが見つかりませんでした。</h1>
      <p style={{ textAlign: "center" }}>
        <Link to="/">ホーム</Link>画面へ戻ってください
      </p>
    </div>
  );
};

export default Page404;
