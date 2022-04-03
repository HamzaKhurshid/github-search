import { Pagination, Select } from 'antd';
const { Option } = Select;

const Footer = ({ values, setValues }) => {
  const { data: { total_count } = {} } = values || {};

  return (
    <div style={{ marginTop: 15, height: '32px', float: 'right', display: 'flex' }}>
      <div style={{ display: 'flex', marginRight: 20 }}>
        <Pagination
          pageSize={values.filters.itemsPerPage}
          showSizeChanger={false}
          current={values.filters.pageNumber}
          total={total_count}
          onChange={(pageNumber) => {
            setValues({ ...values, filters: { ...values.filters, pageNumber } });
          }}
        />
      </div>

      <Select
        value={values.filters.itemsPerPage}
        style={{ width: 170 }}
        onChange={(itemsPerPage) => {
          setValues({ ...values, filters: { ...values.filters, itemsPerPage, pageNumber: 1 } });
        }}
      >
        <Option value={30}>30 Items per page</Option>
        <Option value={50}>50 Items per page</Option>
        <Option value={75}>75 Items per page</Option>
      </Select>
    </div>
  );
};

export default Footer;