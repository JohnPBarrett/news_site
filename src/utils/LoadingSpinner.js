import { css } from "@emotion/react";
import { MoonLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 20rem auto;
  border-color: #4661e3;
`;

const LoaderSpinner = () => {
  return (
    <div className="sweet-loading">
      <MoonLoader color={"#599efa"} loading={true} css={override} size={150} />
    </div>
  );
};

export default LoaderSpinner;
