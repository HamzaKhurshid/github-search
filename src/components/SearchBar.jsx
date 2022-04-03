import { Button, Col, Input, Row } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const SearchBar = ({ values, setValues }) => {
  const { searchQuery, loading, errorMessage } = values;

  return (
    <div>
      <Row gutter={20} justify='center'>
        <Col style={{ width: '500px' }}>
          <Input
            status={errorMessage ? 'error' : ''}
            suffix={loading && <LoadingOutlined />}
            value={searchQuery}
            disabled={loading}
            onChange={({ target }) => {
              setValues({ 
                ...values, 
                searchQuery: target.value,
                errorMessage: ''
              });
            }}
            size='large' 
            placeholder='Search users'
          />
          {<h5 style={{ color: 'red' }}>{errorMessage}</h5>}
        </Col>
        <Col>
          <Button 
            disabled={loading} 
            onClick={() => {
              setValues({ 
                ...values, 
                filters: { ...values.filters, pageNumber: 1 },
                ...(!values.searchQuery.trim() ? { errorMessage: 'Please provide a valid query' } : {})
              });
            }} 
            size='large' 
            type='primary'
          >
            Search
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default SearchBar;
