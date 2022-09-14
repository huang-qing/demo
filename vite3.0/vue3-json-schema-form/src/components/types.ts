export enum SchemaTypes {
  "NUMBER" = "number",
  "INTEGER" = "integer",
  "STRING" = "string",
  "OBJECT" = "object",
  "ARRAY" = "array",
  "BOOLEAN" = "boolean",
}

export type SchemaRef = { $ref: string };

export interface Schema {
  type?: SchemaTypes | string;
  const?: any;
  format?: string;
  title?: string;
  default?: any;

  properties?: {
    [key: string]: Schema | { $ref: string };
  };
  items?: Schema | Schema[] | SchemaRef;
  uniqueItems?: any;
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef;
  };

  // 级联使用
  oneOf?: Schema[];
  anyOf?: Schema[];
  allOf?: Schema[];

  //vjsf?:VueJsonSchemaConfig
  required?: string[];
  enum?: any[];
  enumNames?: any[];
  enumKeyValue?: any[];
  additionalProperites?: any;
  additionalItems?: Schema;

  minLength?: number;
  maxLength?: number;
  minimun?: number;
  maximum?: number;
  multipeOf?: number;
  exclusiveMaximum?: number;
  exclusiveMinimum?: number;
}
