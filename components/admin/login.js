import { Form, Input, Button } from 'antd'
import { useAdmin } from 'contexts/adminContext.js'

const LoginControl = () => {

  const { login } = useAdmin()

  const onFinish = (e) => {

    if(e.username.trim() && e.password.trim()) {
      login(e.username, e.password)
    }

  }

  const onFinishFailed = (e) => {

    console.log('failed with: ', e)

  }

  return(
    <Form
      name="loginForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input placeholder='Имя пользователя' />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password placeholder='Пароль' />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  )

}

export default LoginControl
