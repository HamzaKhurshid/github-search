import axios from 'axios';
import { useEffect, useState } from 'react';
import { Spin, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import UsersTable from '../components/UsersTable';
import { GITHUB_PUBLIC_API_BASE_URL } from '../constants';
import UserDetailsModal from '../components/UserDetailsModal';

const spinner = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const GithubSearch = () => {
  const [values, setValues] = useState({
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

  useEffect(() => {
    values?.searchQuery?.trim() && getUsers();
    // eslint-disable-next-line
  }, [values.filters]);
  

  const getUser = async (userDetailsApiUrl) => {
    setValues({ ...values, loading: true });
    try {
      const { data: userDetails } = await axios.get(userDetailsApiUrl) || {};
      setValues({
        ...values,
        userDetails,
        isModalVisible: true,
        loading: false
      });
    } catch (error) {
      setValues({
        ...values,
        userDetails: {},
        isModalVisible: false,
        loading: false
      });

      notification.open({
        duration: 5,
        message: 's',
        type: 'error',
        description: error?.message || 'User details could not be fetched'
      });
    }
  };

  const getUsers = async () => {
    setValues({ ...values, loading: true });
    try {
      const { data } = await axios.get(`${GITHUB_PUBLIC_API_BASE_URL}/search/users`, {
        params: {
          q: values.searchQuery.trim(),
          per_page: values.filters.itemsPerPage,
          page: values.filters.pageNumber
        }
      }) || {};

      setValues({
        ...values,
        data,
        loading: false
      });
    } catch (error) {
      setValues({
        ...values,
        loading: false
      });

      notification.open({
        duration: 5,
        type: 'error',
        message: 'Fetch Users',
        description: error?.message || 'Date could not be fetched'
      });
    }
  };

  return (
    <div style={{ padding: '40px 40px 20px 40px', height: '100%', backgroundColor: '#F2F2F2' }}>
      <SearchBar setValues={setValues} values={values} />
      {
        <div style={{ height: `calc(100% - ${values.errorMessage ? '56.05px' : '32px'} - 30px)` }}>
          <Spin spinning={values.loading} indicator={spinner}>
            <UsersTable getUser={getUser} setValues={setValues} values={values} />
            <Footer setValues={setValues} values={values} />
          </Spin>
        </div>
      }
      <UserDetailsModal setValues={setValues} values={values} />
    </div>
  );
}

export default GithubSearch;
