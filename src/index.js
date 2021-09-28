import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Form, Input, Button, Select, InputNumber } from "antd";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};

class Demo extends React.Component {
  formRef = React.createRef();
  state = {
    listType: []
  };

  selTagColumns = [
    {
      title: "name",
      dataIndex: "status",
      render: (text: string, record: any) => {
        return;
      }
    },
    {
      title: "action",
      key: "operation",
      width: 80,
      render: (text: string, record: any) => (
        <Button
          onClick={() => this.deleteCartById(record.tagID)}
          style={{ color: "#40a9ff" }}
        />
      )
    }
  ];

  onGenderChange = (value) => {
    switch (value) {
      case "male":
        this.formRef.current.setFieldsValue({
          note: "Hi, man!"
        });
        return;

      case "female":
        this.formRef.current.setFieldsValue({
          note: "Hi, lady!"
        });
        return;

      case "other":
        this.formRef.current.setFieldsValue({
          note: "Hi there!"
        });
    }
  };
  onTypeChange = (value) => {
    console.log("typevalues", value);
    this.setState({
      listType: value
    });
  };
  onFinish = (values) => {
    console.log(values);
  };
  onReset = () => {
    this.formRef.current.resetFields();
  };
  onFill = () => {
    this.formRef.current.setFieldsValue({
      note: "Hello world!",
      gender: "male",
      type: ["male", "female"]
    });
  };
  onDelete = (e) => {
    console.log(e);

    this.setState(
      (preState) => ({
        listType: preState.listType.filter((el) => el !== e)
      }),
      () => {
        this.formRef.current.setFieldsValue({
          type: this.state.listType
        });

        console.log("this.state.listType", this.state.listType);
      }
    );
  };
  render() {
    console.log("this.state.listType", this.state);
    return (
      <div>
        <Button type="link" htmlType="button" onClick={this.onFill}>
          Fill form
        </Button>
        <Form
          {...layout}
          ref={this.formRef}
          name="control-ref"
          onFinish={this.onFinish}
        >
          <Form.Item
            label="价值："
            name="aiNfap"
            rules={[
              { required: true, message: "请输入价值" },
              {
                pattern: /^\d{1-3}$/,
                message: "请输入小数点后两位的价值"
              },
              {
                validator: (rule, value) => {
                  console.log("rule", rule);
                  console.log("value", value);
                  const noteVal = this.formRef.current.getFieldValue("note"); // 关联验证
                  console.log("noteVal", noteVal);
                  return Promise.reject("error message");
                  /*
                  let giValu = this.materialsForm.current.getFieldValue(
                      "giValu"
                    ),
                    aiFiap = this.materialsForm.current.getFieldValue("aiFiap");
                  let sum = Number(value) + Number(aiFiap);
                  if (Number(giValu) !== sum) {
                    return Promise.reject("error message");
                  } else {
                    return Promise.resolve();
                  }
                  */
                }
              }
            ]}
            validateTrigger={"onBlur"}
          >
            <InputNumber
              placeholder="请输入价值"
              max={99}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="note"
            label="Note"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={this.onGenderChange}
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="type"
            mode="multiple"
            label="type"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Select
              mode="multiple"
              onChange={this.onTypeChange}
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              defaultValue={[]}
            >
              <Option value="test">test</Option>
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.gender !== currentValues.gender
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("gender") === "other" ? (
                <Form.Item
                  name="customizeGender"
                  label="Customize Gender"
                  rules={[
                    {
                      required: true
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              ) : null
            }
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={this.onReset}>
              Reset
            </Button>
            <Button type="link" htmlType="button" onClick={this.onFill}>
              Fill form
            </Button>
          </Form.Item>
        </Form>
        <div>
          {this.state.listType &&
            this.state.listType.map((item) => {
              return <li onClick={() => this.onDelete(item)}>{item}</li>;
            })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById("container"));
