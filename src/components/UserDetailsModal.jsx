import { Avatar, Modal, Row, Col } from "antd";
import { UserOutlined } from '@ant-design/icons';

const UserDetailsModal = ({ setValues, values }) => {
  const { isModalVisible, userDetails: { html_url, blog, bio, location, following, followers, company, public_repos, twitter_username, avatar_url, name, email } = {} } = values;
  
  return (
    <Modal
      width='800px'
      title='User Details'
      visible={isModalVisible}
      onOk={() => window.open(html_url, '_blank')}
      okText='View Profile in Github'
      cancelText='Close'
      onCancel={() => setValues({ ...values, userDetails: {}, isModalVisible: false })}
    >
      <div>
        <div style={{ display: 'flex' }}>
          <Avatar
            style={{ marginRight: 50, boxShadow: '2px 5px 8px -1px #40A9FF' }}
            size={120}
            icon={<UserOutlined />}
            src={avatar_url}
          />
          <div>
            <Row>
              <Col style={{ width: '400px' }} span={12}>
                <b style={{ marginRight: 5 }}>Name:</b>
                {name || 'Not available'}
              </Col>
              <Col span={12}>
              <b style={{ marginRight: 5 }}>Email:</b>
                {email || 'Not available'}
              </Col>
            </Row>
            <Row style={{ marginTop: 10, marginBottom: 10 }}>
              <Col style={{ width: '400px' }} span={12}>
              <b style={{ marginRight: 5 }}>Organization:</b>
                {company || 'Not available'}
              </Col>
              <Col span={12}>
              <b style={{ marginRight: 5 }}>Twitter username:</b>
                {twitter_username || 'Not available'}
              </Col>
            </Row>
            <Row style={{ marginTop: 10, marginBottom: 10 }}>
              <Col style={{ width: '400px' }} span={12}>
              <b style={{ marginRight: 5 }}>Pulic repos:</b>
                {public_repos || 0}
              </Col>
              <Col span={12}>
              <b style={{ marginRight: 5 }}>Followers:</b>
                {followers?.toLocaleString() || 0}
              </Col>
            </Row>
            <Row>
              <Col style={{ width: '300px' }} span={12}>
                <b>Location:</b> {location || 'Not available'}
              </Col>
              <Col span={12}>
                <b>Following:</b> {following || 'Not available'}
              </Col>
            </Row>
          </div>
        </div>
        {
          bio ?
          <div style={{ marginTop: 20 }}>
            <b>Description:</b>
            <div>{bio}</div>
          </div>
          :
          null
        }
        {
          blog ?
          <div style={{ marginTop: 10 }}>
            <b>Blog:</b>
            <div>{blog}</div>
          </div>
          :
          null
        }
      </div>
    </Modal>
  )
};

export default UserDetailsModal;