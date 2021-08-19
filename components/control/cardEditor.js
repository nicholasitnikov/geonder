import { Form, Input, Button } from 'antd'
import { Space, Layout, Typography, Upload } from 'antd';
const { Title } = Typography;
import { UploadOutlined } from '@ant-design/icons';
import { useCard } from 'contexts/cardContext.js';
import { useAdmin } from 'contexts/adminContext.js';
import { useLayers } from 'contexts/layersContext.js';

const CardEditor = () => {

  const { card, editorMode, setEditorMode, createOrUpdateCard } = useCard()
  const { user } = useAdmin()

  const { getSelectedLayer } = useLayers()
  const currentLayer = getSelectedLayer()

  const formHandler = (e) => {
    setEditorMode(false)
    let currentCard = e
    currentCard.parent_id = currentLayer.id
    if(card) {
      currentCard.id = card.id
    }
    createOrUpdateCard(currentCard)
  }

  return (
    <>
      <Space direction='vertical' size={25}><span /></Space>
      <Title level={3}>Редактор карточек</Title>
      <Form
        initialValues={{
          title: card ? card.title : '',
          description: card ? card.description : ''
        }}
        size='large'
        name="cardForm"
        onFinish={formHandler}
        onFinishFailed={(e) => { console.log(e) }}
      >
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: 'Введите заголовок',
            },
          ]}
        >
          <Input placeholder='Заголовок' />
        </Form.Item>

        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: 'Введите текст'
            },
          ]}
        >
          <Input.TextArea placeholder='Основной текст' />
        </Form.Item>

        <Form.Item
          name="thumbnail"
          valuePropName="thumbnail"
          extra="Чтобы сохранить текущую картинку, оставьте поле пустым"
        >
          <Upload
            headers={{'Authorization' : user && user.accessToken}}
            name="logo"
            action="https://uploads.geonder.ru"
            listType="picture">
            <Button icon={<UploadOutlined />}>Загрузить картинку</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </>
  )

}

export default CardEditor
