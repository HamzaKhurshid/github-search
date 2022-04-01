import axios from "axios";
import { useEffect, useState } from "react";
import { Spin, notification } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import UsersTable from "../components/UsersTable";
import { GITHUB_PUBLIC_API_BASE_URL } from "../constants";

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
    errorMessage: ''
  });

  useEffect(() => {
    values?.searchQuery?.trim() && getUsers();
  }, [values.filters])

  const getUsers = async () => {
    setValues({ ...values, loading: true });
    try {
      const { data } = await axios.get(`${GITHUB_PUBLIC_API_BASE_URL}/users`, {
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
    <div style={{ padding: 40, backgroundColor: '#E5E9F2', height: '100%' }}>
      <SearchBar setValues={setValues} values={values} />
      {
        <Spin spinning={values.loading} indicator={spinner}>
          <UsersTable data={values.data} />
          <Footer setValues={setValues} values={values} />
        </Spin>
      }
    </div>
  );
}

export default GithubSearch;
