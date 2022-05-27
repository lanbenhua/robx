import React from 'react';
import { FormItemProps, RuleObject } from 'antd/es/form';
import { Tooltip, Form } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import './index.less';

interface IFormLabelProps {
  label: string;
  optional?: boolean;
}

export const FormLabel = (props: IFormLabelProps) => {
  const { label, optional } = props;
  return (
    <>
      <span className={`shopee-form-label-span${optional ? ' max-len' : ''}`}>{label}</span>
      {optional ? <span className="shopee-form-option">Optional</span> : null}
    </>
  );
};

interface IShopeeFormItem extends FormItemProps {
  label?: string;
  description?: React.ReactNode;
}

export const FormItem = (props: IShopeeFormItem) => {
  const { children, label, required, rules, description, className } = props;
  const notOptional =
    required || (rules || []).filter((r) => (r as RuleObject).required || false).length;

  return (
    <Form.Item
      {...props}
      colon={false}
      className={`shopee-form-item${className ? ` ${className}` : ''}`}
      label={
        <>
          <FormLabel label={label} optional={!notOptional} />
          {description ? (
            <Tooltip title={description}>
              <QuestionCircleOutlined className="shopee-form-des" />
            </Tooltip>
          ) : null}
        </>
      }
    >
      {children}
    </Form.Item>
  );
};
