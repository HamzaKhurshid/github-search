import { Button, Col, Input, Row, Tooltip } from 'antd';
import { LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

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
            placeholder='Search users'
          />
          {errorMessage ? <h5 style={{ color: 'red' }}>{errorMessage}</h5> : null}
        </Col>
        <Col>
          <Button
            disabled={loading}
            type='primary'
            onClick={() => {
              setValues({
                ...values,
                filters: { ...values.filters, pageNumber: 1 },
                ...(!values.searchQuery.trim() ? { errorMessage: 'Please provide a valid query' } : {})
              });
            }}
          >
            Search
          </Button>
          <Tooltip placement='right' title='Clear all data'>
            <Button
              style={{ marginLeft: 10 }}
              icon={<ExclamationCircleOutlined />}
              type='danger'
              onClick={() => {
                setValues({
                  filters: {
                    itemsPerPage: 30,
                    pageNumber: 1,
                  },
                  searchQuery: '',
                  data: [],
                  loading: false,
                  errorMessage: '',
                  isModalVisible: false,
                  userDetails: {}
                });
              }}
            >
            </Button>
          </Tooltip>
        </Col>
      </Row>
    </div>
  );
}

export default SearchBar;
