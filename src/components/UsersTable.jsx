import { Table, Tag, Avatar, Tooltip, Button, notification } from 'antd';
import { UserOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const UsersTable = ({ getUser, data: { items = [], total_count }, setValues, values }) => {
  const dataSource = items.map(({ url, avatar_url, login, type, html_url }, index) => {
    return {
      key: index + 1,
      login,
      type,
      avatar_url,
      html_url,
      userDetailsApiUrl: url
    };
  });

  const columns = [
    {
      title: '',
      dataIndex: 'avatar_url',
      key: 'avatar_url',
      width: 50,
      render: avatarUrl => (
        <Tooltip placement='right' title={<Avatar shape='square' size={140} icon={<UserOutlined />} src={avatarUrl} />}>
          <div style={{ textAlign: 'center' }}><Avatar size={25} icon={<UserOutlined />} src={avatarUrl} /></div>
        </Tooltip>
      )
    },
    {
      title: 'Name',
      dataIndex: 'login',
      key: 'login',
      width: 250,
      render: (name, { html_url }) => <a rel='noreferrer' target='_blank' href={html_url}>{name}</a>
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: value => <Tag color={value === 'User' ? 'green' : 'red'}>{value?.toLowerCase()}</Tag>,
    },
    {
      title: 'Actions',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (value, { userDetailsApiUrl }) => (
        <Button 
          onClick={() => {
            if (userDetailsApiUrl) {
              getUser(userDetailsApiUrl);
            } else {
              notification.open({
                duration: 3,
                type: 'warning',
                description: 'API url for fetching user details is not valid!'
              });
            }
          }} 
          icon={<ExclamationCircleOutlined />} 
          size='small'>
            View Complete details
          </Button>
      )
    }
  ];

  return (
    <div style={{ marginTop: 30, height: 'calc(100% - 47px)' }}>
      <div style={{ marginBottom: 10 }}>
        <b>{total_count >= 1 ? total_count?.toLocaleString() : 0} total {total_count === 1 ? 'entry' : 'entries'}</b>
      </div>
      <Table
        style={{ boxShadow: '0 8px 8px -4px grey', border: '2px solid #D8D8D8', borderRadius: '3px' }}
        bordered
        size='small'
        pagination={false}
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};

export default UsersTable;
