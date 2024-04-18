import React from "react";
export default function HomeContainer() {
  const deneme = process.env.NEXT_APP_DENEME;
  const secret = process.env.NEXT_APP_SECRET_KEY;
  const mong = process.env.NEXT_APP_MONGODB_URI;
  return (
    <div>
      <p> Slug :{deneme}</p>
      <p>Secret : {secret}</p>
      <p>Secret : {mong}</p>
    </div>
  );
}
