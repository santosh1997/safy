import { Button, Col, PaginationProps, Select, Table } from "antd";
import { useEffect, useState } from "react";
import ServiceConsumer from "../../crosscutting/serviceconsumer/serviceConsumer";
import {
  AuthType,
  RequestType,
} from "../../crosscutting/serviceconsumer/serviceConsumer.type";
import FileUpload from "./FileUpload/FileUpload";
import { ContentHeader } from "./Content.style";
import {
  GridProps,
  FileRecord,
  FilesResponseDTO,
  SPYFileType,
} from "./Content.type";
import { getColumnConfig } from "./Content.util";

const Content = (): JSX.Element => {
  const { Option } = Select;
  const [data, setData] = useState<{
    isLoading: boolean;
    gridProps: GridProps;
    retrievedData: FilesResponseDTO;
    typeFilter: string;
  }>({
    isLoading: false,
    retrievedData: {
      records: [],
      count: 0,
    },
    gridProps: {
      pageSize: 10,
      current: 1,
    },
    typeFilter: SPYFileType.Any.toString(),
  });

  const onFilterChange = (value: string) => {
    refreshData(value, data.gridProps);
  };

  const onGridPropsChange = ({ pageSize, current }: PaginationProps) => {
    refreshData(data.typeFilter, {
      pageSize: pageSize || 10,
      current: current || 1,
    });
  };

  const refreshData = (typeFilter: string, gridProps: GridProps): void => {
    setData({
      isLoading: true,
      typeFilter,
      gridProps,
      retrievedData: { records: [], count: 0 },
    });
    ServiceConsumer.callJSONService<FilesResponseDTO>({
      type: RequestType.GET,
      relativeURL: `/file?type=${typeFilter}&page=${gridProps.current}&pageSize=${gridProps.pageSize}`,
      authType: AuthType.PRIVATE,
    }).then((retrievedData) => {
      retrievedData = retrievedData || { records: [], count: 0 };
      setData({
        isLoading: false,
        typeFilter,
        gridProps,
        retrievedData,
      });
    });
  };

  const getRowKey = (() => {
    let key = -1;
    return () => {
      key += 1;
      return key;
    };
  })();

  const resetData = () => refreshData(data.typeFilter, data.gridProps);

  useEffect(() => {
    refreshData(SPYFileType.Any.toString(), {
      pageSize: 10,
      current: 1,
    });
  }, []);

  return (
    <>
      <ContentHeader>
        <FileUpload postUpload={resetData} />
        <Col span={6}></Col>
        <Col span={2}>
          <Button onClick={resetData}>Refresh</Button>
        </Col>
        <Col span={4}>
          <Select
            defaultValue={data.typeFilter}
            onChange={onFilterChange}
            style={{ width: "100%" }}
          >
            <Option value={SPYFileType.Any.toString()}>Show all files</Option>
            <Option value={SPYFileType.Image.toString()}>
              Show Image files
            </Option>
            <Option value={SPYFileType.Video.toString()}>
              Show Video files
            </Option>
          </Select>
        </Col>
      </ContentHeader>

      <Table<FileRecord>
        loading={data.isLoading}
        columns={getColumnConfig(resetData)}
        dataSource={data.retrievedData.records}
        bordered
        onChange={onGridPropsChange}
        pagination={{
          defaultPageSize: data.gridProps.pageSize,
          total: data.retrievedData.count,
          defaultCurrent: data.gridProps.current,
        }}
        rowKey={(record) => getRowKey()}
      />
    </>
  );
};

export default Content;
