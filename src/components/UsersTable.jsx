import { Table, Tag, Avatar, Tooltip } from "antd";
import { UserOutlined } from '@ant-design/icons';

const UsersTable = ({ data: { items = [], total_count } }) => {
  const dataSource = items.map(({ avatar_url, login, type, html_url }, index) => {
    return {
      key: index + 1,
      login,
      type,
      avatar_url,
      html_url
    };
  });

  const columns = [
    {
      title: '',
      dataIndex: 'avatar_url',
      key: 'avatar_url',
      width: 70,
      render: avatarUrl => (
        <Tooltip placement='right' title={<Avatar shape='square' size={130} icon={<UserOutlined />} src={avatarUrl} />}>
          <div style={{ textAlign: 'center' }}><Avatar size={35} icon={<UserOutlined />} src={avatarUrl} /></div>
        </Tooltip>
      )
    },
    {
      title: 'Name',
      dataIndex: 'login',
      key: 'login',
      width: 250,
      render: (name, { html_url }) => <a target='_blank' href={html_url}>{name}</a>
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: value => <Tag color={value === 'User' ? 'green' : 'red'}>{value?.toLowerCase()}</Tag>,
    }
  ];

  return (
    <div style={{ marginTop: 30 }}>
      <div style={{ marginBottom: 10 }}>
        <b>{total_count >= 1 ? total_count?.toLocaleString() : 0} {total_count === 1 ? 'entry' : 'entries'}</b>
      </div>
      <Table
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
