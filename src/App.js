import './App.css';
import QuestionList from "./components/QuestionList";
import {Layout, Row, Col} from "antd";

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Content class="main">
        <Row justify="center">
          <Col xs={24} sm={18} md={12} lg={8} xl={6}>
            <QuestionList></QuestionList>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
