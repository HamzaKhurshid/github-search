import { Button, Select, Tooltip } from "antd";
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

const { Option } = Select;

const Footer = ({ values, setValues }) => {
  const onPageNumberChange = (mode) => {
    let pageNumber = values.filters.pageNumber;
    mode === 'next' ? pageNumber += 1 : pageNumber -= 1;
    pageNumber >= 1 && setValues({ ...values, filters: { ...values.filters, pageNumber } });
  };

  return (
    <div style={{ marginTop: 15, height: '32px', float: 'right', display: 'flex' }}>
      <Select 
        value={values.filters.itemsPerPage} 
        style={{ width: 170 }} 
        onChange={(itemsPerPage) => {
          setValues({ ...values, filters: { ...values.filters, itemsPerPage, pageNumber: 1 } });
        }}
      >
        <Option value={30}>30 Items per page</Option>
        <Option value={60}>60 Items per page</Option>
        <Option value={100}>100 Items per page</Option>
      </Select>
      
      <div style={{ display: 'flex' }}>
        <Button 
          style={{ marginLeft: 15 }} 
          shape="circle" 
          onClick={() => onPageNumberChange('prev')}
          icon={<LeftOutlined />} 
        />
        <div style={{ marginTop: 3, marginRight: 10, marginLeft: 10 }}>
          <Tooltip title='Page No'>
            <h3>{values.filters.pageNumber}</h3>
          </Tooltip>
        </div>
        <Button 
          shape="circle" 
          onClick={() => onPageNumberChange('next')}
          icon={<RightOutlined />} 
        />
      </div>
    </div>
  );
};

export default Footer;