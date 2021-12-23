import { memo } from "react";
import { Link } from "react-router-dom";

const Page404 = memo(() => {
  return (
    <div>
      <h1>ページが見つかりませんでした。</h1>
      <p style={{ textAlign: "center" }}>
        <Link to="/">ホーム</Link>画面へ戻ってください
      </p>
    </div>
  );
});

export default Page404;
