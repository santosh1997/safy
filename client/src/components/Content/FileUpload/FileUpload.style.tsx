import styled from "styled-components";
import { Button, Upload } from "antd";

const ProgressWrapper = styled.div`
  padding: 0.125em 20px 0px 20px;
`;

const StyledUpload = styled(Upload)`
  .ant-upload {
    width: 100%;
  }
`;

const StyledUploadBtn = styled(Button)`
  width: 100%;
`;

export { ProgressWrapper, StyledUpload, StyledUploadBtn };
